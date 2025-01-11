import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import { Redis } from '@upstash/redis'
import sharp from 'sharp'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

const MAX_USES_PER_DAY = 5
const TARGET_SIZE = 1024 // The model expects 1024x1024 images

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

async function getUsageCount(ip: string) {
  const date = getCurrentDate()
  const key = `object_remover_usage:${ip}:${date}`
  const usageCountRaw = await redis.get(key)
  return typeof usageCountRaw === 'number' ? usageCountRaw : 0
}

async function resizeImage(base64Image: string): Promise<string> {
  const buffer = Buffer.from(base64Image.split(',')[1], 'base64')
  const resizedBuffer = await sharp(buffer)
    .resize(TARGET_SIZE, TARGET_SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer()
  return `data:image/png;base64,${resizedBuffer.toString('base64')}`
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const usageCount = await getUsageCount(ip)

    if (usageCount >= MAX_USES_PER_DAY) {
      return NextResponse.json({ error: "You've reached the daily limit for object removal. Try again tomorrow!", usageCount }, { status: 429 })
    }

    const body = await req.json()
    let { image, mask } = body

    if (!image || !mask) {
      return NextResponse.json({ error: "Image and mask are required" }, { status: 400 })
    }

    // Resize both the image and mask to the target size
    image = await resizeImage(image)
    mask = await resizeImage(mask)

    const prediction = await replicate.predictions.create({
      version: "0e3a841c913f597c1e4c321560aa69e2bc1f15c65f8c366caafc379240efd8ba",
      input: {
        mask: mask,
        image: image
      }
    })

    // Increment usage count
    const newUsageCount = usageCount + 1
    const date = getCurrentDate()
    const key = `object_remover_usage:${ip}:${date}`
    await redis.set(key, newUsageCount)

    return NextResponse.json({ predictionId: prediction.id, usageCount: newUsageCount })
  } catch (error) {
    console.error('Error removing object:', error)
    return NextResponse.json({ error: 'Failed to remove object' }, { status: 500 })
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
      return NextResponse.json({ error: 'Object removal failed', usageCount }, { status: 500 })
    } else {
      return NextResponse.json({ status: prediction.status, usageCount })
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to get prediction status', usageCount }, { status: 500 })
  }
}

