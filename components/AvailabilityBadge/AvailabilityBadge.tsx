import { Badge } from '@mn/design-system/ui'

interface AvailabilityBadgeProps {
  disponible: boolean
}

/**
 * Traduce el estado de stock del dominio a la variante semantica del design
 * system. La primitiva pone el color; este componente pone el significado.
 */
export default function AvailabilityBadge({ disponible }: AvailabilityBadgeProps) {
  return (
    <Badge variant={disponible ? 'success' : 'neutral'}>
      {disponible ? 'Disponible' : 'No disponible'}
    </Badge>
  )
}
