import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von AirfryerFinder.de.",
  alternates: { canonical: "/impressum" },
};

export default function Imprint() {
  return (
    <section className="inner-section shell prose-page">
      <span className="eyebrow">Rechtliche Angaben</span>
      <h1>Impressum</h1>

      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        Christopher Funke<br />
        Einzelunternehmen<br />
        Waldstr. 28<br />
        63150 Heusenstamm<br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href="tel:+491634772718">0163 4772718</a><br />
        E-Mail: <a href="mailto:wir@funkeymedia.de">wir@funkeymedia.de</a>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        Christopher Funke<br />
        Waldstr. 28<br />
        63150 Heusenstamm
      </p>

      <h2>Hinweis zu Händlerlinks</h2>
      <p>
        AirfryerFinder.de enthält gekennzeichnete Affiliate-Links. Bei einem Kauf über einen solchen Link können wir eine Provision erhalten. Für Käuferinnen und Käufer ändert sich der Preis dadurch nicht.
      </p>
    </section>
  );
}
