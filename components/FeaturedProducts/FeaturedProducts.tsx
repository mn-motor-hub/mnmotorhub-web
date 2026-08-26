import { ArrowRight } from 'lucide-react'
import { getCatalog } from '@/lib/api/catalog'
import ProductCard from '@/components/ProductCard/ProductCard'
import styles from './FeaturedProducts.module.css'

const FEATURED_LIMIT = 6

export default async function FeaturedProducts() {
  let items: Awaited<ReturnType<typeof getCatalog>>['data'] = []

  try {
    const result = await getCatalog({ limit: FEATURED_LIMIT })
    items = result.data
  } catch {
    return null
  }

  if (items.length === 0) {
    return null
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className="section-accent" />
          <h2 className={styles.title}>Productos Destacados</h2>
          <p className={styles.subtitle}>Los más buscados por nuestros clientes</p>
        </div>
        <a href="/catalogo" className={styles.viewAll}>
          Ver catálogo completo <ArrowRight size={16} />
        </a>
      </div>

      <div className={styles.grid}>
        {items.map((item) => (
          <ProductCard key={item.codigoInterno} item={item} />
        ))}
      </div>
    </section>
  )
}
