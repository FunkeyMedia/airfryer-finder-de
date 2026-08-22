import type { MetadataRoute } from "next";
import { accessories, devices, productSlug } from "@/lib/products";
import { recipes } from "@/data/recipes";
const base="https://airfryer-finder-de.vercel.app";
export default function sitemap():MetadataRoute.Sitemap{const staticRoutes=["","/finder","/airfryer","/vergleich","/rezepte","/zubehoer","/ratgeber","/transparenz","/impressum","/datenschutz"].map(route=>({url:`${base}${route}`,lastModified:new Date("2026-08-22"),changeFrequency:"weekly" as const,priority:route===""?1:.75}));return [...staticRoutes,...devices.map(p=>({url:`${base}/airfryer/${productSlug(p)}`,lastModified:new Date("2026-08-22"),changeFrequency:"weekly" as const,priority:.7})),...accessories.map(p=>({url:`${base}/zubehoer/${productSlug(p)}`,lastModified:new Date("2026-08-22"),changeFrequency:"monthly" as const,priority:.55})),...recipes.map(r=>({url:`${base}/rezepte/${r.slug}`,lastModified:new Date("2026-08-22"),changeFrequency:"monthly" as const,priority:.65}))]}
