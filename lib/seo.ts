import type { CatalogItem, Categoria } from './api/types'
import { formatPrice } from './format'

const MAX_SUBCATEGORIAS_EN_DESCRIPTION = 4

export function buildProductDescription(item: CatalogItem): string {
  const categoriaSegment = item.categoria
    ? ` — ${[item.categoria, item.subcategoria].filter(Boolean).join(' / ')}`
    : ''
  const disponibilidad = item.disponible ? 'Disponible' : 'Consulta disponibilidad por WhatsApp'

  return `${item.nombre}${categoriaSegment} en MN Motor Hub. ${formatPrice(item.precioVenta)}. ${disponibilidad}. Envío a todo Venezuela.`
}

export function buildCategoriaDescription(categoria: Categoria): string {
  const subcategoriasSegment = categoria.subcategorias.length
    ? `: ${categoria.subcategorias
        .slice(0, MAX_SUBCATEGORIAS_EN_DESCRIPTION)
        .map((subcategoria) => subcategoria.nombre)
        .join(', ')}`
    : ''

  return `Catálogo de ${categoria.nombre} en MN Motor Hub${subcategoriasSegment}. Envío a todo Venezuela, atención directa por WhatsApp.`
}
