// src/app/docs/page.tsx
import DocsLayout from '@/components/DocsLayout'
//import ClientDocsList from "@/components/ClientDocsLists";
import { getAllDocsMeta, type DocMeta } from '@/lib/mdxService'
import { redirect } from 'next/navigation'

export default async function DocsIndex() {
  redirect('/deep-dive/get-started')

  const docs: DocMeta[] = getAllDocsMeta()

  return (
    <>
      <DocsLayout docs={docs} toc={[]} title='DeEp dive' icon='' banner=''>
        {/*<ClientDocsList docs={docs} />*/}{' '}
      </DocsLayout>
    </>
  )
}
