import type { Metadata } from 'next'
import { getCatalog } from '@/lib/api/catalog'
import PageLayout from '@/components/PageLayout/PageLayout'
import CatalogSearch from '@/components/Catalog/CatalogSearch'
import CatalogList from '@/components/Catalog/CatalogList'
import { Pagination } from '@mn/design-system/ui'

export const metadata: Metadata = {
  title: 'Catálogo — MN Motor Hub',
  description: 'Repuestos y accesorios disponibles para carros en Venezuela.',
  // Fijo a /catalogo: ?page y ?q no deben competir por indexación con la
  // versión sin querystring.
  alternates: { canonical: '/catalogo' },
}

const PAGE_SIZE = 12

interface CatalogPageProps {
  searchParams: Promise<{ page?: string; q?: string }>
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedParams = await searchParams
  const requestedPage = Number(resolvedParams.page)
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.floor(requestedPage) : 1
  const q = resolvedParams.q?.trim() || undefined

  const { data, meta } = await getCatalog({ page, limit: PAGE_SIZE, q })

  return (
    <PageLayout
      title="Catálogo"
      subtitle="Repuestos y accesorios disponibles para carros en Venezuela."
      compact
    >
      <CatalogSearch />
      <CatalogList items={data} hasQuery={Boolean(q)} />
      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        basePath="/catalogo"
        searchParams={q ? { q } : undefined}
      />
    </PageLayout>
  )
}
