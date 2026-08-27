import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCatalog, getCategoriaById } from '@/lib/api/catalog'
import PageLayout from '@/components/PageLayout/PageLayout'
import CatalogList from '@/components/Catalog/CatalogList'
import Pagination from '@/components/Catalog/Pagination'

const PAGE_SIZE = 12

interface CategoriaPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: CategoriaPageProps): Promise<Metadata> {
  const { id } = await params
  const categoria = await getCategoriaById(id).catch(() => null)

  if (!categoria) {
    return { title: 'Categoría no encontrada — MN Motor Hub' }
  }

  return { title: `${categoria.nombre} — MN Motor Hub` }
}

export default async function CategoriaPage({ params, searchParams }: CategoriaPageProps) {
  const { id } = await params
  const resolvedParams = await searchParams
  const requestedPage = Number(resolvedParams.page)
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.floor(requestedPage) : 1

  const categoria = await getCategoriaById(id).catch(() => null)

  if (!categoria) {
    notFound()
  }

  const { data, meta } = await getCatalog({ page, limit: PAGE_SIZE, categoriaId: id })

  return (
    <PageLayout title={categoria.nombre} subtitle="Artículos disponibles en esta categoría" compact>
      <CatalogList
        items={data}
        emptyTitle="Sin artículos"
        emptyText="Todavía no hay artículos cargados en esta categoría."
      />
      <Pagination page={meta.page} totalPages={meta.totalPages} basePath={`/categoria/${id}`} />
    </PageLayout>
  )
}
