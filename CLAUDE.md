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
- **Navbar**: en mobile colapsa a menú hamburguesa — `components/Navbar/MobileMenu.tsx`,
  el único Client Component del Navbar. Panel con foco atrapado, cierre con Esc, backdrop
  y bloqueo de scroll de fondo.

### Orden de revisión antes de hacer PR
1. Redimensionar a 375px — ¿se ve y funciona?
2. Redimensionar a 768px — ¿la transición es correcta?
3. Targets táctiles ≥ 44px verificados.
4. Sin scroll horizontal no intencional.

---

## Contexto del proyecto

Tienda online de repuestos automotrices para carros, para el mercado venezolano.
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

**Los tokens NO viven en este repo.** Están en [`@mn/design-system`](https://github.com/mn-motor-hub/mn-motor-hub-design-system),
compartido con el ERP interno (`mn-motor-hub-erp-frontend`) y con la generación de contenido de marca.

Fuente de verdad: `tokens/tokens.json` de ese repo. `styles/globals.css` solo importa:

```css
@import '@mn/design-system/tokens.css';
@import '@mn/design-system/recipes.css';
```

### Regla crítica

**Si falta un valor, se agrega en el paquete — nunca en este repo.** Redefinir un token acá
hace que la web y el ERP diverjan en silencio, que es exactamente lo que este paquete existe
para evitar.

Divergencia legítima entre productos: sobrescribir el token después del import, **con un
comentario que diga por qué**. Sin comentario, es una divergencia accidental.

### Instalación

```bash
npm install https://github.com/mn-motor-hub/mn-motor-hub-design-system/archive/refs/tags/vX.Y.Z.tar.gz
```

Por **tarball del tag**, nunca `github:` ni `git+ssh`. npm normaliza los URLs de GitHub a SSH
y Vercel no tiene llave SSH: el deploy falla con `Permission denied (publickey)`.

### Nombres de tokens

⚠️ La nomenclatura cambió en la migración al paquete. Si ves código o documentación vieja:

| Antes | Ahora | Valor |
|---|---|---|
| `--color-primary` | `--color-primary-dim` | `#ffb59e` durazno |
| `--color-primary-container` | `--color-primary` | `#ff571a` naranja |
| `--color-on-primary-container` | `--color-on-primary` | `#521300` |
| `--color-surface` | `--color-background` | `#131313` |
| `--spacing-base` / `--spacing-gutter` | `--space-sm` / `--space-lg` | `8px` / `24px` |
| `--spacing-edge` / `--spacing-section` | `--layout-edge` / `--layout-section` | — |
| `--container-max` | `--layout-container-max` | `1280px` |

**`--color-primary` significa lo opuesto que antes.** Un reemplazo textual ingenuo produce
botones color durazno.

### Grupos disponibles

`--color-*` · `--overlay-*` · `--color-*-rgb` (tripletes para alpha) · `--font-*` · `--text-*` ·
`--weight-*` · `--tracking-*` · `--leading-*` · `--space-*` · `--layout-*` · `--radius-*` ·
`--shadow-*` · `--touch-min` · `--breakpoint-*`

La lista completa con descripciones está en `docs/BRAND.md` y `dist/tokens.json` del paquete.

### Recetas tipográficas

La firma visual de la marca es **Oswald + mayúsculas + `letter-spacing: 0.05em`**. No repetirla
a mano: usar las clases de `recipes.css`.

```tsx
<h2 className="mn-heading">Repuestos de motor</h2>
<span className="mn-price">$ 45,00</span>
```

Disponibles: `.mn-heading` · `.mn-subheading` · `.mn-label` · `.mn-button` · `.mn-body` ·
`.mn-price` · `.mn-data`

### Títulos fluidos

Los títulos que cambian de tamaño entre móvil y escritorio usan `clamp()`, no media queries:

- `--text-title-page` — H1 de página con hero band. 32px → 48px.
- `--text-title-section` — H2 de sección. 28px → 40px.

28px no es arbitrario: es el máximo que entra en una línea a 375px. A 32px, tres de los cuatro
títulos de la home se parten en dos renglones.

### Lo que está prohibido en CSS

| Prohibido | Usar |
|---|---|
| `#ff571a` y cualquier hex | `var(--color-primary)` |
| `rgba(255, 87, 26, 0.2)` | `rgba(var(--color-primary-rgb), 0.2)` |
| `font-size: 14px` | `var(--text-sm)` |
| `padding: 12px` | `var(--space-md)` |
| `border-radius: 9999px` | `var(--radius-full)` |
| `@media (max-width: ...)` | `@media (min-width: ...)` |
| `style={{ ... }}` en TSX | un CSS Module |

**Excepción a la escala de espaciado:** `44px` de área táctil no se redondea. Es
`var(--touch-min)`, y **manda sobre la escala** — si el padding de la escala deja un target por
debajo de 44px, agregar `min-height: var(--touch-min)`.

## Estructura de carpetas

```
/
├── app/
│   ├── layout.tsx          ← root layout: fonts, metadata, globals.css
│   ├── page.tsx            ← homepage: compone todas las secciones (Server Component)
│   ├── not-found.tsx       ← 404
│   ├── catalogo/           ← listado paginado + búsqueda (?page, ?q)
│   ├── categorias/         ← grilla de las categorías del ERP
│   ├── categoria/[id]/     ← categoría por UUID del backend
│   ├── producto/[codigoInterno]/  ← ficha + CTA a WhatsApp
│   ├── contacto/
│   ├── envios/
│   ├── devoluciones/
│   └── privacidad/
├── components/
│   ├── Navbar/             ← Navbar.tsx · MobileMenu.tsx ('use client') · navLinks.ts
│   ├── Hero/
│   ├── QuickFacts/         ← franja de hechos citables, bajo el hero
│   ├── Categories/         ← bento de la home (datos de lib/mock)
│   ├── FeaturedProducts/
│   ├── WhyUs/              ← párrafo de entidad + 4 pilares
│   ├── CTABanner/
│   ├── Footer/
│   ├── PageLayout/         ← hero band + contenedor de las páginas internas
│   ├── Catalog/            ← CatalogList · CatalogSearch ('use client') · ProductListItem
│   ├── Categorias/         ← CategoriasGrid · CategoriaCard
│   ├── Product/            ← ProductCTA · ProductGallery ('use client')
│   ├── ProductCard/        ← card de la home
│   ├── ProductImage/       ← portada del producto + estado vacío de marca
│   └── AvailabilityBadge/  ← traduce el stock a variante del design system
├── lib/
│   ├── api/                ← catalog.ts (fetch al backend) · types.ts
│   ├── contact.ts          ← WhatsApp: número único y plantillas de mensaje
│   ├── format.ts           ← formatPrice
│   ├── images.ts           ← portada y secundarias de un producto
│   └── mock/
│       └── categories.ts   ← solo las 4 tarjetas de la home
├── styles/
│   └── globals.css         ← importa los tokens del paquete + resets
├── design/
│   ├── DESIGN.md           ← fuente de verdad visual (Stitch)
│   ├── screen.png · code.html
│   └── initial/            ← primera iteración de Stitch
├── docs/
│   ├── BRAND_KIT.md        ← identidad, voz y tono
│   └── CONTENIDO_ACTUAL.md ← DESACTUALIZADO — ver Notion
├── public/
│   └── images/
│       └── productos/
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

### Fase 1 — Landing inicial (MVP) — completa
- [x] Navbar (con menú hamburguesa en mobile)
- [x] Hero (imagen + overlay + trust badges)
- [x] QuickFacts (franja de hechos citables)
- [x] Categories grid (bento: 2 destacadas + 2 chips "Próximamente")
- [x] Featured Products (6 cards desde la API)
- [x] Why Us (párrafo de entidad + 4 pilares: Piezas Que Encajan · Si Lo Buscas Lo
      Tenemos · Te Decimos La Verdad · Llega A Donde Estés)
- [x] CTA Banner final
- [x] Footer

### Fase 2 — Funcionalidad
- [x] Integración con el backend (`API_BASE_URL/api/catalog`)
- [x] Página de catálogo, paginada
- [x] Búsqueda por texto (`CatalogSearch`, vía `?q=`)
- [x] Página de producto individual
- [x] CTA de WhatsApp en ficha, hero y CTA banner
- [ ] Filtros del catálogo (marca, rango de precio) — hoy solo hay búsqueda
- [ ] Carrito (Context o Zustand)
- [ ] Formulario de contacto propio — hoy la conversión es 100% WhatsApp

---

## Datos del catálogo

El catálogo viene del backend, no de mocks. `lib/api/catalog.ts` consume
`API_BASE_URL/api/catalog` con `next: { revalidate: 90 }`.

```typescript
// lib/api/types.ts — forma real que devuelve el backend
export interface CatalogItem {
  codigoInterno: string       // también es el slug de la ficha: /producto/MNM-0501-00001
  nombre: string
  descripcion: string | null  // hoy duplica `nombre` en todo el catálogo
  marca: string | null        // hoy vacío en el 100% del catálogo
  categoria: string | null
  subcategoria: string | null
  categoriaId: string | null
  subcategoriaId: string | null
  precioVenta: number | null
  disponible: boolean
  imagenes: CatalogImagen[]
}
```

Lo único mockeado es `lib/mock/categories.ts`, con las 4 tarjetas de la home
(Kits de Clutch, Mantenimiento, Frenos, Suspensión).

⚠️ **Esa taxonomía no coincide con la del ERP**, que expone 14 categorías
identificadas por UUID vía `/api/catalog/categorias`. Las tarjetas de la home
enlazan por `slug` y la ruta `/categoria/[id]` resuelve por UUID, así que hoy
**devuelven 404**. No replicar ese patrón: cualquier enlace nuevo a una
categoría tiene que salir del `id` que devuelve la API.

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
- No hardcodear colores, tamaños de fuente, espaciados ni radios — siempre tokens del paquete
- No redefinir tokens en este repo — se agregan en `@mn/design-system`
- No instalar el paquete con `github:` — rompe el deploy en Vercel
- No `<img>` directo — siempre `next/image` con `width`, `height` y `alt`
- No lógica de negocio en componentes — separar en `/lib`
- No commitear `.env.local` ni credenciales
- No hardcodear el número de WhatsApp — sale de `lib/contact.ts`
- No crear componentes Client sin justificación explícita en comentario
