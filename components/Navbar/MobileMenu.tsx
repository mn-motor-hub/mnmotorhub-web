'use client'
// Client Component acotado a propósito: el resto del Navbar sigue siendo
// Server Component. Acá solo vive lo que necesita estado del browser —
// abrir/cerrar, foco atrapado y bloqueo de scroll.

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import type { NavLink } from './navLinks'
import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  links: NavLink[]
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Cerrar al navegar: sin esto el panel queda abierto sobre la página nueva.
  //
  // Cada link ya cierra en su onClick, así que esto cubre lo que no pasa por
  // ahí: back/forward del navegador con el panel abierto.
  //
  // Se ajusta el estado durante el render y no en un useEffect. Con el efecto,
  // React commiteaba el panel abierto sobre la ruta nueva y recién después lo
  // cerraba — un render de más, que es lo que marca react-hooks/set-state-in-effect.
  // Así React descarta el render en curso y vuelve a renderizar sin pintarlo.
  const [pathnamePrevio, setPathnamePrevio] = useState(pathname)
  if (pathname !== pathnamePrevio) {
    setPathnamePrevio(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return

    // Se captura acá y no en el cleanup: para entonces triggerRef.current pudo
    // haber cambiado, y el botón que abrió el panel es el que tiene que
    // recuperar el foco.
    const trigger = triggerRef.current

    // Bloquear el scroll del fondo mientras el panel está abierto.
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    function focusables(): HTMLElement[] {
      if (!panelRef.current) return []
      return Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        )
      )
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return

      // Foco atrapado: el tabulador no debe salirse del panel.
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    focusables()[0]?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
      // El trigger es la única forma de abrir el panel, así que el foco
      // siempre vuelve ahí. Determinista, a diferencia de recordar
      // document.activeElement, que puede ser <body> según cómo se abrió.
      trigger?.focus()
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="menu-mobile"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} aria-hidden="true" />
      </button>

      {/* Se monta siempre para que aria-controls apunte a algo real;
          `hidden` lo saca del árbol de accesibilidad cuando está cerrado. */}
      <div id="menu-mobile" className={styles.root} hidden={!open}>
        <div
          className={styles.backdrop}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          ref={panelRef}
          className={styles.panel}
          role="dialog"
          aria-modal="true"
          aria-label="Navegación"
        >
          <div className={styles.panelHeader}>
            <button
              type="button"
              className={styles.close}
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>

          <nav>
            <ul className={styles.list}>
              {links.map((link) => (
                <li key={link.label}>
                  {link.target ? (
                    <a
                      href={link.href}
                      className={styles.link}
                      target={link.target}
                      rel={link.rel}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    // El cierre por `pathname` no alcanza: un link ancla
                    // (#por-que-nosotros) no cambia la ruta y dejaría el
                    // panel abierto sobre la sección a la que saltó.
                    <Link
                      href={link.href}
                      className={styles.link}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
