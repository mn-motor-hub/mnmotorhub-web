import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import PageLayout from '@/components/PageLayout/PageLayout'
import layoutStyles from '@/components/PageLayout/PageLayout.module.css'
import styles from './page.module.css'

function IconInstagram() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'Contáctanos — MN Motor Hub',
  description: 'Contáctanos por Instagram o Facebook. Atención personalizada de lunes a sábado.',
}

export default function ContactoPage() {
  return (
    <PageLayout
      title="CONTÁCTANOS"
      subtitle="Estamos para ayudarte a encontrar la pieza correcta."
    >
      <div className={styles.cardGrid}>
        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <IconInstagram />
          </div>
          <h2 className={styles.cardTitle}>INSTAGRAM</h2>
          <p className={styles.cardText}>
            Escríbenos por DM a @mnmotorhub. Respondemos consultas y coordinamos pedidos.
          </p>
          <a
            href="https://www.instagram.com/mnmotorhub/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
          >
            Ir a Instagram <ArrowRight size={13} />
          </a>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrapper}>
            <IconFacebook />
          </div>
          <h2 className={styles.cardTitle}>FACEBOOK</h2>
          <p className={styles.cardText}>
            Encuéntranos como MN Motor Hub. Mensajes directos y publicaciones de catálogo.
          </p>
          <a
            href="https://www.facebook.com/profile.php?id=61590356652354"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
          >
            Ir a Facebook <ArrowRight size={13} />
          </a>
        </div>
      </div>

      <hr className={layoutStyles.divider} />

      <div className={layoutStyles.section}>
        <h2 className={layoutStyles.sectionTitle}>HORARIO DE ATENCIÓN</h2>
        <div className={styles.scheduleBlock}>
          <div className={styles.scheduleRow}>
            <span className={styles.scheduleDay}>Lunes a Sábado:</span>
            <span className={styles.scheduleTime}>8:00 am – 6:00 pm</span>
          </div>
          <div className={styles.scheduleRow}>
            <span className={styles.scheduleDay}>Domingos:</span>
            <span className={styles.scheduleTime}>8:00 am – 1:00 pm</span>
          </div>
          <div className={styles.scheduleRow}>
            <span className={styles.scheduleDay}>Feriados:</span>
            <span className={styles.scheduleTime}>horario a consultar</span>
          </div>
        </div>
        <div className={styles.note}>
          <p className={layoutStyles.body}>
            Somos una empresa 100% online. No contamos con local físico al público, pero podemos coordinar retiro presencial del pedido. Consúltanos para acordar lugar y horario.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
