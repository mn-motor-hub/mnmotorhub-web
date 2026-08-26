export interface CatalogItem {
  codigoInterno: string
  nombre: string
  marca: string | null
  categoria: string
  subcategoria: string
  precioVenta: number
  disponible: boolean
}

export interface CatalogListMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CatalogListResponse {
  data: CatalogItem[]
  meta: CatalogListMeta
}
