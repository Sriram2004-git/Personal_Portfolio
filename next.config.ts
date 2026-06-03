import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async headers() {
    return [
      {
        source: '/resume.pdf',
        headers: [
          { key: 'Content-Type', value: 'application/pdf' },
          { key: 'Content-Disposition', value: 'inline; filename="Sriraam_N_Resume.pdf"' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/resume.pdf',
        destination: '/api/resume',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
