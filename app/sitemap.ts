import type { MetadataRoute } from "next";
import { accessories, devices, productSlug } from "@/lib/products";
import { recipes } from "@/data/recipes";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/finder", "/airfryer", "/vergleich", "/rezepte", "/zubehoer", "/ratgeber", "/transparenz", "/impressum", "/datenschutz"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-09-02"),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.75,
  }));
  return [
    ...staticRoutes,
    ...devices.map((product) => ({ url: `${SITE_URL}/airfryer/${productSlug(product)}`, lastModified: new Date("2026-09-02"), changeFrequency: "weekly" as const, priority: 0.7 })),
    ...accessories.map((product) => ({ url: `${SITE_URL}/zubehoer/${productSlug(product)}`, lastModified: new Date("2026-09-02"), changeFrequency: "monthly" as const, priority: 0.55 })),
    ...recipes.map((recipe) => ({ url: `${SITE_URL}/rezepte/${recipe.slug}`, lastModified: new Date("2026-09-02"), changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
}
