'use client'

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useState, useCallback } from 'react'

export const useReCaptcha = () => {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [isVerifying, setIsVerifying] = useState(false)

  const verifyReCaptcha = useCallback(async () => {
    if (!executeRecaptcha) {
      console.error('reCAPTCHA has not been loaded')
      return null
    }

    setIsVerifying(true)
    try {
      const token = await executeRecaptcha('submit_form')
      return token
    } catch (error) {
      console.error('reCAPTCHA verification failed:', error)
      return null
    } finally {
      setIsVerifying(false)
    }
  }, [executeRecaptcha])

  return { verifyReCaptcha, isVerifying }
}

