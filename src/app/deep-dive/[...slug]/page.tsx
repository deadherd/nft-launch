// src/app/docs/[...slug]/page.tsx
import DocsLayout from "@/components/DocsLayout";
import DocContent from "@/components/DocContent";
import DocsFooter from "@/layout/DocsFooter";
import {
  getAllDocsMeta,
  getDocBySlug,
  getHeadings,
  serializeMDX,
  type DocMeta,
} from "@/utils/mdx.server";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

type TocItem = { text: string; slug: string; level: number };
interface StaticParams {
  slug: string[];
}

export function generateStaticParams(): StaticParams[] {
  return getAllDocsMeta().map((d) => ({ slug: d.slug.split("/") }));
}

interface PageProps {
  params: Promise<StaticParams>;
}

export default async function DocPage({ params }: PageProps) {
  const { slug: slugArr } = await params;
  const slugPath = slugArr.join("/");
  const { content, data } = getDocBySlug(slugPath);
  const toc: TocItem[] = getHeadings(content);
  const source: MDXRemoteSerializeResult = await serializeMDX(content);
  const docs: DocMeta[] = getAllDocsMeta();

  return (
    <>
      <DocsLayout
        docs={docs}
        toc={toc}
        title={data.title}
        icon={data.icon}
        banner={data.banner}
      >
        <DocContent source={source} />
        <DocsFooter />
      </DocsLayout>
    </>
  );
}
