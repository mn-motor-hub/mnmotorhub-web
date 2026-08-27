import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck, Truck, Headphones } from 'lucide-react'
import styles from './Hero.module.css'

const WHATSAPP_URL = 'https://wa.me/584221649320?text=Hola%2C%20quiero%20consultar%20sobre%20un%20repuesto'

export default function Hero() {
  return (
    <section className={styles.section}>
      <div className={styles.bgWrapper}>
        <Image
          src="/images/hero-bg.png"
          alt="Taller de alto rendimiento con motor de motocicleta siendo ajustado, iluminación dramática con destellos naranjas industriales"
          fill
          priority
          quality={90}
          sizes="100vw"
          className={`${styles.bgImage} ${styles.bgImageDesktop}`}
        />
        <Image
          src="/images/hero-bg-mobile.png"
          alt="Taller de alto rendimiento con motor de motocicleta siendo ajustado, iluminación dramática con destellos naranjas industriales"
          fill
          priority
          quality={90}
          sizes="(max-width: 767px) 100vw, 0px"
          className={`${styles.bgImage} ${styles.bgImageMobile}`}
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className="section-accent section-accent--hero" />
          <h1 className={styles.title}>
            TU CLUTCH NO ESPERA.
          </h1>
          <p className={styles.description}>
            Kits completos y repuestos de mantenimiento con envío a todo Venezuela. Stock real, respuesta inmediata.
          </p>
          <div className={styles.ctas}>
            <Link href="/catalogo" className={styles.ctaPrimary}>
              Ver catálogo
            </Link>
            <a
              href={WHATSAPP_URL}
              className={styles.ctaSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contactar Asesor
            </a>
          </div>

          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <BadgeCheck size={18} className={styles.badgeIcon} />
              <span className={styles.badgeLabel}>Marcas OEM Certificadas</span>
            </div>
            <div className={styles.badge}>
              <Truck size={18} className={styles.badgeIcon} />
              <span className={styles.badgeLabel}>Envío a Todo Venezuela</span>
            </div>
            <div className={styles.badge}>
              <Headphones size={18} className={styles.badgeIcon} />
              <span className={styles.badgeLabel}>Te Asesoramos Gratis</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.decorative} aria-hidden="true">
        HUB
      </div>
    </section>
  )
}
