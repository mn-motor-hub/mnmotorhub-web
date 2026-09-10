import { ShieldCheck, Package, Wrench, Truck } from 'lucide-react'
import styles from './WhyUs.module.css'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'PIEZAS QUE ENCAJAN',
    description:
      'Solo vendemos lo que funciona. Cada repuesto cumple especificaciones originales. Sin sorpresas al instalar.',
  },
  {
    icon: Package,
    title: 'SI LO BUSCAS, LO TENEMOS',
    description:
      'Kits de clutch y repuestos de mantenimiento disponibles hoy. No te mandamos a esperar.',
  },
  {
    icon: Wrench,
    title: 'TE DECIMOS LA VERDAD',
    description:
      'No te vendemos lo que no necesitas. Si no es tu pieza, te lo decimos. Si lo es, te explicamos por qué.',
  },
  {
    icon: Truck,
    title: 'LLEGA A DONDE ESTÉS',
    description:
      'Despachamos a todo Venezuela. Rápido, seguro y con seguimiento real de tu pedido.',
  },
]

export default function WhyUs() {
  return (
    <section id="por-que-nosotros" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div className="section-accent" />
          <h2 className={styles.title}>ASÍ TRABAJAMOS</h2>
          <p className={styles.subtitle}>
            Familia venezolana. Stock permanente. Sin largas.
          </p>
          {/*
            Definición de entidad. Es lo único en el sitio que responde "¿qué
            es MN Motor Hub?" — para quien llega por primera vez y para los
            motores de respuesta. También es la fuente del campo `description`
            del schema Organization, cuando se agregue.
          */}
          <p className={styles.entity}>
            MN Motor Hub es una empresa familiar venezolana que vende repuestos y kits de
            mantenimiento para carros, con stock real y despacho a todo el país a través de
            MRW y Zoom Delivery. Empezamos a operar en junio de 2026, desde el mismo problema
            que resolvemos: la dificultad de conseguir en Venezuela una pieza que realmente
            encaje, con alguien que te diga la verdad sobre lo que necesitas. Trabajamos 100%
            online, por WhatsApp, sin local físico al público.
          </p>
        </div>

        <div className={styles.grid}>
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div key={pillar.title} className={styles.pillar}>
                <div className={styles.iconWrapper}>
                  <Icon size={28} className={styles.icon} />
                </div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDesc}>{pillar.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
