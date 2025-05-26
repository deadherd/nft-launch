// src/app/docs/page.tsx
import DocsLayout from "@/components/DocsLayout";
//import ClientDocsList from "@/components/ClientDocsLists";
import { getAllDocsMeta, type DocMeta } from "@/lib/mdxService";

export default async function DocsIndex() {
  const docs: DocMeta[] = getAllDocsMeta();
  return (
    <>
      <DocsLayout docs={docs} toc={[]} title="DeEp dive" icon="" banner="">
        {/*<ClientDocsList docs={docs} />*/}
        {" "}
      </DocsLayout>
    </>
  );
}
