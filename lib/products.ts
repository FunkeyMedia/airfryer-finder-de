import rawData from "@/data/products.json";

export type Product = {
  nr: number;
  typ: "Gerät" | "Zubehör";
  unterkategorie: string;
  asin: string;
  marke: string;
  modellcode: string;
  titel: string;
  kurzbeschreibung: string;
  kapazitaetL: number | null;
  leistungW: number | null;
  zonen: number | null;
  programme: number | null;
  maxTempC: number | null;
  preisEUR: number | null;
  uvpEUR: number | null;
  bewertung: number | null;
  anzahlBewertungen: number | null;
  prime: boolean;
  verfuegbar: boolean;
  gesponsert: boolean;
  badge: string;
  coupon: string;
  lieferhinweis: string;
  bildUrl: string;
  produktUrl: string;
  affiliateUrl: string;
  trackingId: string;
  suchbegriff: string;
  ergebnisseite: number;
  erfasstAm: string;
};

export const metadata = rawData.metadata;
export const devices = rawData.devices as Product[];
export const accessories = rawData.accessories as Product[];
export const allProducts = [...devices, ...accessories];

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

export function productSlug(product: Product) {
  const identity = `${product.marke} ${product.modellcode || product.titel.split(",")[0]}`;
  return `${slugify(identity)}-${product.asin.toLowerCase()}`;
}

export function getProductBySlug(slug: string, list = allProducts) {
  return list.find((product) => productSlug(product) === slug);
}

export function productImage(product: Product) {
  return `/products/${product.asin}.webp`;
}

export function formatPrice(price: number | null) {
  if (price === null) return "Preis bei Amazon prüfen";
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price);
}

export function formatNumber(value: number | null) {
  if (value === null) return "–";
  return new Intl.NumberFormat("de-DE").format(value);
}

export function householdLabel(capacity: number | null) {
  if (!capacity) return "Haushaltsgröße offen";
  if (capacity < 4) return "1–2 Personen";
  if (capacity < 6) return "2–3 Personen";
  if (capacity < 8) return "3–5 Personen";
  return "Familie & Gäste";
}

export function dataCompleteness(product: Product) {
  const fields = [product.kapazitaetL, product.leistungW, product.zonen, product.programme, product.maxTempC, product.preisEUR, product.bewertung];
  return Math.round((fields.filter((value) => value !== null).length / fields.length) * 100);
}

export function editorialScore(product: Product) {
  const rating = product.bewertung ? product.bewertung / 5 : 0.55;
  const reviewConfidence = Math.min(Math.log10((product.anzahlBewertungen || 0) + 1) / 4.5, 1);
  const completeness = dataCompleteness(product) / 100;
  const availability = product.verfuegbar ? 1 : 0.45;
  return Math.round((rating * 0.5 + reviewConfidence * 0.22 + completeness * 0.18 + availability * 0.1) * 100);
}

export function topDevices(limit = 6) {
  return [...devices]
    .filter((product) => product.verfuegbar)
    .sort((a, b) => editorialScore(b) - editorialScore(a))
    .slice(0, limit);
}

export const categories = Array.from(new Set(devices.map((product) => product.unterkategorie)));
export const brands = Array.from(new Set(devices.map((product) => product.marke))).sort((a, b) => a.localeCompare(b, "de"));
