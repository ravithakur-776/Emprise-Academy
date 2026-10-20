import { MetadataRoute } from "next";

const PRIVATE_DISALLOW_PATHS = [
  "/admin",
  "/admin/",
  "/student",
  "/student/",
  "/api",
  "/api/",
  "/verify-admit-card",
  "/verify-admit-card/",
  "/verify-result",
  "/verify-result/",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: PRIVATE_DISALLOW_PATHS,
      },
      {
        userAgent: "Meta-ExternalAgent",
        disallow: ["/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: PRIVATE_DISALLOW_PATHS,
        crawlDelay: 5,
      },
    ],
    sitemap: "https://empriseacademy.com/sitemap.xml",
  };
}

