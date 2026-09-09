import type { Metadata } from 'next'
import PageLayout from '@/components/PageLayout/PageLayout'
import styles from '@/components/PageLayout/PageLayout.module.css'

export const metadata: Metadata = {
  title: 'Política de Privacidad — MN Motor Hub',
  description: 'Cómo MN Motor Hub recolecta, usa y protege tus datos personales.',
}

export default function PrivacidadPage() {
  return (
    <PageLayout title="POLÍTICA DE PRIVACIDAD">
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>DATOS QUE RECOLECTAMOS</h2>
        <p className={styles.body}>
          Para procesar tu pedido y emitir la factura correspondiente recolectamos:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Nombre completo</li>
          <li className={styles.listItem}>Cédula de identidad</li>
          <li className={styles.listItem}>Teléfono de contacto</li>
          <li className={styles.listItem}>Correo electrónico</li>
          <li className={styles.listItem}>Dirección de entrega</li>
        </ul>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>USO DE LOS DATOS</h2>
        <p className={styles.body}>
          Los datos se utilizan exclusivamente para:
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>Procesar y gestionar tu pedido</li>
          <li className={styles.listItem}>Emitir la factura fiscal</li>
          <li className={styles.listItem}>Registrar la transacción en nuestro sistema financiero interno</li>
          <li className={styles.listItem}>Coordinar el envío o retiro del pedido</li>
        </ul>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>COMPARTICIÓN CON TERCEROS</h2>
        <p className={styles.body}>
          MN Motor Hub no vende, alquila ni comparte tus datos personales con terceros con fines comerciales. Los únicos terceros que reciben datos de envío son MRW y Zoom Delivery, exclusivamente para ejecutar la entrega.
        </p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>ALMACENAMIENTO</h2>
        <p className={styles.body}>
          Tus datos se almacenan en nuestro sistema de gestión interno de forma segura. Los datos de facturación se conservan según lo exige la normativa fiscal venezolana vigente.
        </p>
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>TUS DERECHOS</h2>
        <p className={styles.body}>
          Puedes solicitar en cualquier momento la corrección o eliminación de tus datos personales contactándonos por nuestros canales de atención, salvo aquellos que debamos conservar por obligación legal.
        </p>
      </div>
    </PageLayout>
  )
}
