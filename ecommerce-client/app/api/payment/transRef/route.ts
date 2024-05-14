import { NextApiRequest, NextApiResponse } from "next";
import { ImageAnnotatorClient } from "@google-cloud/vision";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const CREDENTIALS = {
    type: "service_account",
    project_id: "coconut-ecommerce",
    private_key_id: "ee03172e35fa8ac403320c2d897ebb9b47cb3d92",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxIXsMbdi0zk32\nfMDEnb2Pafctqxm6bRZ9+o0cIC6rOoOQFekBPT9IUqSGHlXI14MoKE0UcuHr6lfN\nPgCvq53EzmddYytqOWK1mjfaCuScu2SYBoVcpoZDHMiubyOQXhH0lKC2VdBUzNgy\ncTrmIUWm7QOamGRZY9MfzZJIS8n5LSzairZ0/Uf6EdPKC3rvl7V33zwU7C3FmX23\nY9oEO8WBVnLrKealBx3YPHyGme6wJj1LZCDre2+y/O7/0Zq+ZY0JHdHfMoc6RGQH\n3wd3qebHm57wmeujU7XxcuW0WvUKCHBuwRKE8oliMHuJhxI2fbhoLEHgFZTnxSdG\nDdXPi+MFAgMBAAECggEAAQxYLJIn1/tn5bSw9Vjo9W957tNrjblgiof64XblSnkd\nrIgcqWJh51J/NmtOiaeQ10zUa/G5bt/OUODJjes/k0RqGIOM5GOI4dc9oQozISRQ\nwOo6TCU7d9aJ73z+jQz+y9+R9eebGdgJKCnttc1DmsHIpYJlBvcQGZ4/UTM1nkZe\nIxoR3FKfQu5z4ZRAPZFPsC5UpqQUBezli5CaY7BL4E8/CQs70+CEJxYyPuEh7yxR\nyt6+vIIc8x5XHKBxNt1J2/Mv5qqae2oWJ/01zVpLXweQRM28XlNYW2D8u0YUHkv0\nCY8pRRh6zDpwAmO4sZ5W4HOOFUiB6drTa0YLTpOh3wKBgQDlUVHzCkJz/QrToAH3\n8B101UxXyza6lR0pusNUaijnq44v9K612ftraMOskz40NKebEWDfoQWP9uJL6PFW\nCfaUZ+93Vbe9uB7PemQW4URXMtoW5se6OATaTLtklAOAMOlU4+FZDhsv4p2m1aJ+\ndZfN50eSSNdEDmMnjtLLgQbK5wKBgQDFvavckiA0UwavLHrxrkD8pvY7/KiUhVvI\noDp1yZYt2sMVVgPNKIy49+CqRrfupZJ1b6yayL6eyMi+1ZpLixEXt0NavmSTlx0s\nNeNeqzxEqyG0rmW3e/+/jWMNOHMkEivCNCmn6aPS7OGNo3Vou+z1wL7tvq2hB4pN\nigokMKLxMwKBgAGKIjq3fuq4cDIriNfZTNlT9UdBngRyq9dz4YvXip7DkBjSU7n0\n1LNL6MRn2KsRD28DFttpgVgOGEbaMYSaXIVyjTEH6kvjyJEsCS/+Iy9SsBQnSH//\nkEjG6xspwzxBF8/yF7k5VwVjSBuuo4Cl2XcQbnKU+p0CW7gQRWoIW7tRAoGBAIkk\nhCalXhqMHs2tbtNhxIa2EX8HO7BOUZryrbj1h+fjmnuYvWgzoG3E1Rejlnu4b7xt\nKGvtoG8l2DyqjqmoGMG3A8rS05SdMMlx0nDdGB6UBft3HOrF4Fls6O7JYOn6hEjb\nvqxLWai3S7PdU1fBRpYnCQSAw5E0VpJyk5gH92qLAoGAPAYMDjlfFHkj7LxonIJb\nAVUZx/C1Y9gpnwvLiMHav77ndZjfFALc/B8OauB+lfysF5PNNKq8ZK5S+LzDfhtN\nagLADW34ZxMaCVFf7qM1ltHZz90AJNLAwoGv7uHL6uSeVtjfdElT4DBY1YaeHQNy\nUAk5DbnrIqzcJX/u3YxfK00=\n-----END PRIVATE KEY-----\n",
    client_email: "coconut-products@coconut-ecommerce.iam.gserviceaccount.com",
    client_id: "117038381869598464468",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/coconut-products%40coconut-ecommerce.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  };

  const CONFIG = {
    credentials: {
      private_key: CREDENTIALS.private_key,
      client_email: CREDENTIALS.client_email,
    },
  };

  const client = new ImageAnnotatorClient(CONFIG);
  try {
    const texts = await client.documentTextDetection(buffer);
    const text = texts[0].fullTextAnnotation?.text;
    const keywords = ["อ้างอิง", "เลขที่รายการ", "รายการ"];
    if (text && keywords.some((keyword) => text.includes(keyword))) {
      const referenceCodeRegex = /อ้างอิง (\w+)|อ้างอิง: (\w+)|อ้างอิง\s+(\w+)|อ้างอิง\s+(\d+)|รายการ (\w+)|เลขที่รายการ:\s*([\w\d]+)/g;
      const referenceCodeRegex2 = /[0-9A-Z]{18}[0-9A-Z]*/;
      let match;
      let match2;
      const referenceCodes = [];
      
      do {
        match = referenceCodeRegex.exec(text);
        const match2 = referenceCodeRegex2.exec(text);
        
        if (match) {
          const referenceCode = match[1] || match[2] || match[3] || match[4] || match[5] || match[6] || match[7];
          referenceCodes.push(referenceCode);
        }
        
        if (match2) {
          referenceCodes.push(match2[0]); 
        }
      } while (match || match2);
    
      if (referenceCodes.length > 0) {
        const data = {
          ref: referenceCodes[0]
        }
        // console.log("Reference Codes:", referenceCodes);
        return NextResponse.json({ data: data });
      } else {
        console.log("Reference codes not found.");
      }
    } else {
      console.log("Text containing 'อ้างอิง' or 'เลขที่รายการ' not found");
    }

    // NextResponse.status(200).json({ text });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
  return NextResponse.json({ success: false });
}
