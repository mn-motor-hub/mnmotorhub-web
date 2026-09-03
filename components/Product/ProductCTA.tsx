import { MessageCircle } from 'lucide-react'
import { productInquiryUrl } from '@/lib/contact'
import styles from './ProductCTA.module.css'

interface ProductCTAProps {
  nombre: string
  codigoInterno: string
  disponible: boolean
}

/**
 * Única vía de conversión de la página de producto. Server Component: es un
 * enlace, no necesita estado del browser.
 */
export default function ProductCTA({ nombre, codigoInterno, disponible }: ProductCTAProps) {
  return (
    <div className={styles.wrapper}>
      <a
        href={productInquiryUrl(nombre, codigoInterno)}
        className={styles.cta}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={20} aria-hidden="true" />
        {disponible ? 'Consultar por WhatsApp' : 'Consultar disponibilidad'}
      </a>
      <p className={styles.hint}>
        Te respondemos con stock, precio final y opciones de envío.
      </p>
    </div>
  )
}
