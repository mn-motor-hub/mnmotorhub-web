import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PackageSearch } from 'lucide-react'
import { getCatalogItem } from '@/lib/api/catalog'
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.imagePlaceholder}>
        <PackageSearch size={64} strokeWidth={1.5} />
      </div>
      <div className={styles.info}>
        <span className={styles.breadcrumb}>
          {item.categoria} / {item.subcategoria}
        </span>
        <h1 className={styles.name}>{item.nombre}</h1>
        {item.marca && <p className={styles.brand}>Marca: {item.marca}</p>}
        <p className={styles.price}>${item.precioVenta.toFixed(2)}</p>
        <AvailabilityBadge disponible={item.disponible} />
      </div>
    </div>
  )
}
