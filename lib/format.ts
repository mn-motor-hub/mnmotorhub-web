export function formatPrice(precioVenta: number | null): string {
  if (precioVenta === null) {
    return 'Precio a consultar'
  }
  return `$${precioVenta.toFixed(2)}`
}
