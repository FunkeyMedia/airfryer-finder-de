import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzhinweise für die Nutzung von AirfryerFinder.de.",
  alternates: { canonical: "/datenschutz" },
};

export default function Privacy() {
  return (
    <section className="inner-section shell prose-page">
      <span className="eyebrow">Datenschutz</span>
      <h1>Datenschutzerklärung</h1>
      <p>Stand: 2. September 2026</p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Christopher Funke, Einzelunternehmen<br />
        Waldstr. 28, 63150 Heusenstamm<br />
        E-Mail: <a href="mailto:wir@funkeymedia.de">wir@funkeymedia.de</a><br />
        Telefon: <a href="tel:+491634772718">0163 4772718</a>
      </p>

      <h2>2. Hosting und Server-Logfiles</h2>
      <p>
        Diese Website wird über Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA, bereitgestellt. Beim Aufruf der Website verarbeitet der Hostinganbieter technisch erforderliche Verbindungsdaten. Dazu können insbesondere IP-Adresse, Zeitpunkt, aufgerufene Seite, Referrer, Browser- und Geräteinformationen sowie Status- und Fehlerdaten gehören.
      </p>
      <p>
        Die Verarbeitung dient der sicheren, stabilen und schnellen Bereitstellung der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren und zuverlässigen Betrieb dieses Angebots. Vercel beschreibt internationale Übermittlungen und die dabei eingesetzten Schutzmechanismen, darunter das EU-US Data Privacy Framework und Standardvertragsklauseln, in seiner <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> und im <a href="https://vercel.com/legal/dpa" target="_blank" rel="noopener noreferrer">Data Processing Addendum</a>.
      </p>

      <h2>3. Airfryer-Finder und Vergleich</h2>
      <p>
        Für den Finder ist keine Registrierung erforderlich. Deine Antworten und die ausgewählten Vergleichsgeräte werden im Browser verarbeitet und nicht als persönliches Nutzerprofil an uns übermittelt oder dauerhaft gespeichert. Beim Laden der Seiten fallen lediglich die unter „Hosting und Server-Logfiles“ beschriebenen technischen Daten an.
      </p>

      <h2>4. Cookies und Reichweitenmessung</h2>
      <p>
        Wir setzen auf dieser Website derzeit keine eigenen Analyse-, Marketing- oder Profiling-Dienste und keine einwilligungspflichtigen Cookies ein. Sollte sich dies ändern, werden diese Hinweise vor dem Einsatz angepasst und erforderliche Einwilligungen eingeholt.
      </p>

      <h2>5. Amazon-Affiliate-Links</h2>
      <p>
        Einige Links führen zu Amazon.de und enthalten eine Affiliate-Kennung. Erst wenn du einen solchen Link öffnest, verlässt du AirfryerFinder.de. Amazon kann dann Verbindungsdaten verarbeiten und Cookies oder ähnliche Technologien einsetzen. Die Affiliate-Kennung ermöglicht die Zuordnung eines vermittelten Kaufs; wir erhalten gegebenenfalls eine Provision, jedoch keine personenbezogenen Bestelldaten von Amazon. Für die weitere Datenverarbeitung ist Amazon verantwortlich. Es gelten die <a href="https://www.amazon.de/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ" target="_blank" rel="noopener noreferrer">Datenschutzhinweise von Amazon</a>.
      </p>

      <h2>6. Kontaktaufnahme</h2>
      <p>
        Wenn du uns per E-Mail oder Telefon kontaktierst, verarbeiten wir die von dir mitgeteilten Angaben, um dein Anliegen zu beantworten. Je nach Inhalt erfolgt dies auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO oder Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden gelöscht, wenn die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>

      <h2>7. Deine Rechte</h2>
      <p>
        Du hast im Rahmen der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung kannst du jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem kannst du dich bei einer Datenschutzaufsichtsbehörde beschweren.
      </p>

      <h2>8. Aktualisierung dieser Hinweise</h2>
      <p>
        Wir passen diese Datenschutzerklärung an, wenn sich die eingesetzten Dienste oder die rechtlichen Anforderungen ändern. Maßgeblich ist die jeweils hier veröffentlichte Fassung.
      </p>
    </section>
  );
}
