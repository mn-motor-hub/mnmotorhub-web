import { Truck, MessageCircle, Clock, RotateCcw } from 'lucide-react'
import styles from './QuickFacts.module.css'

/**
 * Hechos verificables del negocio, arriba de todo.
 *
 * Viven también en /envios, /devoluciones y /contacto, pero ahí abajo no los
 * lee nadie — ni una persona que está decidiendo si escribir, ni un motor de
 * respuesta que necesita algo citable. Esta franja los sube al primer scroll.
 *
 * Es la única fuente de estos textos en la home: si cambia un horario o una
 * transportista, se cambia acá y en la página de política correspondiente.
 */
const facts = [
  {
    icon: Truck,
    text: 'Envío por MRW y Zoom Delivery a todo Venezuela — despacho en 1 a 2 días hábiles.',
  },
  {
    icon: MessageCircle,
    text: '100% online. Atención directa por WhatsApp, sin local físico al público.',
  },
  {
    icon: Clock,
    text: 'Horario de atención: lunes a sábado, 8:00 am a 6:00 pm.',
  },
  {
    icon: RotateCcw,
    text: 'Devoluciones: hasta 5 días calendario.',
  },
]

export default function QuickFacts() {
  return (
    <section className={styles.section} aria-label="Datos de servicio">
      <ul className={styles.inner}>
        {facts.map((fact) => {
          const Icon = fact.icon
          return (
            <li key={fact.text} className={styles.fact}>
              <Icon size={20} className={styles.icon} aria-hidden="true" />
              <p className={styles.text}>{fact.text}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
