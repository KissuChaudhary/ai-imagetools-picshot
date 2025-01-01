'use client'

import { useEffect } from 'react'

interface AdSenseProps {
  adClient: string
  adSlot: string
  adFormat?: string
  adLayout?: string
  adLayoutKey?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
}

export function AdSense({
  adClient,
  adSlot,
  adFormat = 'auto',
  adLayout,
  adLayoutKey,
  fullWidthResponsive = false,
  style = {},
}: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-expect-error - AdSense is not typed in the global window object
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      {...(adLayout && { 'data-ad-layout': adLayout })}
      {...(adLayoutKey && { 'data-ad-layout-key': adLayoutKey })}
    />
  )
}

