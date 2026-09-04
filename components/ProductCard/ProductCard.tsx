import Link from 'next/link'
import type { CatalogItem } from '@/lib/api/types'
import { formatPrice } from '@/lib/format'
import AvailabilityBadge from '@/components/AvailabilityBadge/AvailabilityBadge'
import ProductImage from '@/components/ProductImage/ProductImage'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  item: CatalogItem
}

export default function ProductCard({ item }: ProductCardProps) {
  const href = `/producto/${item.codigoInterno}`

  return (
    <article className={styles.card}>
      {/*
        Enlace redundante con el del nombre: el usuario espera poder tocar la
        foto, pero se saca del orden de tabulación y del árbol accesible para
        no duplicar la misma parada de teclado.
      */}
      <Link href={href} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
        <ProductImage
          imagenes={item.imagenes}
          alt={item.nombre}
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw"
        />
      </Link>
      <div className={styles.body}>
        {item.subcategoria && <span className={styles.subcategory}>{item.subcategoria}</span>}
        <Link href={href} className={styles.name}>
          {item.nombre}
        </Link>
        {item.marca && <span className={styles.brand}>{item.marca}</span>}
        {item.descripcion && <p className={styles.description}>{item.descripcion}</p>}
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(item.precioVenta)}</span>
          <AvailabilityBadge disponible={item.disponible} />
        </div>
      </div>
    </article>
  )
}
