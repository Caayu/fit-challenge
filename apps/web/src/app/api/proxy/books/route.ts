import { NextRequest, NextResponse } from 'next/server'
import { API_URL } from '../../../../config/env'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const res = await fetch(`${API_URL}/api/books?${searchParams}`)

  if (!res.ok) {
    return NextResponse.json(
      {
        data: [],
        meta: {
          total: 0,
          page: 1,
          lastPage: 1,
          previousPage: null,
          nextPage: null
        }
      },
      { status: res.status }
    )
  }

  const data = await res.json()
  return NextResponse.json(data)
}
