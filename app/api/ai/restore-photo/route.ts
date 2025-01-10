import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

const MAX_USES_PER_DAY = 3

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

async function getUsageCount(ip: string) {
  const date = getCurrentDate()
  const key = `photo_restorer_usage:${ip}:${date}`
  const usageCountRaw = await redis.get(key)
  return typeof usageCountRaw === 'number' ? usageCountRaw : 0
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const usageCount = await getUsageCount(ip)

    if (usageCount >= MAX_USES_PER_DAY) {
      return NextResponse.json({ error: "You've reached the daily limit for photo restoration. Try again tomorrow!", usageCount }, { status: 429 })
    }

    const body = await req.json()
    const { image } = body

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const prediction = await replicate.predictions.create({
      version: "0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c",
      input: {
        img: image,
        scale: 2,
        version: "v1.4"
      }
    })

    // Increment usage count
    const newUsageCount = usageCount + 1
    const date = getCurrentDate()
    const key = `photo_restorer_usage:${ip}:${date}`
    await redis.set(key, newUsageCount)

    return NextResponse.json({ predictionId: prediction.id, usageCount: newUsageCount })
  } catch (error) {
    console.error('Error restoring photo:', error)
    return NextResponse.json({ error: 'Failed to restore photo' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const predictionId = searchParams.get('id')
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  const usageCount = await getUsageCount(ip)

  if (!predictionId) {
    return NextResponse.json({ usageCount })
  }

  try {
    const prediction = await replicate.predictions.get(predictionId)

    if (prediction.status === 'succeeded') {
      return NextResponse.json({ output: prediction.output, usageCount })
    } else if (prediction.status === 'failed') {
      return NextResponse.json({ error: 'Photo restoration failed', usageCount }, { status: 500 })
    } else {
      return NextResponse.json({ status: prediction.status, usageCount })
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to get prediction status', usageCount }, { status: 500 })
  }
}

