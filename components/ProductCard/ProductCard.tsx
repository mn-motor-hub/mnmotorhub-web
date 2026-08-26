import Link from 'next/link'
import { PackageSearch } from 'lucide-react'
import type { CatalogItem } from '@/lib/api/types'
import AvailabilityBadge from '@/components/AvailabilityBadge/AvailabilityBadge'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  item: CatalogItem
}

export default function ProductCard({ item }: ProductCardProps) {
  const href = `/producto/${item.codigoInterno}`

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.imageLink}>
        <div className={styles.imagePlaceholder}>
          <PackageSearch size={32} strokeWidth={1.5} />
        </div>
        <span className={styles.category}>{item.categoria}</span>
      </Link>
      <div className={styles.body}>
        <Link href={href} className={styles.name}>
          {item.nombre}
        </Link>
        {item.marca && <span className={styles.brand}>{item.marca}</span>}
        <div className={styles.footer}>
          <span className={styles.price}>${item.precioVenta.toFixed(2)}</span>
          <AvailabilityBadge disponible={item.disponible} />
        </div>
      </div>
    </article>
  )
}
