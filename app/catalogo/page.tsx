import type { Metadata } from 'next'
import { getCatalog } from '@/lib/api/catalog'
import PageLayout from '@/components/PageLayout/PageLayout'
import CatalogGrid from '@/components/Catalog/CatalogGrid'
import Pagination from '@/components/Catalog/Pagination'

export const metadata: Metadata = {
  title: 'Catálogo — MN Motor Hub',
  description: 'Repuestos automotrices disponibles para carros y motos en Venezuela.',
}

const PAGE_SIZE = 12

interface CatalogPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedParams = await searchParams
  const requestedPage = Number(resolvedParams.page)
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.floor(requestedPage) : 1

  const { data, meta } = await getCatalog({ page, limit: PAGE_SIZE })

  return (
    <PageLayout title="Catálogo" subtitle="Repuestos disponibles para carros y motos">
      <CatalogGrid items={data} />
      <Pagination page={meta.page} totalPages={meta.totalPages} />
    </PageLayout>
  )
}
