'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import AIImageLoader from './AIImageLoader'
import { Upload, X, AlertCircle, Download } from 'lucide-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function AIObjectRemover() {
  const t = useTranslations('Index.AIObjectRemover')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [maskUrl, setMaskUrl] = useState<string | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usedCredits, setUsedCredits] = useState(0)
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [predictionId, setPredictionId] = useState<string | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const fetchUsageCount = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/remove-object')
      if (response.ok) {
        const data = await response.json()
        setUsedCredits(data.usageCount || 0)
        setIsLimitReached(data.usageCount >= 5)
      }
    } catch (error) {
      console.error('Error fetching usage count:', error)
    }
  }, [])

  useEffect(() => {
    fetchUsageCount()
  }, [fetchUsageCount])

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return t('invalidFileType')
    }
    if (file.size > MAX_FILE_SIZE) {
      return t('fileTooLarge', { maxSize: MAX_FILE_SIZE / 1024 / 1024 })
    }
    return null
  }

  const handleFileChange = (selectedFile: File) => {
    const validationError = validateFile(selectedFile)
    if (validationError) {
      setError(validationError)
      return
    }

    setFile(selectedFile)
    setPreviewUrl(URL.createObjectURL(selectedFile))
    setMaskUrl(null)
    setResultUrl(null)
    setError(null)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      handleFileChange(droppedFile)
    }
  }

  const startDrawing = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    draw(event)
  }, [])

  const stopDrawing = useCallback(() => {
    setIsDrawing(false)
  }, [])

  const draw = useCallback((event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = 'red'
    ctx.lineWidth = 10
    ctx.lineCap = 'round'

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    let x, y

    if ('touches' in event) {
      x = (event.touches[0].clientX - rect.left) * scaleX
      y = (event.touches[0].clientY - rect.top) * scaleY
    } else {
      x = (event.clientX - rect.left) * scaleX
      y = (event.clientY - rect.top) * scaleY
    }

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }, [isDrawing])

  const generateMask = useCallback(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Create a new canvas with the same dimensions
    const maskCanvas = document.createElement('canvas')
    maskCanvas.width = canvas.width
    maskCanvas.height = canvas.height
    const maskCtx = maskCanvas.getContext('2d')
    if (!maskCtx) return

    // Draw the original canvas content
    maskCtx.drawImage(canvas, 0, 0)

    // Get the image data
    const imageData = maskCtx.getImageData(0, 0, maskCanvas.width, maskCanvas.height)
    const data = imageData.data

    // Convert to binary mask (black and white)
    for (let i = 0; i < data.length; i += 4) {
      const isRed = data[i] > 200 && data[i + 1] < 50 && data[i + 2] < 50
      const value = isRed ? 255 : 0
      data[i] = value     // R
      data[i + 1] = value // G
      data[i + 2] = value // B
      data[i + 3] = 255   // A (fully opaque)
    }

    // Put the modified image data back
    maskCtx.putImageData(imageData, 0, 0)

    // Convert to PNG
    const maskDataUrl = maskCanvas.toDataURL('image/png')
    setMaskUrl(maskDataUrl)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !maskUrl) {
      setError(t('noFileOrMaskError'))
      return
    }
    setIsProcessing(true)
    setError(null)
    setProcessingProgress(0)

    try {
      const imageReader = new FileReader()
      imageReader.readAsDataURL(file)
      imageReader.onloadend = async () => {
        const imageBase64 = imageReader.result as string

        // Ensure both image and mask are in the correct format
        const processedImage = await processImage(imageBase64)
        const processedMask = await processImage(maskUrl)

        const response = await fetch('/api/ai/remove-object', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: processedImage, mask: processedMask })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || t('processingError'))
        }

        setPredictionId(data.predictionId)
        setUsedCredits(data.usageCount)
        setIsLimitReached(data.usageCount >= 5)
        fetchUsageCount()
        checkPredictionStatus()
      }
    } catch (err: unknown) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : t('processingError'))
      setIsProcessing(false)
    }
  }

  const processImage = async (dataUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }
        ctx.drawImage(img, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = dataUrl
    })
  }

  const checkPredictionStatus = useCallback(async (retryCount = 0) => {
    if (!predictionId) return

    try {
      const response = await fetch(`/api/ai/remove-object?id=${predictionId}`)
      if (!response.ok) {
        throw new Error('Failed to get prediction status')
      }
      const data = await response.json()

      if (data.output) {
        setResultUrl(data.output)
        setIsProcessing(false)
        setPredictionId(null)
        setUsedCredits(data.usageCount)
        setProcessingProgress(100)
      } else if (data.error) {
        throw new Error(data.error)
      } else {
        const progress = Math.min(90, retryCount * 10)
        setProcessingProgress(progress)
        const nextRetryCount = retryCount + 1
        const delay = Math.min(1000 * Math.pow(2, nextRetryCount), 30000)
        if (nextRetryCount < 10) {
          setTimeout(() => checkPredictionStatus(nextRetryCount), delay)
        } else {
          throw new Error('Maximum retries reached. Please try again.')
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : t('processingError'))
      setIsProcessing(false)
      setPredictionId(null)
      setProcessingProgress(0)
    }
  }, [predictionId, t])

  useEffect(() => {
    if (predictionId) {
      checkPredictionStatus()
    }
  }, [predictionId, checkPredictionStatus])

  const handleReset = () => {
    setFile(null)
    setPreviewUrl(null)
    setMaskUrl(null)
    setResultUrl(null)
    setError(null)
    setIsProcessing(false)
    setProcessingProgress(0)
    setPredictionId(null)
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }
  }

  const handleDownload = async () => {
    if (resultUrl) {
      try {
        const response = await fetch(resultUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'object-removed.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading image:', error);
        setError(t('downloadError'));
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background text-foreground pt-20">
      <Card className="w-full lg:w-[400px] lg:h-screen lg:overflow-y-auto border-border">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">{t('title')}</h2>
              <p className="text-sm text-muted-foreground">{t('description')}</p>
            </div>
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                accept={ALLOWED_FILE_TYPES.join(',')}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center">
                  {t('dragDropPrompt')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('supportedFormats', { formats: ALLOWED_FILE_TYPES.map(type => type.split('/')[1]).join(', ') })}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('maxFileSize', { size: MAX_FILE_SIZE / 1024 / 1024 })}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {t('selectFileButton')}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {(isLimitReached || error) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert variant={isLimitReached ? "destructive" : "default"}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{isLimitReached ? t('limitReachedTitle') : t('errorTitle')}</AlertTitle>
                    <AlertDescription>
                      {isLimitReached ? t('limitReachedDescription') : error}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="submit"
                disabled={isProcessing || isLimitReached || !file || !maskUrl}
                className={`w-full ${(!file || !maskUrl) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? t('processingButton') : t('removeObjectButton')}
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={handleReset}>
                {t('resetButton')}
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
              <span className="text-sm font-medium">{t('creditsUsed')}</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">{usedCredits}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">3</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="w-full lg:flex-1 bg-background flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-xl aspect-square relative rounded-lg overflow-hidden shadow">
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
              <AIImageLoader progress={processingProgress} />
            </div>
          )}
          {previewUrl && !resultUrl && (
            <div className="relative w-full h-full">
              <Image
                src={previewUrl}
                alt={t('previewImageAlt')}
                fill
                style={{ objectFit: 'contain' }}
              />
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="absolute top-0 left-0 w-full h-full"
                style={{ touchAction: 'none' }}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawing}
                onTouchEnd={stopDrawing}
                onTouchMove={draw}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/50 hover:bg-background/75"
                onClick={handleReset}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-2 right-2 bg-background/50 hover:bg-background/75"
                onClick={generateMask}
              >
                {t('generateMaskButton')}
              </Button>
            </div>
          )}
          {resultUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full"
            >
              <Image
                src={resultUrl}
                alt={t('resultImageAlt')}
                fill
                style={{ objectFit: 'contain' }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/50 hover:bg-background/75"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
          {!previewUrl && !resultUrl && (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">{t('uploadPrompt')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

