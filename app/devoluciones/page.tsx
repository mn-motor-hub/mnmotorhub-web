import type { Metadata } from 'next'
import PageLayout from '@/components/PageLayout/PageLayout'
import styles from '@/components/PageLayout/PageLayout.module.css'

export const metadata: Metadata = {
  title: 'Devoluciones — MN Motor Hub',
  description: 'Política de devoluciones de MN Motor Hub. Condiciones, plazos y proceso.',
}

export default function DevolucionesPage() {
  return (
    <PageLayout title="DEVOLUCIONES">
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>CONDICIÓN</h2>
        <p className={styles.body}>
          Aceptamos devoluciones únicamente por defecto de fábrica comprobable. No aceptamos devoluciones por cambio de opinión, error en el modelo del vehículo indicado por el cliente, o daños causados por instalación incorrecta.
        </p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>PLAZO</h2>
        <p className={styles.body}>
          El cliente tiene un máximo de 5 días calendario desde la fecha de recepción para notificar el defecto y solicitar la devolución.
        </p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>PROCESO</h2>
        <ol className={styles.orderedList}>
          <li className={styles.orderedItem}>
            Contáctanos indicando el número de pedido y describiendo el defecto.
          </li>
          <li className={styles.orderedItem}>
            Te solicitaremos fotos o video del defecto para evaluarlo.
          </li>
          <li className={styles.orderedItem}>
            Si el defecto es confirmado, coordinamos la devolución y el envío del reemplazo o devolución del pago según lo acuerden las partes.
          </li>
          <li className={styles.orderedItem}>
            El producto debe estar en su empaque original, sin señales de uso o instalación.
          </li>
        </ol>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>GASTOS DE DEVOLUCIÓN</h2>
        <p className={styles.body}>
          Si el defecto es confirmado, MN Motor Hub cubre el costo del envío de devolución. Si la solicitud no procede, los gastos corren por cuenta del cliente.
        </p>
      </div>
    </PageLayout>
  )
}
