import { LayoutGrid } from 'lucide-react'
import CategoriaCard from '@/components/Categorias/CategoriaCard'
import type { Categoria } from '@/lib/api/types'
import styles from './CategoriasGrid.module.css'

interface CategoriasGridProps {
  categorias: Categoria[]
}

export default function CategoriasGrid({ categorias }: CategoriasGridProps) {
  if (categorias.length === 0) {
    return (
      <div className={styles.empty}>
        <LayoutGrid size={40} strokeWidth={1.5} className={styles.emptyIcon} />
        <p className={styles.emptyTitle}>Categorías en camino</p>
        <p className={styles.emptyText}>
          Estamos organizando las categorías del catálogo. Volvé a revisar en unos días.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {categorias.map((categoria) => (
        <CategoriaCard key={categoria.id} categoria={categoria} />
      ))}
    </div>
  )
}
