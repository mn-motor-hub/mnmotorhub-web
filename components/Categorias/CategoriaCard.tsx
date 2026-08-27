import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Categoria } from '@/lib/api/types'
import styles from './CategoriaCard.module.css'

interface CategoriaCardProps {
  categoria: Categoria
}

const SUBCATEGORIAS_PREVIEW_LIMIT = 3

function subtitleFor(categoria: Categoria): string | null {
  if (categoria.subcategorias.length === 0) {
    return null
  }
  const nombres = categoria.subcategorias.map((s) => s.nombre)
  const preview = nombres.slice(0, SUBCATEGORIAS_PREVIEW_LIMIT).join(', ')
  const remaining = nombres.length - SUBCATEGORIAS_PREVIEW_LIMIT
  return remaining > 0 ? `${preview} y ${remaining} más` : preview
}

export default function CategoriaCard({ categoria }: CategoriaCardProps) {
  const subtitle = subtitleFor(categoria)

  return (
    <Link href={`/categoria/${categoria.id}`} className={styles.card}>
      <h3 className={styles.name}>{categoria.nombre}</h3>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <span className={styles.link}>
        Ver artículos <ArrowRight size={16} />
      </span>
    </Link>
  )
}
