import Image from 'next/image'
import type { CatalogImagen } from '@/lib/api/types'
import { imagenPrincipal } from '@/lib/images'
import styles from './ProductImage.module.css'

interface ProductImageProps {
  imagenes: CatalogImagen[]
  /** Nombre del producto — el alt real de la foto. */
  alt: string
  /** Ancho renderizado por breakpoint, para que next/image sirva el tamaño justo. */
  sizes: string
  priority?: boolean
}

/**
 * Imagen principal de un producto, con su estado vacío de marca.
 *
 * Compartido entre la card de la home, la fila del catálogo y la ficha: cuál
 * imagen es la portada y cómo se ve un producto sin foto son decisiones que
 * tienen que vivir en un solo lugar.
 *
 * El contenedor es 1:1 porque los derivados de catálogo salen del backend en
 * esa proporción (masters 1200×1200).
 */
export default function ProductImage({ imagenes, alt, sizes, priority = false }: ProductImageProps) {
  const principal = imagenPrincipal(imagenes)

  if (!principal) {
    return (
      <div className={`${styles.frame} ${styles.empty}`}>
        {/* Decorativa: el nombre del producto ya está en el texto de la tarjeta. */}
        <Image
          src="/images/logo-motor-hub.png"
          alt=""
          width={1024}
          height={1024}
          className={styles.emptyLogo}
        />
      </div>
    )
  }

  return (
    <div className={styles.frame}>
      <Image
        src={principal.url}
        alt={alt}
        fill
        sizes={sizes}
        className={styles.image}
        priority={priority}
      />
    </div>
  )
}
