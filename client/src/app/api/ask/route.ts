import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:9000';

export async function POST(req: NextRequest) {
    try{
  const { query } = await req.json();

  const backendRes = await fetch(`${BACKEND_URL}/askmodel`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const data = await backendRes.json();
  return NextResponse.json(data, { status: backendRes.status });
}
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.log("error", message);
    return NextResponse.json({ error: `Error Occured ${message}` });
  }
}
