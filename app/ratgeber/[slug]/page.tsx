import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/data/guides";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return guides.map(guide => ({ slug: guide.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find(entry => entry.slug === slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.description, alternates: { canonical: `/ratgeber/${slug}` } };
}
export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find(entry => entry.slug === slug);
  if (!guide) notFound();
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: guide.title,
    description: guide.description, mainEntityOfPage: `${SITE_URL}/ratgeber/${slug}`,
    citation: guide.sources.map(([, url]) => url) };
  return <article className="inner-section shell prose-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <nav aria-label="Brotkrümel"><Link href="/">Start</Link> / <Link href="/ratgeber">Ratgeber</Link></nav>
    <span className="eyebrow">Airfryer auswählen und nutzen</span>
    <h1>{guide.title}</h1><p>{guide.intro}</p>
    {guide.sections.map(([title, paragraph]) => <section key={title}><h2>{title}</h2><p>{paragraph}</p></section>)}
    <section><h2>{guide.question}</h2><p>{guide.answer}</p></section>
    <section><h2>Quellen und Einordnung</h2><p>Redaktionelle Auswahlhilfe, kein eigener Gerätetest. Herstellerhinweise gelten für die dort aufgeführten Modelle. Maßgeblich ist die Anleitung deines konkreten Geräts.</p>
      <ul>{guide.sources.map(([label, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul>
    </section>
    <section><h2>Die Auswahl eingrenzen</h2><p><Link href="/finder">Zum Airfryer-Finder</Link> oder <Link href="/airfryer">vorhandene Gerätedaten vergleichen</Link>.</p></section>
    <section><h2>Weitere Ratgeber</h2><ul>{guides.filter(entry => entry.slug !== slug).map(entry => <li key={entry.slug}><Link href={`/ratgeber/${entry.slug}`}>{entry.title}</Link></li>)}</ul></section>
  </article>;
}
