import { NextResponse } from 'next/server'
import { stats } from '@/data/stats'

export async function GET() {
  return NextResponse.json(stats, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
