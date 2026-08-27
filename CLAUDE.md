# CLAUDE.md — MN Motor Hub

## Mobile First — Regla crítica

**Nuestros usuarios acceden principalmente desde teléfonos.** Toda UI se diseña y codea para móvil primero y se expande hacia escritorio.

### Breakpoints
```css
/* Base → móvil (375px+) — aquí va todo el CSS por defecto */
@media (min-width: 768px)  { /* tablet  */ }
@media (min-width: 1280px) { /* desktop */ }
```

### Reglas obligatorias
- **Media queries**: siempre `min-width`. Nunca `max-width` salvo casos excepcionales justificados.
- **Touch targets**: mínimo `44 × 44px` para cualquier elemento interactivo.
- **Inputs**: `font-size: max(1rem, 16px)` — previene zoom automático en iOS Safari.
- **Spacing táctil**: mínimo `8px` de separación entre elementos interactivos adyacentes.
- **Layouts**: columna única en mobile; grid/flex multi-columna solo desde `768px+`.
- **Tipografía**: nunca menos de `14px` en mobile.
- **Imágenes**: siempre `max-width: 100%`, sin anchos fijos en mobile.
- **No hover-only**: toda interacción hover debe tener equivalente táctil.
- **Navbar**: en mobile colapsa a menú hamburguesa (ya implementado con `'use client'`).

### Orden de revisión antes de hacer PR
1. Redimensionar a 375px — ¿se ve y funciona?
2. Redimensionar a 768px — ¿la transición es correcta?
3. Targets táctiles ≥ 44px verificados.
4. Sin scroll horizontal no intencional.

---

## Contexto del proyecto

Tienda online de repuestos automotrices (carros y motos) para el mercado venezolano.
El negocio es una sociedad familiar (ver documentos legales en `/docs`).
La web es el primer canal de ventas y presencia de marca.

**Stack:**
- Next.js 16 (App Router)
- TypeScript (strict mode)
- CSS Modules (sin Tailwind, sin styled-components, sin inline styles)
- React Server Components por defecto — `'use client'` solo cuando sea estrictamente necesario
- Deploy en Vercel

---

## Design System

El diseño fue generado por Stitch. La fuente de verdad visual es `/design/DESIGN.md`.

**Regla crítica:** No inventar colores, radios ni tipografías. Todo valor visual viene de las CSS variables definidas en `styles/globals.css`, mapeadas 1:1 desde `DESIGN.md`.

### Paleta principal
```
--color-background:           #131313
--color-surface:              #131313
--color-surface-low:          #1c1b1b
--color-surface-container:    #201f1f
--color-surface-high:         #2a2a2a
--color-surface-lowest:       #0e0e0e
--color-surface-variant:      #353534

--color-primary:              #ffb59e   /* texto/iconos sobre fondo oscuro */
--color-primary-container:    #ff571a   /* botones CTA, precios, acentos */
--color-on-primary-container: #521300   /* texto sobre botón naranja */

--color-on-surface:           #e5e2e1
--color-on-surface-variant:   #e6beb2
--color-outline:              #ad897e
--color-outline-variant:      #5c4037
```

### Tipografía
```
--font-oswald: 'Oswald', sans-serif   /* headings, uppercase, display */
--font-inter:  'Inter', sans-serif    /* body, labels, descripciones */
```
Cargar ambas vía `next/font/google` en `app/layout.tsx` y exponerlas como CSS variables.

### Bordes y espaciado
```
--radius-sm:   2px
--radius-md:   4px    /* botones, inputs, chips */
--radius-lg:   8px    /* cards */

--spacing-base:     8px
--spacing-gutter:   24px
--spacing-section:  80px
--container-max:    1280px
```

---

## Estructura de carpetas

