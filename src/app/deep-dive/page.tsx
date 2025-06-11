// app/deep-dive/[...slug]/page.tsx

import DocsLayout from '@/components/DocsLayout'
import { getAllDocsMeta } from '@/lib/mdxService'
import type { DocMeta } from '@/types/DocMeta'
import { redirect } from 'next/navigation'

export default async function DocsIndex() {
  redirect('/deep-dive/get-started')

  const docs: DocMeta[] = getAllDocsMeta()

  return (
    <>
      <DocsLayout docs={docs} toc={[]} title='DeEp dive' icon='' banner='' ai='' usertag=''>
        {/*<ClientDocsList docs={docs} />*/}{' '}
      </DocsLayout>
    </>
  )
}
