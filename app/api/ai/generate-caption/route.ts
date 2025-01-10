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
  const key = `image_caption_usage:${ip}:${date}`
  const usageCountRaw = await redis.get(key)
  return typeof usageCountRaw === 'number' ? usageCountRaw : 0
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const usageCount = await getUsageCount(ip)

    if (usageCount >= MAX_USES_PER_DAY) {
      return NextResponse.json({ error: "You've reached the daily limit for image captioning. Try again tomorrow!", usageCount }, { status: 429 })
    }

    const body = await req.json()
    const { image } = body

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const output = await replicate.run(
      "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746",
      {
        input: {
          task: "image_captioning",
          image: image
        }
      }
    )

    // Increment usage count
    const newUsageCount = usageCount + 1
    const date = getCurrentDate()
    const key = `image_caption_usage:${ip}:${date}`
    await redis.set(key, newUsageCount)

    return NextResponse.json({ output, usageCount: newUsageCount })
  } catch (error) {
    console.error('Error generating image caption:', error)
    return NextResponse.json({ error: 'Failed to generate image caption' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  const usageCount = await getUsageCount(ip)
  return NextResponse.json({ usageCount })
}

