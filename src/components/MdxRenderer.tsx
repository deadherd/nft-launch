// src/components/MdxRenderer.tsx
"use client";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

interface Props {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}

export default function MdxRenderer({ source }: Props) {
  return <MDXRemote {...source} />;
}
