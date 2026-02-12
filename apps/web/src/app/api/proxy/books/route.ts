import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.API_URL ?? 'http://localhost:3001'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const res = await fetch(`${API_URL}/api/books?${searchParams}`)
  const data = await res.json()
  return NextResponse.json(data)
}
