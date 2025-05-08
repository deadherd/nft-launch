// pages/docs/[...slug].tsx
"use client";
import type {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
  GetStaticPropsContext,
} from "next";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import DocsLayout from "../../components/DocsLayout";
import {
  getAllDocsMeta,
  getDocBySlug,
  getHeadings,
  serializeMDX,
  DocMeta,
} from "../../utils/mdx.server";
import type { ParsedUrlQuery } from "querystring";

// type for TOC items
type TocItem = {
  text: string;
  slug: string;
  level: number;
};

// props passed to the page
interface DocPageProps {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  frontMatter: {
    title: string;
    order: number | null;
  };
  toc: TocItem[];
  docs: DocMeta[];
}

// params for getStaticProps
interface Params extends ParsedUrlQuery {
  slug: string[];
}

// main page component
type Props = DocPageProps;
const DocPage: NextPage<Props> = ({ source, frontMatter, toc, docs }) => (
  <DocsLayout docs={docs} toc={toc} title={frontMatter.title}>
    <MDXRemote {...source} />
  </DocsLayout>
);

// generate static paths
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const docs = getAllDocsMeta();
  const paths = docs.map((d) => ({ params: { slug: d.slug.split("/") } }));
  return { paths, fallback: false };
};

// fetch data for each page
export const getStaticProps: GetStaticProps<DocPageProps, Params> = async (
  ctx: GetStaticPropsContext<Params>
) => {
  const { params } = ctx;
  const slugArr = params?.slug ?? ["index"];
  const slug = slugArr.join("/");
  const { content, data } = getDocBySlug(slug);
  const toc = getHeadings(content);
  const source = await serializeMDX(content);
  const docs = getAllDocsMeta();

  return {
    props: {
      source,
      frontMatter: { title: data.title, order: data.order },
      toc,
      docs,
    },
  };
};

export default DocPage;
