'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import AIImageLoader from './AIImageLoader'
import { Upload, X, AlertCircle, Copy } from 'lucide-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function AIImageCaptionGenerator() {
  const t = useTranslations('Index.AIImageCaptionGenerator')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [generatedCaption, setGeneratedCaption] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usedCredits, setUsedCredits] = useState(0)
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isCopied, setIsCopied] = useState(false);

  const fetchUsageCount = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/generate-caption')
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
    setGeneratedCaption('')
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

        const response = await fetch('/api/ai/generate-caption', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64data })
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || t('processingError'))
        }

        if (data.output && typeof data.output === 'string') {
          setGeneratedCaption(data.output)
        } else {
          setError(t('noCaptionGenerated'))
        }
        
        setUsedCredits(data.usageCount)
        setIsLimitReached(data.usageCount >= 3)
        fetchUsageCount()
        setIsProcessing(false)
        setProcessingProgress(100)
      }
    } catch (err: unknown) {
      console.error('Error:', err)
      setError(err instanceof Error ? err.message : t('processingError'))
      setIsProcessing(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setPreviewUrl(null)
    setGeneratedCaption('')
    setError(null)
    setIsProcessing(false)
    setProcessingProgress(0)
  }

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(generatedCaption)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy caption: ', err)
      })
  }

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
                {isProcessing ? t('processingButton') : t('generateCaptionButton')}
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

      <div className="w-full lg:flex-1 bg-background flex flex-col justify-start items-center p-6 space-y-6">
        <div className="w-full max-w-xl aspect-video relative rounded-lg overflow-hidden shadow">
          {isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
              <AIImageLoader progress={processingProgress} />
            </div>
          )}
          {previewUrl && (
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
          {!previewUrl && (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">{t('uploadPrompt')}</p>
            </div>
          )}
        </div>

        <div className="w-full max-w-xl">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{t('generatedCaptionTitle')}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCaption}
              disabled={!generatedCaption}
            >
              <Copy className="w-4 h-4 mr-2" />
              {isCopied ? t('copiedButton') : t('copyButton')}
            </Button>
          </div>
          <Textarea
            value={generatedCaption}
            readOnly
            placeholder={error || t('generatedCaptionPlaceholder')}
            className="w-full h-32 resize-none"
          />
        </div>
      </div>
    </div>
  )
}

