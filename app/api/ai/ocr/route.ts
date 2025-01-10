export const runtime = 'edge';

import { NextResponse } from 'next/server'
import Replicate from 'replicate'
import { Redis } from '@upstash/redis'

const kv = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  ? new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  : null;

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

const MAX_USES_PER_DAY = 10

function getCurrentDate() {
  return new Date().toISOString().split('T')[0]
}

async function getUsageCount(ip: string) {
  if (!kv) return 0;
  const date = getCurrentDate()
  const key = `ocr_usage:${ip}:${date}`
  const usageCountRaw = await kv.get(key)
  return typeof usageCountRaw === 'number' ? usageCountRaw : 0
}

export async function POST(req: Request) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 25000); // 25 second timeout

  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const usageCount = await getUsageCount(ip)

    if (usageCount >= MAX_USES_PER_DAY) {
      return NextResponse.json({ error: "You've reached the daily limit for OCR. Try again tomorrow!", usageCount }, { status: 429 })
    }

    const body = await req.json()
    const { image } = body

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const output = await replicate.run(
      "abiruyt/text-extract-ocr:a524caeaa23495bc9edc805ab08ab5fe943afd3febed884a4f3747aa32e9cd61",
      {
        input: {
          image: image
        }
      }
    )

    // Increment usage count
    if (kv) {
      const newUsageCount = usageCount + 1
      const date = getCurrentDate()
      const key = `ocr_usage:${ip}:${date}`
      await kv.set(key, newUsageCount)
    }

    clearTimeout(timeoutId);
    return NextResponse.json({ output, usageCount: usageCount + 1 })
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    console.error('Error processing OCR:', err)
    
    if (err instanceof Error) {
      if (err.name === 'AbortError') {
        return NextResponse.json({ error: 'OCR processing timed out. Please try with a smaller image or try again later.' }, { status: 504 })
      }
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
    
    return NextResponse.json({ error: 'Failed to process OCR' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  const usageCount = await getUsageCount(ip)
  return NextResponse.json({ usageCount })
}

