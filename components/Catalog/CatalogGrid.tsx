import { PackageSearch } from 'lucide-react'
import ProductCard from '@/components/ProductCard/ProductCard'
import type { CatalogItem } from '@/lib/api/types'
import styles from './CatalogGrid.module.css'

interface CatalogGridProps {
  items: CatalogItem[]
}

export default function CatalogGrid({ items }: CatalogGridProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <PackageSearch size={40} strokeWidth={1.5} className={styles.emptyIcon} />
        <p className={styles.emptyTitle}>Catálogo en actualización</p>
        <p className={styles.emptyText}>
          Estamos cargando el stock disponible. Volvé a revisar en unos días.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <ProductCard key={item.codigoInterno} item={item} />
      ))}
    </div>
  )
}
