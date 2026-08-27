import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/mock/categories'
import styles from './Categories.module.css'

export default function Categories() {
  const featured = categories.filter((c) => c.featured)
  const rest = categories.filter((c) => !c.featured)

  return (
    <section id="categorias" className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className="section-accent" />
          <h2 className={styles.title}>CATEGORÍAS DESTACADAS</h2>
          <p className={styles.subtitle}>
            Encontrá lo que tu vehículo necesita hoy
          </p>
        </div>
        <Link href="/categorias" className={styles.viewAll}>
          Explorar todo <ArrowRight size={16} />
        </Link>
      </div>

      <div className={styles.bentoGrid}>
        {featured.map((cat) => (
          <Link
            key={cat.id}
            href={`/categoria/${cat.slug}`}
            className={`${styles.card} ${cat.wide ? styles.cardWide : ''}`}
          >
            <Image
              src={cat.imageUrl}
              alt={cat.name}
              fill
              className={styles.cardImage}
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 66vw, 853px"
            />
            <div className={styles.cardGradient} />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{cat.name}</h3>
              <p className={styles.cardSubtitle}>{cat.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.secondaryGrid}>
        {rest.map((cat) => (
          <div key={cat.id} className="soon-wrap">
            <span className="soon-label">Próximamente</span>
            <Link href="#" className={styles.chip}>
              <span className={styles.chipName}>{cat.name}</span>
              <ArrowRight size={14} className={styles.chipArrow} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
