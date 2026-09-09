export interface Category {
  id: string
  name: string
  subtitle: string
  imageUrl: string
  slug: string
  featured?: boolean
  wide?: boolean
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Kits de Clutch',
    subtitle: 'Kits completos para tu carro',
    imageUrl: '/images/productos/kit-clutch.png',
    slug: 'kits-de-clutch',
    featured: true,
    wide: true,
  },
  {
    id: '2',
    name: 'Mantenimiento',
    subtitle: 'Filtros, aceites, bujías y correas',
    imageUrl: '/images/productos/mantenimiento.png',
    slug: 'mantenimiento',
    featured: true,
  },
  {
    id: '3',
    name: 'Frenos',
    subtitle: 'Discos y pastillas',
    imageUrl: '/images/placeholder-part.jpg',
    slug: 'frenos',
  },
  {
    id: '4',
    name: 'Suspensión',
    subtitle: 'Amortiguadores y bujes',
    imageUrl: '/images/placeholder-part.jpg',
    slug: 'suspension',
  },
]
