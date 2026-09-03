/**
 * Punto único del canal de contacto. WhatsApp es la vía de conversión real
 * del negocio, así que el número no puede vivir hardcodeado en cada
 * componente que lo necesite.
 */

/** Formato internacional sin `+` ni separadores, que es lo que espera wa.me. */
export const WHATSAPP_NUMBER = '584221649320'

/** Construye un enlace de WhatsApp con el mensaje ya escrito. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Mensaje para consultar por una pieza concreta. Lleva el código interno
 * porque es lo que permite al asesor ubicarla en el inventario sin
 * preguntar de nuevo.
 */
export function productInquiryUrl(nombre: string, codigoInterno: string): string {
  return whatsappUrl(
    `Hola, quiero consultar sobre este repuesto:\n\n${nombre}\nCódigo: ${codigoInterno}`
  )
}

export const GENERAL_INQUIRY_URL = whatsappUrl('Hola, quiero consultar sobre un repuesto')

export const MISSING_PART_URL = whatsappUrl(
  'Hola, no encuentro una pieza y quiero consultar'
)
