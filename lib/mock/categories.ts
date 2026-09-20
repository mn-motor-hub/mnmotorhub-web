export interface Category {
  id: string
  name: string
}

/**
 * Sólo las categorías "Próximamente" de la home (SEO-01: las destacadas
 * "Kits de Clutch" y "Mantenimiento" salen ahora de `getCategorias()`, ver
 * components/Categories/Categories.tsx).
 */
export const categories: Category[] = [
  {
    id: '3',
    name: 'Frenos',
  },
  {
    id: '4',
    name: 'Suspensión',
  },
]
