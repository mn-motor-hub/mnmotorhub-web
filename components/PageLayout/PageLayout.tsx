import styles from './PageLayout.module.css'

interface PageLayoutProps {
  title: string
  subtitle?: string
  compact?: boolean
  children: React.ReactNode
}

export default function PageLayout({ title, subtitle, compact = false, children }: PageLayoutProps) {
  return (
    <>
      <div className={`${styles.heroBand} ${compact ? styles.heroBandCompact : ''}`}>
        <div className={styles.heroInner}>
          <h1 className={`${styles.heroTitle} ${compact ? styles.heroTitleCompact : ''}`}>{title}</h1>
          {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </>
  )
}
