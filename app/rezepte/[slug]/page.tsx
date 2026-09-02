import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChefHat, ChevronRight, Clock3, Flame, Users } from "lucide-react";
import { PrintButton } from "@/components/print-button";
import { getRecipe, recipes } from "@/data/recipes";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return {};
  const description = `${recipe.intro} In ${recipe.prep + recipe.cook} Minuten bei ${recipe.temperature} °C.`;
  return {
    title: `${recipe.title} aus dem Airfryer`,
    description,
    alternates: { canonical: `/rezepte/${slug}` },
    openGraph: { title: recipe.title, description, type: "article", url: `/rezepte/${slug}`, images: [{ url: recipe.image, alt: recipe.title }] },
    twitter: { card: "summary_large_image", title: recipe.title, description, images: [recipe.image] },
  };
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    url: `${SITE_URL}/rezepte/${slug}`,
    image: [`${SITE_URL}${recipe.image}`],
    description: recipe.intro,
    prepTime: `PT${recipe.prep}M`,
    cookTime: `PT${recipe.cook}M`,
    recipeYield: `${recipe.servings} Portionen`,
    recipeIngredient: recipe.ingredients,
    recipeInstructions: recipe.steps.map((text) => ({ "@type": "HowToStep", text })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="recipe-detail">
        <div className="shell breadcrumbs"><Link href="/">Start</Link><ChevronRight /><Link href="/rezepte">Rezepte</Link><ChevronRight /><span>{recipe.title}</span></div>
        <div className="recipe-detail-hero">
          <Image src={recipe.image} alt={recipe.title} fill priority sizes="100vw" />
          <div className="recipe-title-card"><span>{recipe.category} · {recipe.diet}</span><h1>{recipe.title}</h1><p>{recipe.intro}</p><div><b><Clock3 /> {recipe.prep + recipe.cook} Min.</b><b><Flame /> {recipe.temperature} °C</b><b><Users /> {recipe.servings} Portionen</b></div></div>
        </div>
        <div className="shell recipe-body">
          <aside className="recipe-facts">
            <h2>Auf einen Blick</h2>
            <div><span>Vorbereitung</span><b>{recipe.prep} Minuten</b></div>
            <div><span>Garzeit</span><b>{recipe.cook} Minuten</b></div>
            <div><span>Korbgröße</span><b>{recipe.basket}</b></div>
            <div><span>Temperatur</span><b>{recipe.temperature} °C</b></div>
            <PrintButton />
          </aside>
          <div className="recipe-instructions">
            <section><h2>Zutaten</h2><p className="serving-note">Für {recipe.servings} Portionen</p><ul className="ingredient-list">{recipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul></section>
            <section><h2>Zubereitung</h2><ol className="step-list">{recipe.steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}</ol></section>
            <section className="cook-tip"><ChefHat /><div><h3>Knusper-Tipp</h3><p>{recipe.tip}</p></div></section>
            <section><h2>Sicher genießen</h2><p>Garzeiten können je nach Gerät, Füllmenge und Größe der Zutaten abweichen. Prüfe den Garzustand vor dem Servieren. Geflügel und Hackfleisch vollständig durchgaren.</p></section>
          </div>
        </div>
      </article>
    </>
  );
}
