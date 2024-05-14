import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
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
  
  const invoiceNumber = new URL(req.url).searchParams.get('InvoiceNumber');
  
  const response = await fetch(process.env.API_URL + `/frontend/invoices/`+ invoiceNumber, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store'
  }).then((e) => e.json());
  return NextResponse.json(response);
}

