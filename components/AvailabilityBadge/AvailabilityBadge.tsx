import styles from './AvailabilityBadge.module.css'

interface AvailabilityBadgeProps {
  disponible: boolean
}

export default function AvailabilityBadge({ disponible }: AvailabilityBadgeProps) {
  return (
    <span className={`${styles.badge} ${disponible ? styles.available : styles.unavailable}`}>
      {disponible ? 'Disponible' : 'No disponible'}
    </span>
  )
}
