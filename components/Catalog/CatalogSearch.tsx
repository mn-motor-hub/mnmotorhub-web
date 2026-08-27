'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import styles from './CatalogSearch.module.css'

const DEBOUNCE_MS = 400

interface CatalogSearchProps {
  basePath?: string
  placeholder?: string
}

export default function CatalogSearch({
  basePath = '/catalogo',
  placeholder = 'Buscar por nombre, marca o categoría',
}: CatalogSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('q') ?? '')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    return () => clearTimeout(debounceRef.current)
  }, [])

  function navigate(query: string) {
    const params = new URLSearchParams()
    if (query.trim()) {
      params.set('q', query.trim())
    }
    router.replace(`${basePath}${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false })
  }

  function handleChange(next: string) {
    setValue(next)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => navigate(next), DEBOUNCE_MS)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    clearTimeout(debounceRef.current)
    navigate(value)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <Search size={18} className={styles.icon} aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
        aria-label="Buscar en el catálogo"
      />
    </form>
  )
}
