import { PackageSearch } from 'lucide-react'
import ProductListItem from '@/components/Catalog/ProductListItem'
import type { CatalogItem } from '@/lib/api/types'
import styles from './CatalogList.module.css'

interface CatalogListProps {
  items: CatalogItem[]
  hasQuery?: boolean
}

export default function CatalogList({ items, hasQuery = false }: CatalogListProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <PackageSearch size={40} strokeWidth={1.5} className={styles.emptyIcon} />
        <p className={styles.emptyTitle}>{hasQuery ? 'Sin resultados' : 'Catálogo en actualización'}</p>
        <p className={styles.emptyText}>
          {hasQuery
            ? 'No encontramos artículos que coincidan con tu búsqueda. Probá con otro término.'
            : 'Estamos cargando el stock disponible. Volvé a revisar en unos días.'}
        </p>
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <ProductListItem key={item.codigoInterno} item={item} />
      ))}
    </div>
  )
}
