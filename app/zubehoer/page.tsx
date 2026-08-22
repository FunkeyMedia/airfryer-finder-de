import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { accessories, formatPrice, productImage, productSlug } from "@/lib/products";
export const metadata:Metadata={title:"Airfryer-Zubehör",description:"60 Zubehörprodukte übersichtlich nach Kategorien – mit transparenter Datenbasis und Amazon-Preislink."};
export default function AccessoriesPage(){return <><section className="page-hero"><div className="shell"><span className="eyebrow">Passende Helfer</span><h1>Airfryer-Zubehör entdecken</h1><p>Formen, Roste, Liner und Sets. Kompatibilität wird nur genannt, wenn sie aus den vorhandenen Daten hervorgeht.</p></div></section><section className="inner-section shell"><div className="accessory-grid">{accessories.map(p=><article key={p.asin}><div><Image src={productImage(p)} alt={p.titel} fill sizes="(max-width:700px) 90vw, 25vw"/></div><span>{p.unterkategorie}</span><h2><Link href={`/zubehoer/${productSlug(p)}`}>{p.marke} {p.modellcode||p.titel.split(",")[0].replace(p.marke,"")}</Link></h2><strong>{formatPrice(p.preisEUR)}</strong><a href={p.affiliateUrl} target="_blank" rel="nofollow sponsored noopener">Bei Amazon prüfen <ExternalLink/></a></article>)}</div></section></>}
