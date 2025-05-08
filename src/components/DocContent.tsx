// src/components/DocContent.tsx
"use client";
import dynamic from "next/dynamic";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

// dynamically load the real MDXRenderer in the browser only
const MdxRenderer = dynamic(() => import("@/components/MdxRenderer"), {
  ssr: false,
});

interface DocContentProps {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
}

export default function DocContent({ source }: DocContentProps) {
  // now MdxRenderer (and its hooks) only run in the client
  return <MdxRenderer source={source} />;
}
