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
      // El catálogo está oculto temporalmente (la ruta responde 404): se
      // bloquea la ruta completa, no solo sus variantes de búsqueda.
      disallow: '/catalogo',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
