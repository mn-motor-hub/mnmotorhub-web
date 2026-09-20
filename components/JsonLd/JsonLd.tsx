interface JsonLdProps {
  data: object
}

// Server Component: el script se serializa en el HTML servido, no necesita
// ningún evento ni estado de browser.
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD vive en un <script>, no en el DOM visible — dangerouslySetInnerHTML
      // es el mecanismo correcto acá. Se escapa `<` para que un valor de catálogo
      // (ej. un nombre de producto) no pueda cerrar el tag antes de tiempo.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
