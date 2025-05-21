import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

export type NonceResponse = { nonce: string };

export async function GET(): Promise<NextResponse<NonceResponse>> {
  // generate a hex nonce
  const nonce = randomBytes(16).toString("hex");
  // build json response + set cookie
  const res = NextResponse.json({ nonce });
  res.cookies.set("siwe_nonce", nonce, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });
  return res;
}
