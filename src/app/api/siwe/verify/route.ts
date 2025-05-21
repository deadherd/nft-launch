// src/app/api/siwe/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SiweMessage } from "siwe";

export type VerifySuccess = { ok: true };
export type VerifyError = { error: string };

export async function POST(
  request: NextRequest
): Promise<NextResponse<VerifySuccess | VerifyError>> {
  const { message, signature } = (await request.json()) as {
    message: string;
    signature: string;
  };

  const stored = request.cookies.get("siwe_nonce")?.value;
  if (!stored) {
    return NextResponse.json({ error: "no nonce in cookies" }, { status: 400 });
  }

  try {
    const siwe = new SiweMessage(message);
    await siwe.verify({
      signature,
      domain: new URL(request.url).host,
      nonce: stored,
    });

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    // narrow unknown to Error or fallback to string
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
