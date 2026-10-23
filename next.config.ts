import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical redirects
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/directors",
        destination: "/about/directors",
        permanent: true,
      },
      {
        source: "/scholarship-test",
        destination: "/etse-2026",
        permanent: true,
      },
      {
        source: "/about-etse",
        destination: "/etse-2026",
        permanent: true,
      },
      {
        source: "/distance-learning-programme",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/distance-learning-program",
        destination: "/courses",
        permanent: true,
      },
    ];
  },
  // Next.js High-Performance Image Optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 82, 85, 90],
  },
  compress: true,
  poweredByHeader: false,

  // Production Security & Cache Headers
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
