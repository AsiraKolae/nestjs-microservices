import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {

  const tokenJwt = await getToken({ req });
  if (!tokenJwt || !tokenJwt.user || !tokenJwt.accessToken) {
    return {
      status: 401,
      body: { error: "User not authenticated" },
    };
  }

  const token = tokenJwt.accessToken;
  const searchParams = new URL(req.url).search;
  
  const res = await fetch(`${process.env.API_URL}/frontend/orders${searchParams}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store'
  }).then((e) => e.json());

  return NextResponse.json(res);
}

export async function POST(req: NextRequest) {
  const tokenJwt = await getToken({ req });
  if (!tokenJwt || !tokenJwt.user || !tokenJwt.accessToken) {
    return {
      status: 401,
      body: { error: "User not authenticated" },
    };
  }

  const token = tokenJwt.accessToken;
  const body = await req.json();
  const res = await fetch(`${process.env.API_URL}/frontend/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    next: { revalidate: 3 }
  }).then((e) => e.json());
  return NextResponse.json(res);
}
