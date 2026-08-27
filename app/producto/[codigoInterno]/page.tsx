import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCatalogItem } from '@/lib/api/catalog'
import { formatPrice } from '@/lib/format'
import AvailabilityBadge from '@/components/AvailabilityBadge/AvailabilityBadge'
import styles from './page.module.css'

interface ProductPageProps {
  params: Promise<{ codigoInterno: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { codigoInterno } = await params
  const item = await getCatalogItem(codigoInterno)

  if (!item) {
    return { title: 'Producto no encontrado — MN Motor Hub' }
  }

  return { title: `${item.nombre} — MN Motor Hub` }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { codigoInterno } = await params
  const item = await getCatalogItem(codigoInterno)

  if (!item) {
    notFound()
  }

  const breadcrumb = [item.categoria, item.subcategoria].filter(Boolean).join(' / ')

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        {breadcrumb && <span className={styles.breadcrumb}>{breadcrumb}</span>}
        <h1 className={styles.name}>{item.nombre}</h1>
        {item.marca && <p className={styles.brand}>Marca: {item.marca}</p>}
        {item.descripcion && <p className={styles.description}>{item.descripcion}</p>}
        <p className={styles.price}>{formatPrice(item.precioVenta)}</p>
        <AvailabilityBadge disponible={item.disponible} />
      </div>
    </div>
  )
}
