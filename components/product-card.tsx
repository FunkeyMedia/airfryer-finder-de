import { LiveAmazonPrice } from "@/components/live-amazon-price";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Star } from "lucide-react";
import { editorialScore, formatNumber, householdLabel, productImage, productSlug, type Product } from "@/lib/products";

export function ProductCard({ product, rank }: { product: Product; rank?: number }) {
  return (
    <article className="product-card">
      <div className="product-visual">
        {rank && <span className="rank-badge">#{rank}</span>}
        <span className="score-badge">{editorialScore(product)}<small>/100</small></span>
        <Image src={productImage(product)} alt={`${product.marke} ${product.modellcode || "Airfryer"}`} fill sizes="(max-width: 700px) 88vw, 320px" />
      </div>
      <div className="product-content">
        <span className="eyebrow">{product.unterkategorie}</span>
        <h3><Link href={`/airfryer/${productSlug(product)}`}>{product.marke} {product.modellcode || product.titel.split(",")[0].replace(product.marke, "")}</Link></h3>
        <div className="rating"><Star size={17} fill="currentColor" /> <b>{product.bewertung?.toFixed(1) || "–"}</b> <span>({formatNumber(product.anzahlBewertungen)})</span></div>
        <div className="spec-pills">
          {product.kapazitaetL && <span>{product.kapazitaetL} L</span>}
          {product.zonen && <span>{product.zonen} {product.zonen === 1 ? "Zone" : "Zonen"}</span>}
          <span>{householdLabel(product.kapazitaetL)}</span>
        </div>
        <div className="card-price"><strong>{<LiveAmazonPrice asin={product.asin} />} </strong><small>Live von Amazon</small></div>
        <div className="card-actions">
          <Link href={`/airfryer/${productSlug(product)}`} className="button primary">Details <ArrowRight size={17} /></Link>
          <Link href={`/vergleich?ids=${product.asin}`} className="icon-button" aria-label={`${product.marke} vergleichen`}><BarChart3 size={19} /></Link>
        </div>
      </div>
    </article>
  );
}
