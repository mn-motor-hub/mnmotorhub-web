import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // El design system se distribuye como fuente (.tsx + CSS Modules).
  // Next no transpila node_modules por defecto.
  transpilePackages: ['@mn/design-system'],
  images: {
    qualities: [75, 90, 100],
    formats: ['image/webp'],
    deviceSizes: [375, 768, 1280, 1920],
    imageSizes: [320, 640, 960],
    remotePatterns: [
      {
        // Imágenes de producto del bucket público `catalogo` de Supabase.
        //
        // El host va literal y no desde una variable de entorno a propósito:
        // remotePatterns se resuelve en build, y si la variable faltara en
        // Vercel el deploy saldría igual pero TODAS las imágenes darían 400 en
        // runtime. Un host mal puesto acá se ve al primer render; una variable
        // sin setear, recién en producción.
        //
        // El pathname acota al bucket `catalogo`: sin eso, el optimizador de
        // Next serviría de proxy para cualquier otro objeto público del
        // proyecto de Supabase.
        protocol: 'https',
        hostname: 'bvdsoyoqsykivpfoziln.supabase.co',
        pathname: '/storage/v1/object/public/catalogo/**',
      },
    ],
  },
}

export default nextConfig
