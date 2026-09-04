import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getCatalogItem } from '@/lib/api/catalog'
import { formatPrice } from '@/lib/format'
import { imagenesSecundarias } from '@/lib/images'
import AvailabilityBadge from '@/components/AvailabilityBadge/AvailabilityBadge'
import ProductCTA from '@/components/Product/ProductCTA'
import ProductImage from '@/components/ProductImage/ProductImage'
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
  const secundarias = imagenesSecundarias(item.imagenes)

  return (
    <div className={styles.wrapper}>
      <div className={styles.layout}>
        <div className={styles.gallery}>
          <ProductImage
            imagenes={item.imagenes}
            alt={item.nombre}
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
          />
          {secundarias.length > 0 && (
            <ul className={styles.thumbs}>
              {secundarias.map((img, i) => (
                <li key={img.url} className={styles.thumb}>
                  <Image
                    src={img.url}
                    alt={`${item.nombre} — vista ${i + 2}`}
                    width={160}
                    height={160}
                    sizes="120px"
                    className={styles.thumbImage}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.info}>
          {breadcrumb && <span className={styles.breadcrumb}>{breadcrumb}</span>}
          <h1 className={styles.name}>{item.nombre}</h1>
          {item.marca && <p className={styles.brand}>Marca: {item.marca}</p>}
          {item.descripcion && <p className={styles.description}>{item.descripcion}</p>}
          <p className={styles.price}>{formatPrice(item.precioVenta)}</p>
          <AvailabilityBadge disponible={item.disponible} />
          {/* El código es lo que el cliente cita al consultar */}
          <p className={styles.code}>Código: {item.codigoInterno}</p>
          <ProductCTA
            nombre={item.nombre}
            codigoInterno={item.codigoInterno}
            disponible={item.disponible}
          />
        </div>
      </div>
    </div>
  )
}
