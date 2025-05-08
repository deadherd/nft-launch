import Link from "next/link";
import DocsLayout from "@/components/DocsLayout";
import { getAllDocsMeta, type DocMeta } from "@/utils/mdx.server";

export default async function DocsIndex() {
  const docs: DocMeta[] = getAllDocsMeta();
  return (
    <DocsLayout docs={docs} toc={[]} title="Documentation">
      <ul>
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link href={`/docs/${doc.slug}`}>{doc.title}</Link>
          </li>
        ))}
      </ul>
    </DocsLayout>
  );
}
