// pages/docs/index.tsx
"use client";
import Link from "next/link";
import type { GetStaticProps, NextPage } from "next";
import { getAllDocsMeta, type DocMeta } from "../../utils/mdx.server";
import s from "../../styles/Docs.module.sass";

type Props = { docs: DocMeta[] };

const DocsIndex: NextPage<Props> = ({ docs }) => {
  return (
    <div className={s.docsLayout}>
      {/* you could reuse your DocsLayout here if you want the same 3-col look */}
      <nav className={s.leftNav}>
        <ul>
          {docs.map((d) => (
            <li key={d.slug}>
              <Link href={`/docs/${d.slug}`}>
                {d.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <main className={s.mainContent}>
        <h1>Documentation</h1>
        <p>Welcome! Pick a page from the left to get started.</p>
      </main>
      <aside className={s.rightToc}>{/* empty or custom TOC here */}</aside>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const docs = getAllDocsMeta();
  return { props: { docs } };
};

export default DocsIndex;
