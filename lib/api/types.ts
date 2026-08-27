export interface CatalogItem {
  codigoInterno: string
  nombre: string
  descripcion: string | null
  marca: string | null
  categoria: string | null
  subcategoria: string | null
  categoriaId: string | null
  subcategoriaId: string | null
  precioVenta: number | null
  disponible: boolean
}

export interface Subcategoria {
  id: string
  nombre: string
}

export interface Categoria {
  id: string
  nombre: string
  subcategorias: Subcategoria[]
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
