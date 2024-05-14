import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const tokenJwt = await getToken({ req });
  if (!tokenJwt || !tokenJwt.user || !tokenJwt.accessToken) {
    return {
      status: 401,
      body: { error: "User not authenticated" },
    };
  }

  const token = tokenJwt.accessToken;

  const OriFormData = await req.formData(); // Parse FormData from the request

  const formdata = new FormData();
  formdata.append("invoice_id", OriFormData.get('invoice_id'));
  formdata.append("amount", OriFormData.get('amount'));
  formdata.append("payment_datetime", formatDateTime(OriFormData.get('payment_datetime')));
  formdata.append("status", "pending");
  formdata.append("transaction_img", OriFormData.get('transaction_img'));
  
  const response = await fetch(`${process.env.API_URL}/frontend/transactions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formdata,
    cache: "no-store",
    redirect: "follow",
  }).then((e) => e.json());

  return NextResponse.json(response);
}

function formatDateTime(inputDateTime: any) {
  const date = new Date(inputDateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
