import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCategorias } from '@/lib/api/catalog'
import styles from './Categories.module.css'

interface FeaturedCategoryConfig {
  categoriaId: string
  name: string
  subtitle: string
  imageUrl: string
  wide?: boolean
}

/**
 * El ERP no tiene categorías llamadas "Kits de Clutch" ni "Mantenimiento"
 * (ver SEO-01). Estos ids son la decisión de negocio de a qué categoría real
 * del backend apunta cada tarjeta destacada — no un slug ni un nombre, así
 * que sobreviven a un rename en el ERP. Si el ERP borra el id, la tarjeta
 * deja de mostrarse en vez de enlazar a un 404.
 */
const FEATURED_CATEGORIES: FeaturedCategoryConfig[] = [
  {
    categoriaId: '31353a4c-2ae4-4311-874a-5a4ca1eac68f', // SISTEMA DE EMBRAGUE Y CAJA
    name: 'Kits de Clutch',
    subtitle: 'Kits completos para tu carro',
    imageUrl: '/images/productos/kit-clutch.png',
    wide: true,
  },
  {
    categoriaId: '465a03d8-8146-4208-ae2d-514bcd7e924d', // FILTROS
    name: 'Mantenimiento',
    subtitle: 'Filtros, aceites, bujías y correas',
    imageUrl: '/images/productos/mantenimiento.png',
  },
]

interface SecondaryCategoryConfig {
  categoriaId: string
  name: string
}

/**
 * Ids reales del ERP para los chips secundarios (MN-40). Mismo criterio que
 * FEATURED_CATEGORIES: si el ERP borra el id, el chip deja de mostrarse en
 * vez de enlazar a un 404.
 */
const SECONDARY_CATEGORIES: SecondaryCategoryConfig[] = [
  { categoriaId: '578e87f4-5de3-4b0c-b14f-f19aeeca273f', name: 'Frenos' }, // SISTEMA FRENOS
  { categoriaId: 'c05757e7-5c23-4da0-9fe3-382e6e51615a', name: 'Suspensión' }, // SUSPENSION
]

export default async function Categories() {
  let categorias: Awaited<ReturnType<typeof getCategorias>> = []

  try {
    categorias = await getCategorias()
  } catch {
    categorias = []
  }

  const featured = FEATURED_CATEGORIES.flatMap((config) => {
    const categoria = categorias.find((c) => c.id === config.categoriaId)
    return categoria ? [{ ...config, id: categoria.id }] : []
  })

  const secondary = SECONDARY_CATEGORIES.flatMap((config) => {
    const categoria = categorias.find((c) => c.id === config.categoriaId)
    return categoria ? [{ ...config, id: categoria.id }] : []
  })

  return (
    <section id="categorias" className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className="section-accent" />
          <h2 className={styles.title}>CATEGORÍAS DESTACADAS</h2>
          <p className={styles.subtitle}>
            Encuentra lo que tu vehículo necesita hoy
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
            href={`/categoria/${cat.id}`}
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
        {secondary.map((cat) => (
          <Link key={cat.id} href={`/categoria/${cat.id}`} className={styles.chip}>
            <span className={styles.chipName}>{cat.name}</span>
            <ArrowRight size={14} className={styles.chipArrow} />
          </Link>
        ))}
      </div>
    </section>
  )
}
