import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/**
 * eslint-config-next v16 ya exporta flat config.
 *
 * Antes esto la cargaba con FlatCompat (@eslint/eslintrc), que es el shim para
 * configs viejas de tipo eslintrc. Envolver con ese shim algo que YA es flat
 * producía una referencia circular al validar el schema, así que ESLint
 * reventaba antes de mirar un solo archivo: `npm run lint` nunca chequeó nada.
 *
 * De paso, @eslint/eslintrc nunca estuvo declarado en package.json — se
 * resolvía como dependencia transitiva de otro paquete.
 */
const eslintConfig = [
  {
    // ESLint por su cuenta solo ignora node_modules. De lo demás se encargaba
    // `next lint`, que Next 16 eliminó, así que va declarado acá.
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
]

export default eslintConfig
