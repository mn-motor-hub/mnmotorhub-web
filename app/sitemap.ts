import type { MetadataRoute } from 'next'
import { getCatalog, getCategorias } from '@/lib/api/catalog'
import type { CatalogItem, Categoria } from '@/lib/api/types'

// Literal a propósito, no `process.env.NEXT_PUBLIC_SITE_URL` — esa variable
// no existe en este repo (ver CLAUDE.md, misma decisión que next.config.ts
// para el host de imágenes).
const SITE_URL = 'https://mnmotorhub.com'
const SITEMAP_PAGE_SIZE = 50

const RUTAS_FIJAS = [
  '/',
  '/catalogo',
  '/categorias',
  '/contacto',
  '/envios',
  '/devoluciones',
  '/privacidad',
]

async function getTodosLosProductos(): Promise<CatalogItem[]> {
  const items: CatalogItem[] = []
  let totalPages = 1

  // Cada página se resuelve por separado: si una falla a mitad de camino, el
  // sitemap sale con las páginas ya obtenidas en vez de quedarse sin ninguna.
  for (let page = 1; page <= totalPages; page++) {
    let respuesta
    try {
      respuesta = await getCatalog({ page, limit: SITEMAP_PAGE_SIZE })
    } catch {
      break
    }
    items.push(...respuesta.data)
    totalPages = respuesta.meta.totalPages
  }

  return items
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // `getCategorias()` puede devolver 404 mientras esa ruta no esté desplegada
  // en el backend (ver lib/api/catalog.ts) — mismo criterio de degradación
  // que ya usa app/categorias/page.tsx.
  const [categorias, productos]: [Categoria[], CatalogItem[]] = await Promise.all([
    getCategorias().catch(() => []),
    getTodosLosProductos(),
  ])

  const rutasFijas: MetadataRoute.Sitemap = RUTAS_FIJAS.map((ruta) => ({
    url: `${SITE_URL}${ruta}`,
  }))

  const rutasCategorias: MetadataRoute.Sitemap = categorias.map((categoria) => ({
    url: `${SITE_URL}/categoria/${categoria.id}`,
  }))

  const rutasProductos: MetadataRoute.Sitemap = productos.map((producto) => ({
    url: `${SITE_URL}/producto/${producto.codigoInterno}`,
  }))

  return [...rutasFijas, ...rutasCategorias, ...rutasProductos]
}
