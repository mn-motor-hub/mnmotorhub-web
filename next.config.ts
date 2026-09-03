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
  },
}

export default nextConfig
