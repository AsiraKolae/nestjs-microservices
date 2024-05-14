import { NextRequest, NextResponse } from "next/server";
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
  const response = await fetch(process.env.API_URL + `/frontend/carts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
  }).then((e) => e.json());
  return NextResponse.json(response);
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

  const res = await fetch(`${process.env.API_URL}/frontend/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    redirect: "follow",
  }).then((e) => e.json());
  return NextResponse.json(res);
}

export async function PUT(req: NextRequest) {
  const tokenJwt = await getToken({ req });
  if (!tokenJwt || !tokenJwt.user || !tokenJwt.accessToken) {
    return {
      status: 401,
      body: { error: "User not authenticated" },
    };
  }

  const token = tokenJwt.accessToken;
  const body = await req.json();

  const response = await fetch(process.env.API_URL + `/frontend/carts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    redirect: "follow",
  }).then((e) => e.json());
  return NextResponse.json(response);
}

export async function DELETE(req: NextRequest) {
  const tokenJwt = await getToken({ req });
  if (!tokenJwt || !tokenJwt.user || !tokenJwt.accessToken) {
    return {
      status: 401,
      body: { error: "User not authenticated" },
    };
  }

  const token = tokenJwt.accessToken;
  const body = await req.json();
  const response = await fetch(process.env.API_URL + `/frontend/carts`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    redirect: "follow",
  }).then((e) => e.json());
  return NextResponse.json(response);
}
