# Contenido Actual — MN Motor Hub
> Última actualización: 2026-06-09 · v2 (post-MVP update)
> Este documento refleja el estado real del sitio en producción.

---

## Estructura del sitio

```
Layout (app/layout.tsx)
├── Navbar                    ← sticky, todas las rutas
├── <main>
│   ├── / (homepage)
│   │   ├── Hero
│   │   ├── Categories        ← id="categorias"
│   │   ├── WhyUs             ← id="por-que-nosotros"
│   │   └── CTABanner
│   ├── /contacto
│   ├── /envios
│   ├── /devoluciones
│   └── /privacidad
└── Footer                    ← todas las rutas
```

---

## NAVBAR

| Elemento | Contenido | Estado |
|---|---|---|
| Logo | `/images/logo-motor-hub.png` | ✅ activo |
| Link 1 | Catálogo → `/catalogo` | ✅ activo |
| Link 2 | Productos → `#categorias` (smooth scroll) | ✅ activo |
| Link 3 | ¿Por qué nosotros? → `#por-que-nosotros` | ✅ activo |
| Link 4 | Contacto → `https://wa.me/584221649320` (new tab) | ✅ activo |
| Cuenta / Carrito | Removidos | — |
| Menú mobile | Hamburguer visible, sin drawer implementado | 🔜 pendiente |

---

## HERO

| Campo | Contenido |
|---|---|
| Headline | `TU CLUTCH NO ESPERA.` |
| Descripción | Kits completos y repuestos de mantenimiento con envío a todo Venezuela. Stock real, respuesta inmediata. |
| CTA primario | Ver catálogo → `/catalogo` | ✅ activo
| CTA secundario | Contactar Asesor → `https://wa.me/584221649320` | ✅ activo
| Badge 1 | Marcas OEM Certificadas |
| Badge 2 | Envío a Todo Venezuela |
| Badge 3 | Te Asesoramos Gratis |
| Imagen desktop | `/images/hero-bg.png` |
| Imagen mobile | `/images/hero-bg-mobile.png` |
| Decorativo | `HUB` (texto fantasma) |

---

## CATEGORIES

**Header:**
- Título: `CATEGORÍAS DESTACADAS`
- Subtítulo: `Encontrá lo que tu vehículo necesita hoy`
- Link: Explorar todo → `#` ⚠️ Próximamente

**Bento grid (cards con imagen):**

| # | Nombre | Subtítulo | Imagen | Layout |
|---|---|---|---|---|
| 1 | Kits de Clutch | Kits completos para carros y motos | `/images/productos/kit-clutch.png` | Wide (col-span-2) |
| 2 | Mantenimiento | Filtros, aceites, bujías y correas | `/images/productos/mantenimiento.png` | Normal |

**Chips secundarios:**

| Nombre | Subtítulo | Estado |
|---|---|---|
| Frenos | Discos y pastillas | ⚠️ Próximamente |
| Suspensión | Amortiguadores y bujes | ⚠️ Próximamente |

---

## WHY US

**Header:**
- Título: `ASÍ TRABAJAMOS`
- Subtítulo: `Familia venezolana. Stock permanente. Sin largas.`

**Pilares:**

| Ícono | Título | Descripción |
|---|---|---|
| ShieldCheck | PIEZAS QUE ENCAJAN | Solo vendemos lo que funciona. Cada repuesto cumple especificaciones originales. Sin sorpresas al instalar. |
| Package | SI LO BUSCAS, LO TENEMOS | Kits de clutch y repuestos de mantenimiento disponibles hoy. No te mandamos a esperar. |
| Wrench | TE DECIMOS LA VERDAD | No te vendemos lo que no necesitas. Si no es tu pieza, te lo decimos. Si lo es, te explicamos por qué. |
| Truck | LLEGA A DONDE ESTÉS | Despachamos a todo Venezuela. Rápido, seguro y con seguimiento real de tu pedido. |

---

## CTA BANNER

| Campo | Contenido |
|---|---|
| Label | `ATENCIÓN PERSONALIZADA` |
| Título | `¿NO ENCONTRÁS LA PIEZA?` |
| Descripción | Escribinos por WhatsApp con el modelo de tu vehículo y te consiguemos lo que necesitás. |
| CTA primario | Consultar por WhatsApp → `https://wa.me/584221649320` | ✅ activo |
| CTA secundario | Ver categorías → `#categorias` | ✅ activo |

---

## FOOTER

| Campo | Contenido |
|---|---|
| Tagline | Repuestos reales para vehículos reales. Desde Venezuela para Venezuela. |
| Link 1 | Contáctanos → `/contacto` ✅ |
| Link 2 | Política de Envíos → `/envios` ✅ |
| Link 3 | Devoluciones → `/devoluciones` ✅ |
| Link 4 | Política de Privacidad → `/privacidad` ✅ |
| Instagram | https://www.instagram.com/mnmotorhub/ ✅ |
| Facebook | https://www.facebook.com/profile.php?id=61590356652354 ✅ |
| Copyright | © 2026 MN Motor Hub. Todos los derechos reservados. ✅ |

---

## PÁGINAS ESTÁTICAS

### /contacto
- Cards: Instagram (@mnmotorhub) y Facebook (MN Motor Hub)
- Horario: L–S 8am–6pm · Dom 8am–1pm · Feriados a consultar
- Nota: empresa 100% online, retiro presencial coordinable

### /envios
- Cobertura: todo Venezuela vía MRW y Zoom Delivery
- Despacho: 1–2 días hábiles post-pago
- Costo: variable por peso/dimensiones/destino, informado antes de confirmar
- Retiro presencial: coordinable

### /devoluciones
- Solo defectos de fábrica comprobables
- Plazo: 5 días calendario desde recepción
- Proceso: 4 pasos (contacto → fotos/video → evaluación → reemplazo/reembolso)

### /privacidad
- Datos: nombre, cédula, teléfono, email, dirección
- Uso: gestión de pedido, factura fiscal, sistema interno, logística
- Sin venta de datos a terceros (excepción: MRW/Zoom para entregas)

---

## Pendientes de activación

| Ítem | Bloqueado por | Prioridad |
|---|---|---|
| Mobile menu drawer | Implementar toggle (`use client`) | 🟡 Media |
| Bento cards → enlace real | Páginas de categoría | 🟡 Media |
| Formulario de contacto | Backend / integración | 🟢 Baja |
