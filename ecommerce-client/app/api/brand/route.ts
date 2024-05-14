import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json()
  const searchParams = new URLSearchParams(req).toString()
  const res = await fetch(process.env.API_URL+`/guest/brands?`+searchParams, {
    method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((e) => e.json())
  return NextResponse.json(res)
}