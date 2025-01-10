'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import AIImageLoader from './AIImageLoader'

interface GenerationParams {
  prompt: string
  image_size: 'portrait' | 'square' | 'landscape'
  negative_prompt: string
  seed?: number
}

const IMAGE_SIZES = {
  portrait: { width: 512, height: 768 },
  square: { width: 512, height: 512 },
  landscape: { width: 768, height: 512 },
}

const initialParams: GenerationParams = {
  prompt: "",
  image_size: "square",
  negative_prompt: ""
}

export default function AIImageGenerator() {
  const t = useTranslations('Index.AIImageGenerator')
  const [params, setParams] = useState<GenerationParams>(initialParams)
  const [isGenerating, setIsGenerating] = useState(false)
  const [flaggedError, setFlaggedError] = useState<string | null>(null)
  const [showFlaggedError, setShowFlaggedError] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [predictionId, setPredictionId] = useState<string | null>(null)
  const [usedCredits, setUsedCredits] = useState(0)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [sessionCredits, setSessionCredits] = useState(0)

  const fetchUsageCount = useCallback(async () => {
    try {
      const response = await fetch('/api/ai/generate-image')
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

  useEffect(() => {
    if (flaggedError) {
      setShowFlaggedError(true)
      const timer = setTimeout(() => {
        setShowFlaggedError(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [flaggedError])

  const checkPredictionStatus = useCallback(async (retryCount = 0) => {
    if (!predictionId) return

    try {
      const response = await fetch(`/api/ai/generate-image?id=${predictionId}`)
      if (!response.ok) {
        throw new Error('Failed to get prediction status')
      }
      const data = await response.json()

      if (data.output) {
        setImageUrl(data.output)
        setIsGenerating(false)
        setPredictionId(null)
        setUsedCredits(data.usageCount)
        setGenerationProgress(100)
        fetchUsageCount() // Fetch updated usage count after successful generation
      } else if (data.error) {
        throw new Error(data.error)
      } else if (data.status === 'processing' || data.status === 'starting') {
        const progress = Math.min(90, retryCount * 10)
        setGenerationProgress(progress)
        const nextRetryCount = retryCount + 1
        const delay = Math.min(1000 * Math.pow(2, nextRetryCount), 30000)
        if (nextRetryCount < 10) {
          setTimeout(() => checkPredictionStatus(nextRetryCount), delay)
        } else {
          throw new Error('Maximum retries reached. Please try again.')
        }
      } else {
        throw new Error(`Unexpected prediction status: ${data.status}`)
      }
    } catch (error) {
      console.error('Error:', error)
      setFlaggedError(error instanceof Error ? error.message : t('generateError'))
      setIsGenerating(false)
      setPredictionId(null)
      setGenerationProgress(0)
    }
  }, [predictionId, t, fetchUsageCount])

  useEffect(() => {
    if (predictionId) {
      checkPredictionStatus()
    }
  }, [predictionId, checkPredictionStatus])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!params.prompt.trim()) {
      setFlaggedError(t('promptError'))
      return
    }
    setIsGenerating(true)
    setFlaggedError(null)
    setImageUrl(null)
    setGenerationProgress(0)

    try {
      const apiParams = {
        ...params,
        width: IMAGE_SIZES[params.image_size].width,
        height: IMAGE_SIZES[params.image_size].height,
      }

      const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiParams)
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          setIsLimitReached(true)
          setFlaggedError(null)
          throw new Error(data.error || t('limitReachedError'))
        } else if (response.status === 400 && data.error.includes('inappropriate content')) {
          setIsLimitReached(false)
          setFlaggedError(data.error)
        } else {
          throw new Error(data.error || t('generateError'))
        }
        return
      }

      setPredictionId(data.predictionId)
      setUsedCredits(data.usageCount)
      setSessionCredits(prevCredits => prevCredits + 1)
      setIsLimitReached(data.usageCount >= 3)
      fetchUsageCount() // Fetch updated usage count after successful API call
    } catch (err: unknown) {
      console.error('Error:', err)
      setIsGenerating(false)
      setFlaggedError(err instanceof Error ? err.message : t('generateError'))
    }
  }

  const handleReset = () => {
    setParams(initialParams)
    setImageUrl(null)
    setFlaggedError(null)
    setIsGenerating(false)
    setPredictionId(null)
    setGenerationProgress(0)
    setSessionCredits(0)
  }

  const handleDownload = async () => {
    if (imageUrl) {
      try {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `ai-generated-image-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Error downloading image:', error)
      }
    }
  }

  const getImagePreviewStyle = () => {
    switch (params.image_size) {
      case 'portrait':
        return 'aspect-[2/3] w-full max-w-[512px]'
      case 'landscape':
        return 'aspect-[3/2] w-full max-w-[768px]'
      default:
        return 'aspect-square w-full max-w-[512px]'
    }
  }

  const isPromptEmpty = params.prompt.trim() === ""

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background text-foreground pt-20">
      <Card className="w-full md:w-[30%] md:h-screen md:overflow-y-auto border-border">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-foreground">{t('title')}</h2>

              <Label htmlFor="prompt" className="text-foreground">{t('promptLabel')}</Label>
              <Textarea
                id="prompt"
                value={params.prompt}
                onChange={(e) => setParams({...params, prompt: e.target.value})}
                placeholder={t('promptPlaceholder')}
                required
                className="min-h-[100px] bg-background border-input text-foreground placeholder-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="negative_prompt" className="text-foreground">{t('negativePromptLabel')}</Label>
              <Textarea
                id="negative_prompt"
                value={params.negative_prompt}
                onChange={(e) => setParams({...params, negative_prompt: e.target.value})}
                placeholder={t('negativePromptPlaceholder')}
                className="min-h-[100px] bg-background border-input text-foreground placeholder-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_size" className="text-foreground">{t('imageSizeLabel')}</Label>
              <Select
                value={params.image_size}
                onValueChange={(value: 'portrait' | 'square' | 'landscape') => setParams({...params, image_size: value})}
              >
                <SelectTrigger id="image_size" className="bg-background border-input text-foreground">
                  <SelectValue placeholder={t('imageSizePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="portrait">{t('portraitSize')}</SelectItem>
                  <SelectItem value="square">{t('squareSize')}</SelectItem>
                  <SelectItem value="landscape">{t('landscapeSize')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLimitReached ? (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>{t('limitReachedTitle')}</AlertTitle>
                <AlertDescription>{t('limitReachedDescription')}</AlertDescription>
              </Alert>
            ) : (
              showFlaggedError && flaggedError && (
                <Alert variant="destructive" className="transition-opacity duration-300 ease-in-out">
                  <AlertTitle>{t('errorTitle')}</AlertTitle>
                  <AlertDescription>{flaggedError}</AlertDescription>
                </Alert>
              )
            )}

            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={handleSubmit}
                disabled={isGenerating || isLimitReached || isPromptEmpty}
                className={`w-full${isPromptEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isGenerating ? t('generatingButton') : t('generateButton')}
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={handleReset}>
                {t('resetButton')}
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border">
              <span className="text-sm font-medium">Credits Used Today</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">{usedCredits + sessionCredits}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">3</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="w-full md:w-[70%] md:h-screen bg-background flex flex-col justify-center items-center p-4">
        <div className={`bg-muted rounded-lg shadow flex items-center justify-center ${getImagePreviewStyle()} relative overflow-hidden`}>
          {isGenerating && <AIImageLoader progress={generationProgress} />}
          {imageUrl && (
            <motion.div
              className="relative w-full h-full transition-opacity duration-500 ease-in-out"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Image
                src={imageUrl}
                alt={t('generatedImageAlt')}
                fill
                className="object-contain rounded-lg"
              />
              <Button
                className="absolute bottom-2 right-2"
                onClick={handleDownload}
              >
                {t('downloadButton')}
              </Button>
            </motion.div>
          )}
          {!imageUrl && !isGenerating && (
            <p className="text-muted-foreground">{t('imagePreviewPlaceholder')}</p>
          )}
        </div>
      </div>
    </div>
  )
}

