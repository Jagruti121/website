/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Turbopack: replaces webpack in dev → 10-100× faster HMR & cold starts
  experimental: {
    turbo: {},
    // Tree-shake large icon/animation libraries — only bundle what's used
    optimizePackageImports: ['lucide-react', 'framer-motion', '@headlessui/react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Allow localhost images in dev without extra config
    remotePatterns: [],
  },
  // Reduce build output noise
  logging: {
    fetches: { fullUrl: false },
  },
};

export default nextConfig;
