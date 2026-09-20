import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCatalog, getCategoriaById } from '@/lib/api/catalog'
import { buildCategoriaDescription } from '@/lib/seo'
import PageLayout from '@/components/PageLayout/PageLayout'
import CatalogSearch from '@/components/Catalog/CatalogSearch'
import CatalogList from '@/components/Catalog/CatalogList'
import { Pagination } from '@mn/design-system/ui'

const PAGE_SIZE = 12

interface CategoriaPageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ page?: string; q?: string }>
}

export async function generateMetadata({ params }: CategoriaPageProps): Promise<Metadata> {
  const { id } = await params
  const categoria = await getCategoriaById(id).catch(() => null)

  if (!categoria) {
    return { title: 'Categoría no encontrada — MN Motor Hub' }
  }

  return {
    title: `${categoria.nombre} — MN Motor Hub`,
    description: buildCategoriaDescription(categoria),
    // Fijo a la categoría sin querystring: ?page y ?q no deben competir por
    // indexación con esta URL.
    alternates: { canonical: `/categoria/${id}` },
  }
}

export default async function CategoriaPage({ params, searchParams }: CategoriaPageProps) {
  const { id } = await params
  const resolvedParams = await searchParams
  const requestedPage = Number(resolvedParams.page)
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.floor(requestedPage) : 1
  const q = resolvedParams.q?.trim() || undefined

  const categoria = await getCategoriaById(id).catch(() => null)

  if (!categoria) {
    notFound()
  }

  const { data, meta } = await getCatalog({ page, limit: PAGE_SIZE, categoriaId: id, q })

  return (
    <PageLayout title={categoria.nombre} subtitle="Artículos disponibles en esta categoría" compact>
      <CatalogSearch basePath={`/categoria/${id}`} placeholder="Buscar por nombre o marca" />
      <CatalogList
        items={data}
        hasQuery={Boolean(q)}
        emptyTitle={q ? undefined : 'Sin artículos por ahora'}
        emptyText={q ? undefined : 'Escríbenos por WhatsApp y te decimos cuándo entra stock.'}
      />
      <Pagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        basePath={`/categoria/${id}`}
        searchParams={q ? { q } : undefined}
      />
    </PageLayout>
  )
}
