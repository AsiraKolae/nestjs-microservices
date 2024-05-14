import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const body = await req.json()
    const searchParams = new URLSearchParams(body).toString()
    const res = await fetch(process.env.API_URL+`/guest/categories?`+searchParams, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'force-cache'
    }).then((e)=> e.json())
    
    return NextResponse.json(res)
}