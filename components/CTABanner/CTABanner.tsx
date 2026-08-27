import { MessageCircle, ArrowRight } from 'lucide-react'
import styles from './CTABanner.module.css'

const WHATSAPP_URL = 'https://wa.me/584221649320?text=Hola%2C%20no%20encuentro%20una%20pieza%20y%20quiero%20consultar'

export default function CTABanner() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className="section-accent" />
          <p className={styles.label}>ATENCIÓN PERSONALIZADA</p>
          <h2 className={styles.title}>
            ¿NO ENCONTRÁS LA PIEZA?
          </h2>
          <p className={styles.description}>
            Escribinos por WhatsApp con el modelo de tu vehículo y te consiguemos lo que necesitás.
          </p>
        </div>
        <div className={styles.actions}>
          <a
            href={WHATSAPP_URL}
            className={styles.ctaWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} />
            Consultar por WhatsApp
          </a>
          <a href="#categorias" className={styles.ctaSecondary}>
            Ver categorías <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
