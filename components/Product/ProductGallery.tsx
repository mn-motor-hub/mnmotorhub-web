'use client'
// Client Component justificado: elegir cuál imagen se ve en grande es estado
// del navegador y no hay forma de resolverlo en el servidor.
//
// La ficha lo monta SOLO cuando el producto tiene más de una imagen. Con una
// sola no hay nada que elegir y usa ProductImage, que es Server Component y no
// manda nada de JS al cliente — que es el caso de 41 de los 44 repuestos.

import { useState } from 'react'
import Image from 'next/image'
import type { CatalogImagen } from '@/lib/api/types'
import styles from './ProductGallery.module.css'

interface ProductGalleryProps {
  /** Ya ordenadas, portada primero. La ficha garantiza que hay más de una. */
  imagenes: CatalogImagen[]
  nombre: string
}

export default function ProductGallery({ imagenes, nombre }: ProductGalleryProps) {
  const [activa, setActiva] = useState(0)
  const actual = imagenes[activa] ?? imagenes[0]

  if (!actual) return null

  return (
    <div className={styles.gallery}>
      <div className={styles.frame}>
        <Image
          src={actual.url}
          alt={activa === 0 ? nombre : `${nombre} — vista ${activa + 1}`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className={styles.image}
          priority
        />
      </div>

      <ul className={styles.thumbs}>
        {imagenes.map((img, i) => (
          <li key={img.url}>
            <button
              type="button"
              className={i === activa ? `${styles.thumb} ${styles.thumbActive}` : styles.thumb}
              // aria-pressed y no aria-current: es un botón que alterna cuál se
              // muestra, no un enlace de navegación.
              aria-pressed={i === activa}
              aria-label={`Ver imagen ${i + 1} de ${imagenes.length}`}
              onClick={() => setActiva(i)}
            >
              {/* Decorativa: el botón ya se anuncia con su aria-label. */}
              <Image
                src={img.url}
                alt=""
                width={160}
                height={160}
                sizes="120px"
                className={styles.thumbImage}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
