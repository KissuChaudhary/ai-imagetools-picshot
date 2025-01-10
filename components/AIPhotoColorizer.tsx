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

export default function AIPhotoColorizer() {
  const t = useTranslations('Index.AIPhotoColorizer')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usedCredits, setUsedCredits] = useState(0)
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [predictionId, setPredictionId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchUsageCount = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/colorize-photo')
      if (response.ok) {
        const data = await response.json()
        setUsedCredits(data.usageCount || 0)
        setIsLimitReached(data.usageCount >= 3)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError(t('noFileError'))
      return
    }
    setIsProcessing(true)
    setError(null)
    setProcessingProgress(0)

    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = async () => {
        const base64data = reader.result as string

        const response = await fetch('/api/ai/colorize-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64data })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || t('processingError'))
        }

        setPredictionId(data.predictionId)
        setUsedCredits(data.usageCount)
        setIsLimitReached(data.usageCount >= 3)
        fetchUsageCount()
        checkPredictionStatus()
      }
    } catch (err: unknown) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : t('processingError'))
      setIsProcessing(false)
    }
  }

  const checkPredictionStatus = useCallback(async (retryCount = 0) => {
    if (!predictionId) return

    try {
      const response = await fetch(`/api/ai/colorize-photo?id=${predictionId}`)
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
    setResultUrl(null)
    setError(null)
    setIsProcessing(false)
    setProcessingProgress(0)
    setPredictionId(null)
  }

  const handleDownload = async () => {
    if (resultUrl) {
      try {
        const response = await fetch(resultUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'colorized-photo.png';
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
                disabled={isProcessing || isLimitReached || !file}
                className={`w-full ${!file ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isProcessing ? t('processingButton') : t('colorizeButton')}
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
                alt="Preview"
                layout="fill"
                objectFit="contain"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/50 hover:bg-background/75"
                onClick={handleReset}
              >
                <X className="h-4 w-4" />
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
                alt="Result"
                layout="fill"
                objectFit="contain"
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

