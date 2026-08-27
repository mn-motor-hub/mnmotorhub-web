import type { CatalogItem, CatalogListResponse } from './types'

const CATALOG_REVALIDATE_SECONDS = 90

interface GetCatalogParams {
  page?: number
  limit?: number
  q?: string
  categoriaId?: string
  subcategoriaId?: string
}

function getApiBaseUrl(): string {
  const baseUrl = process.env.API_BASE_URL
  if (!baseUrl) {
    throw new Error('API_BASE_URL no está configurada')
  }
  return baseUrl
}

export async function getCatalog(params: GetCatalogParams = {}): Promise<CatalogListResponse> {
  const searchParams = new URLSearchParams()
  if (params.page) searchParams.set('page', String(params.page))
  if (params.limit) searchParams.set('limit', String(params.limit))
  if (params.q) searchParams.set('q', params.q)
  if (params.categoriaId) searchParams.set('categoriaId', params.categoriaId)
  if (params.subcategoriaId) searchParams.set('subcategoriaId', params.subcategoriaId)

  const res = await fetch(`${getApiBaseUrl()}/api/catalog?${searchParams.toString()}`, {
    next: { revalidate: CATALOG_REVALIDATE_SECONDS },
  })

  if (!res.ok) {
    throw new Error(`Error al obtener el catálogo: ${res.status}`)
  }

  const json = (await res.json()) as { data: CatalogItem[]; meta?: Partial<CatalogListResponse['meta']> }

  // El backend hoy no siempre incluye `meta` en la respuesta (verificado en producción).
  // Se normaliza acá para no romper la paginación mientras eso no esté resuelto del otro lado.
  const limit = params.limit ?? json.meta?.limit ?? json.data.length
  const page = params.page ?? json.meta?.page ?? 1
  const total = json.meta?.total ?? json.data.length
  const totalPages = json.meta?.totalPages ?? (limit > 0 ? Math.max(1, Math.ceil(total / limit)) : 1)

  return {
    data: json.data,
    meta: { total, page, limit, totalPages },
  }
}

export async function getCatalogItem(codigoInterno: string): Promise<CatalogItem | null> {
  const res = await fetch(`${getApiBaseUrl()}/api/catalog/${encodeURIComponent(codigoInterno)}`, {
    next: { revalidate: CATALOG_REVALIDATE_SECONDS },
  })

  if (res.status === 404) {
    return null
  }

  if (!res.ok) {
    throw new Error(`Error al obtener el producto: ${res.status}`)
  }

  const json = (await res.json()) as { data: CatalogItem }
  return json.data
}
