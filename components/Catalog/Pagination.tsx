import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './Pagination.module.css'

interface PaginationProps {
  page: number
  totalPages: number
  q?: string
}

function buildHref(page: number, q?: string): string {
  const params = new URLSearchParams({ page: String(page) })
  if (q) params.set('q', q)
  return `/catalogo?${params.toString()}`
}

export default function Pagination({ page, totalPages, q }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const isFirst = page <= 1
  const isLast = page >= totalPages
  const prevPage = Math.max(1, page - 1)
  const nextPage = Math.min(totalPages, page + 1)

  return (
    <nav className={styles.pagination} aria-label="Paginación de catálogo">
      <Link
        href={buildHref(prevPage, q)}
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : undefined}
        className={`${styles.control} ${isFirst ? styles.disabled : ''}`}
      >
        <ChevronLeft size={18} />
        Anterior
      </Link>
      <span className={styles.status}>
        Página {page} de {totalPages}
      </span>
      <Link
        href={buildHref(nextPage, q)}
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : undefined}
        className={`${styles.control} ${isLast ? styles.disabled : ''}`}
      >
        Siguiente
        <ChevronRight size={18} />
      </Link>
    </nav>
  )
}
