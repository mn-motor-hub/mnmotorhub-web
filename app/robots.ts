import type { MetadataRoute } from 'next'

// Literal a propósito, no `process.env.NEXT_PUBLIC_SITE_URL` — esa variable
// no existe en este repo (ver CLAUDE.md, misma decisión que next.config.ts
// para el host de imágenes).
const SITE_URL = 'https://mnmotorhub.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // La búsqueda de texto libre del catálogo siempre navega a
      // `/catalogo?q=...` sin combinarla con `page` (ver CatalogSearch.navigate) —
      // el prefijo alcanza para bloquear todas sus variantes.
      disallow: '/catalogo?q=*',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
