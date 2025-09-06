// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  if (host.startsWith("sports.")) {
    return NextResponse.rewrite(
      new URL(`/sports${req.nextUrl.pathname}`, req.url)
    );
  }

  if (host.startsWith("politics.")) {
    return NextResponse.rewrite(
      new URL(`/politics${req.nextUrl.pathname}`, req.url)
    );
  }

  return NextResponse.next();
}
