import { MetadataRoute } from "next";

const SITE_URL = "https://www.mymockupbook.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/free-book-mockup-generator",
    "/book-cover-mockup-generator",
    "/ebook-mockup-generator",
    "/hardcover-book-mockup",
    "/3d-book-mockup-generator",
    "/paperback-book-mockup",
    "/privacy-policy",
    "/terms-of-service",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
