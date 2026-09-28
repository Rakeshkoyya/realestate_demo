import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Liveness probe for Docker / Dokploy health checks. */
export function GET() {
  return NextResponse.json({ status: "ok" }, { headers: { "Cache-Control": "no-store" } });
}
