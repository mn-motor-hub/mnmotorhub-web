import type { Metadata } from 'next'
import PageLayout from '@/components/PageLayout/PageLayout'
import styles from '@/components/PageLayout/PageLayout.module.css'

export const metadata: Metadata = {
  title: 'Política de Envíos — MN Motor Hub',
  description: 'Enviamos a todo Venezuela por MRW y Zoom Delivery. Conoce tiempos, costos y condiciones.',
}

export default function EnviosPage() {
  return (
    <PageLayout title="POLÍTICA DE ENVÍOS">
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>COBERTURA</h2>
        <p className={styles.body}>
          Enviamos a todo el territorio venezolano a través de las agencias MRW y Zoom Delivery. No realizamos envíos internacionales.
        </p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>TIEMPOS DE DESPACHO</h2>
        <p className={styles.body}>
          Una vez confirmado y pagado tu pedido, lo preparamos y despachamos en un plazo de 1 a 2 días hábiles. Recibirás el número de guía para hacer seguimiento directamente en la página de la transportista.
        </p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>COSTO DE ENVÍO</h2>
        <p className={styles.body}>
          El costo varía según el peso, las dimensiones y la ciudad de destino. Se calcula y se informa antes de confirmar el pedido. Sin sorpresas.
        </p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>RETIRO PRESENCIAL</h2>
        <p className={styles.body}>
          Si prefieres retirar tu pedido personalmente, podemos coordinarlo. Consúltanos por nuestros canales de atención para acordar lugar y horario.
        </p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>RESPONSABILIDAD</h2>
        <p className={styles.body}>
          MN Motor Hub se responsabiliza por el embalaje y despacho correcto. Una vez entregado a la transportista, los tiempos de entrega son responsabilidad de MRW o Zoom según corresponda.
        </p>
      </div>
    </PageLayout>
  )
}
