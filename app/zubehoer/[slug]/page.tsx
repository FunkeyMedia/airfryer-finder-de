import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ExternalLink } from "lucide-react";
import { accessories, formatPrice, getProductBySlug, productImage, productSlug } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return accessories.map((product) => ({ slug: productSlug(product) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug, accessories);
  if (!product) return {};
  const description = product.kurzbeschreibung || product.titel;
  return {
    title: `${product.marke} Airfryer-Zubehör`,
    description,
    alternates: { canonical: `/zubehoer/${slug}` },
    openGraph: { title: `${product.marke} Airfryer-Zubehör`, description, type: "website", url: `/zubehoer/${slug}`, images: [{ url: productImage(product), alt: product.titel }] },
    twitter: { card: "summary_large_image", title: `${product.marke} Airfryer-Zubehör`, description, images: [productImage(product)] },
  };
}

export default async function AccessoryDetail({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug, accessories);
  if (!product) notFound();
  return (
    <section className="inner-section shell">
      <div className="breadcrumbs"><Link href="/">Start</Link><ChevronRight /><Link href="/zubehoer">Zubehör</Link><ChevronRight /><span>{product.marke}</span></div>
      <div className="accessory-detail">
        <div><Image src={productImage(product)} alt={product.titel} fill priority sizes="(max-width:800px) 94vw, 50vw" /></div>
        <article>
          <span className="eyebrow">{product.unterkategorie}</span>
          <h1>{product.titel}</h1>
          <p>{product.kurzbeschreibung || "Zu diesem Zubehör liegen die aufgeführten Amazon-Produktdaten vor."}</p>
          {product.kapazitaetL ? <p><b>Angegebene Größe:</b> {product.kapazitaetL} Liter. Bitte prüfe die exakte Kompatibilität mit deinem Modell beim Anbieter.</p> : null}
          <strong className="accessory-price">{formatPrice(product.preisEUR)}</strong>
          <small>Preisstand 22.08.2026</small>
          <a href={product.affiliateUrl} target="_blank" rel="nofollow sponsored noopener" className="button affiliate-button">Preis bei Amazon prüfen <ExternalLink /></a>
          <p className="affiliate-note">Affiliate-Link. Produktdaten und Verfügbarkeit können sich ändern.</p>
        </article>
      </div>
    </section>
  );
}