```
/
├── app/
│   ├── layout.tsx          ← root layout: fonts, metadata, globals.css
│   ├── page.tsx            ← homepage: compone todas las secciones (Server Component)
│   ├── globals.css         ← NO va acá — está en /styles/
│   └── favicon.ico
├── components/
│   ├── Navbar/
│   │   ├── Navbar.tsx
│   │   └── Navbar.module.css
│   ├── Hero/
│   │   ├── Hero.tsx
│   │   └── Hero.module.css
│   ├── TrustBar/
│   │   ├── TrustBar.tsx
│   │   └── TrustBar.module.css
│   ├── Categories/
│   │   ├── Categories.tsx
│   │   └── Categories.module.css
│   ├── FeaturedProducts/
│   │   ├── FeaturedProducts.tsx
│   │   ├── ProductCard.tsx
│   │   └── FeaturedProducts.module.css
│   ├── WhyUs/
│   │   ├── WhyUs.tsx
│   │   └── WhyUs.module.css
│   ├── CTABanner/
│   │   ├── CTABanner.tsx
│   │   └── CTABanner.module.css
│   └── Footer/
│       ├── Footer.tsx
│       └── Footer.module.css
├── styles/
│   └── globals.css         ← CSS variables, resets, base
├── design/
│   ├── DESIGN.md           ← fuente de verdad visual (Stitch)
│   ├── screen.png          ← screenshot de referencia
│   └── code.html           ← HTML original de Stitch (fuente para conversión)
├── public/
│   └── images/
│       └── .gitkeep
├── docs/
│   ├── 01_Acuerdo_de_Socios.docx
│   └── 02_Registro_Aporte_Capital.docx
├── CLAUDE.md               ← este archivo
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Convenciones de código

### Componentes
- Todos son Server Components salvo que necesiten estado o eventos del browser
- Agregar `'use client'` solo para: menú mobile toggle, carrito, búsqueda interactiva
- Props siempre tipadas con `interface`, nunca `type` para props de componentes
- Nombres de archivos: PascalCase para componentes, camelCase para utils

### CSS Modules
- Un archivo `.module.css` por componente, mismo nombre que el `.tsx`
- Clases en camelCase: `.heroTitle`, `.cardWrapper`
- Usar CSS variables de `globals.css` — nunca valores hardcodeados
- Para hover/focus: pseudo-clases dentro del mismo módulo
- Media queries con breakpoints consistentes:
  ```css
  /* Mobile first */
  /* Base: 375px+ */
  @media (min-width: 768px) { /* tablet */ }
  @media (min-width: 1280px) { /* desktop */ }
  ```

### Tipado
- `tsconfig.json` con `"strict": true`
- Sin `any` — si no se sabe el tipo, usar `unknown` y narrowing
- Interfaces para data shapes (productos, categorías, etc.)

---

## Fuente del HTML actual

El archivo `/design/code.html` contiene el HTML generado por Stitch con Tailwind CDN.
Al convertir a componentes Next.js:

1. **Eliminar** todas las clases de Tailwind
2. **Reemplazar** con clases CSS Module equivalentes
3. **Las imágenes** de `lh3.googleusercontent.com` son placeholders de Stitch — reemplazar con `next/image` y placeholders locales
4. **Los iconos** de Material Symbols se pueden mantener o migrar a `lucide-react` (preferible para bundle size)
5. **El script de mousemove** del hero → mover a un Client Component `HeroBackground.tsx`

---

## Secciones a construir

### Fase 1 — Landing inicial (MVP)
- [x] Navbar
- [x] Hero (con imagen + overlay + trust badges)
- [x] Categories grid (bento layout, 2 cards actuales → expandir a 4)
- [ ] Featured Products (grid 4 columnas, 8 cards placeholder)
- [ ] Why Us (4 pilares: Garantía OEM, Stock Permanente, Asesoría Técnica, Envíos)
- [ ] CTA Banner final
- [x] Footer

### Fase 2 — Funcionalidad (post-lanzamiento)
- [ ] Página de catálogo con filtros
- [ ] Página de producto individual
- [ ] Búsqueda
- [ ] Carrito (Context o Zustand)
- [ ] Formulario de contacto / WhatsApp CTA
- [ ] Integración con sistema de inventario (Control_Financiero_Repuestos.xlsx como fuente inicial)

---

## Datos mock (Fase 1)

Usar datos hardcodeados en `/lib/mock/` hasta tener backend.

```typescript
// lib/mock/products.ts
export interface Product {
  id: string
  name: string
  category: string
  price: number        // en USD
  imageUrl: string
  slug: string
}

// lib/mock/categories.ts
export interface Category {
  id: string
  name: string
  subtitle: string
  imageUrl: string
  slug: string
}
```

Categorías iniciales: Motor, Frenos, Escape, Suspensión, Iluminación, Accesorios

---

## Comandos

```bash
npm run dev          # desarrollo local
npm run build        # build de producción
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

---

## Deploy

- Plataforma: Vercel
- Branch principal: `main` → producción automática
- Branch de desarrollo: `dev` → preview automático en Vercel
- Variables de entorno: definir en `.env.local` (nunca commitear)

```env
NEXT_PUBLIC_SITE_URL=https://mnmotorhub.com
```

---

## Lo que NO hacer

- No usar Tailwind (el HTML de Stitch lo usa, pero el proyecto real usa CSS Modules)
- No hardcodear colores — siempre CSS variables
- No `<img>` directo — siempre `next/image` con `width`, `height` y `alt`
- No lógica de negocio en componentes — separar en `/lib`
- No commitear `.env.local` ni credenciales
- No crear componentes Client sin justificación explícita en comentario
