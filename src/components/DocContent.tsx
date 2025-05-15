// src/components/DocContent.tsx
"use client";
import dynamic from "next/dynamic";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

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
  return <MdxRenderer source={source} />;
}
