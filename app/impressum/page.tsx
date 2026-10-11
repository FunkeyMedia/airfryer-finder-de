import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von AirfryerFinder.de.",
  alternates: { canonical: "/impressum" },
};

export default function Imprint() {
  return (
    <section className="inner-section shell prose-page">
      <span className="eyebrow">Rechtliches</span>
      <h1>Impressum</h1>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Pascal Weyers<br />
        Birkenwaldstr. 46<br />
        63179 Obertshausen<br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:pascal@funkeymedia.de">pascal@funkeymedia.de</a>
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE299749508
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Diese Website enthält gekennzeichnete Links zu externen Angeboten. Für deren Inhalte sind die jeweiligen Betreiber verantwortlich.
      </p>
    </section>
  );
}
