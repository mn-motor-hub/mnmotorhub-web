import type { Metadata } from 'next'
import { getCategorias } from '@/lib/api/catalog'
import PageLayout from '@/components/PageLayout/PageLayout'
import CategoriasGrid from '@/components/Categorias/CategoriasGrid'

export const metadata: Metadata = {
  title: 'Categorías — MN Motor Hub',
  description: 'Explorá las categorías de repuestos automotrices disponibles en MN Motor Hub.',
}

export default async function CategoriasPage() {
  let categorias: Awaited<ReturnType<typeof getCategorias>> = []

  try {
    categorias = await getCategorias()
  } catch {
    categorias = []
  }

  return (
    <PageLayout title="Categorías" subtitle="Explorá los repuestos por categoría principal" compact>
      <CategoriasGrid categorias={categorias} />
    </PageLayout>
  )
}
