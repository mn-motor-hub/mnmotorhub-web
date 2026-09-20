import type { CatalogItem } from './api/types'
import { buildProductDescription } from './seo'
import { GENERAL_INQUIRY_URL } from './contact'

// Literal a propósito, no `process.env.NEXT_PUBLIC_SITE_URL` — misma decisión
// que `app/sitemap.ts` y `app/robots.ts` (ver CLAUDE.md).
const SITE_URL = 'https://mnmotorhub.com'

/**
 * Copia textual del párrafo de entidad en `components/WhyUs/WhyUs.tsx:48-53`.
 * JSON-LD necesita el texto plano y ese componente lo tiene envuelto en JSX,
 * así que no hay forma de importarlo sin duplicarlo. Si ese párrafo cambia,
 * actualizar también acá — mismo criterio de divergencia explícita que los
 * tokens del design system (CLAUDE.md).
 */
const ORGANIZATION_DESCRIPTION =
  'MN Motor Hub es una empresa familiar venezolana que vende repuestos y kits de ' +
  'mantenimiento para carros, con stock real y despacho a todo el país a través de ' +
  'MRW y Zoom Delivery. Empezamos a operar en junio de 2026, desde el mismo problema ' +
  'que resolvemos: la dificultad de conseguir en Venezuela una pieza que realmente ' +
  'encaje, con alguien que te diga la verdad sobre lo que necesitas. Trabajamos 100% ' +
  'online, por WhatsApp, sin local físico al público.'

/**
 * Derivado de `components/QuickFacts/QuickFacts.tsx:25` ("lunes a sábado,
 * 8:00 am a 6:00 pm"). Mismo criterio de divergencia explícita que
 * ORGANIZATION_DESCRIPTION: si cambia el horario ahí, cambiarlo acá también.
 */
const OPENING_HOURS = {
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '08:00',
  closes: '18:00',
}

export function buildOrganizationJsonLd(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MN Motor Hub',
    url: SITE_URL,
    description: ORGANIZATION_DESCRIPTION,
    areaServed: {
      '@type': 'Country',
      name: 'Venezuela',
    },
    // Sólo a nivel de localidad — la dirección fiscal real es residencial y
    // no se publica (decisión de negocio, no técnica).
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Diego',
      addressRegion: 'Carabobo',
      addressCountry: 'VE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      url: GENERAL_INQUIRY_URL,
      areaServed: 'VE',
      availableLanguage: 'es',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      ...OPENING_HOURS,
    },
  }
}

export function buildProductJsonLd(item: CatalogItem): object {
  const url = `${SITE_URL}/producto/${item.codigoInterno}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: item.nombre,
    description: buildProductDescription(item),
    sku: item.codigoInterno,
    productID: item.codigoInterno,
    url,
    // Sin precio no hay Offer válida para schema.org — se omite en vez de
    // mandar un `price` inventado.
    ...(item.precioVenta !== null
      ? {
          offers: {
            '@type': 'Offer',
            url,
            priceCurrency: 'USD',
            price: item.precioVenta,
            availability: item.disponible
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          },
        }
      : {}),
  }
}

export interface BreadcrumbEntry {
  name: string
  /** Sin `url`: la migaja se declara sin página propia (ej. subcategoría sin ruta). */
  url?: string
}

export function buildBreadcrumbJsonLd(entries: BreadcrumbEntry[]): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: entries.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      ...(entry.url ? { item: entry.url } : {}),
    })),
  }
}

export function homeBreadcrumbEntry(): BreadcrumbEntry {
  return { name: 'Inicio', url: `${SITE_URL}/` }
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`
}
