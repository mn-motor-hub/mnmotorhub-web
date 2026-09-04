import Link from 'next/link'
import type { CatalogItem } from '@/lib/api/types'
import { formatPrice } from '@/lib/format'
import AvailabilityBadge from '@/components/AvailabilityBadge/AvailabilityBadge'
import ProductImage from '@/components/ProductImage/ProductImage'
import styles from './ProductListItem.module.css'

interface ProductListItemProps {
  item: CatalogItem
}

export default function ProductListItem({ item }: ProductListItemProps) {
  return (
    <Link href={`/producto/${item.codigoInterno}`} className={styles.row}>
      <div className={styles.lead}>
        <div className={styles.thumb}>
          <ProductImage
            imagenes={item.imagenes}
            alt={item.nombre}
            sizes="(min-width: 768px) 88px, 72px"
          />
        </div>
        <div className={styles.main}>
          {item.subcategoria && <span className={styles.subcategory}>{item.subcategoria}</span>}
          <span className={styles.name}>{item.nombre}</span>
          {item.marca && <span className={styles.brand}>{item.marca}</span>}
          {item.descripcion && <p className={styles.description}>{item.descripcion}</p>}
        </div>
      </div>
      <div className={styles.side}>
        <span className={styles.price}>{formatPrice(item.precioVenta)}</span>
        <AvailabilityBadge disponible={item.disponible} />
      </div>
    </Link>
  )
}
