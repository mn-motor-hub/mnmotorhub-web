import type { CatalogImagen } from './api/types'

/**
 * La portada es la que trae `esPrincipal`.
 *
 * El fallback a la primera no es defensivo por las dudas: el backend omite del
 * array las imágenes cuyo derivado de catálogo todavía no se generó, así que un
 * producto puede llegar con imágenes pero sin ninguna marcada como principal.
 * En ese caso mostrar la primera es mejor que no mostrar nada.
 */
export function imagenPrincipal(imagenes: CatalogImagen[]): CatalogImagen | null {
  return imagenes.find((img) => img.esPrincipal) ?? imagenes[0] ?? null
}

/** El resto, en el orden en que las manda el backend. */
export function imagenesSecundarias(imagenes: CatalogImagen[]): CatalogImagen[] {
  const principal = imagenPrincipal(imagenes)
  if (!principal) return []
  return imagenes.filter((img) => img.url !== principal.url)
}
