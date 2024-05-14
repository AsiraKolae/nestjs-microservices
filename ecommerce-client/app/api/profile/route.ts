import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { AddressList } from "@/app/types/profile/interfaces";
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
  const response = await fetch(`${process.env.API_URL}/frontend/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
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

  let formData: any;
  if (typeof body === "object" && !Array.isArray(body)) {
    formData = { ...body, _method: "PUT" };
  } else {
    formData = {
      _method: "PUT",
      address: body,
    };
  }

  const response = await fetch(`${process.env.API_URL}/frontend/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
    cache: "no-store",
    redirect: "follow",
  }).then((e) => e.json());
  return NextResponse.json(response);
}
