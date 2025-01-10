import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import OpenAI from 'openai'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const MAX_USES_PER_DAY = 10

async function moderateContent(prompt: string) {
  const moderation = await openai.moderations.create({ input: prompt })
  return moderation.results[0].flagged
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

async function getUsageCount(ip: string) {
  const date = getCurrentDate()
  const key = `image_generator_usage:${ip}:${date}`
  const usageCountRaw = await redis.get(key)
  return typeof usageCountRaw === 'number' ? usageCountRaw : 0
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const usageCount = await getUsageCount(ip)

    if (usageCount >= MAX_USES_PER_DAY) {
      return NextResponse.json({ error: "Congrats! You've officially hit your limit for today. Let others also use this free service. Try again tomorrow, if you can wait that long!", usageCount }, { status: 429 })
    }

    const body = await req.json()
    const isInappropriate = await moderateContent(body.prompt)

    if (isInappropriate) {
      return NextResponse.json({ error: 'The provided prompt contains inappropriate content and cannot be processed.', usageCount }, { status: 400 })
    }

    const prediction = await replicate.predictions.create({
      version: "88312dcb9eaa543d7f8721e092053e8bb901a45a5d3c63c84e0a5aa7c247df33",
      input: {
        prompt: body.prompt,
        negative_prompt: body.negative_prompt || "",
        width: body.width,
        height: body.height,
        num_inference_steps: 18,
        guidance_scale: 5,
        pag_guidance_scale: 2,
        seed: body.seed,
      }
    })

    // Increment usage count
    const newUsageCount = usageCount + 1
    const date = getCurrentDate()
    const key = `image_generator_usage:${ip}:${date}`
    await redis.set(key, newUsageCount)

    return NextResponse.json({ predictionId: prediction.id, usageCount: newUsageCount })
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 })
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
      return NextResponse.json({ error: 'Image generation failed', usageCount }, { status: 500 })
    } else {
      return NextResponse.json({ status: prediction.status, usageCount })
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to get prediction status', usageCount }, { status: 500 })
  }
}

