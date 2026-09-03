import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Página no encontrada</p>
      <Link href="/" className={styles.link}>
        Volver al inicio
      </Link>
    </main>
  )
}
