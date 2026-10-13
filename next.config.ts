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
  // Production Security Headers
  async headers() {
    return [
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
