import { NextResponse, type NextRequest } from "next/server";
import { validateEnquiry, type ApiResponse } from "@/lib/validation";

type Receipt = { reference: string };

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.set(key, [...recent, now]);
  return recent.length >= MAX_PER_WINDOW;
}

function json(body: ApiResponse<Receipt>, status: number) {
  return NextResponse.json(body, { status });
}

/**
 * Demo endpoint for enquiries, viewing requests and newsletter sign-ups.
 * Validates and acknowledges; a real deployment would forward to a CRM here.
 */
export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return json({ success: false, data: null, error: "Too many requests. Please wait a minute and try again." }, 429);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ success: false, data: null, error: "The request could not be read." }, 400);
  }

  const result = validateEnquiry(payload);
  if (!result.ok) {
    return json({ success: false, data: null, error: "Some details need another look.", fields: result.errors }, 422);
  }

  // A filled honeypot still gets a normal-looking receipt, so bots learn nothing.
  const reference = `SE-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  return json({ success: true, data: { reference }, error: null }, 200);
}
