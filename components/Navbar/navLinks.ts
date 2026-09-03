import { WHATSAPP_NUMBER } from '@/lib/contact'

// Compartido entre el Navbar (Server Component) y MobileMenu (Client Component),
// para que la navegación de escritorio y la de móvil no puedan divergir.

export interface NavLink {
  label: string
  href: string
  target?: string
  rel?: string
}

export const navLinks: NavLink[] = [
  { label: 'Catálogo', href: '/catalogo' },
  { label: 'Categorías', href: '/categorias' },
  { label: '¿Por qué nosotros?', href: '#por-que-nosotros' },
  {
    label: 'Contacto',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    target: '_blank',
    rel: 'noopener noreferrer',
  },
]
