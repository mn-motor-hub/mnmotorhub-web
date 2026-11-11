import { notFound } from 'next/navigation'

// Temporarily hidden: the catalog is not ready for the market yet. Reverting
// the commit that introduced this file restores the full /catalogo page.
// `/categoria/[id]` reuses components/Catalog, so that folder stays intact.
export default function CatalogPage() {
  notFound()
}
