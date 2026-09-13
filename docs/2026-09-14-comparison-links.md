# Nachvollziehbare Vorauswahl und teilbarer Vergleich

Belegte Fehler im bisherigen Finder: „Flexibel“ setzte das Budget auf 300 Euro; die Reinigungsantwort beeinflusste die Reihenfolge nicht; fehlende Garzonen wurden als eine Zone behandelt; der angezeigte Score wurde künstlich auf 55 bis 98 Prozent begrenzt. Ergebnispositionen zwei und drei wurden unabhängig vom Produkt als günstige bzw. Komfort-Alternative bezeichnet.

Die neue Sortierung verwendet den vorhandenen Katalog und zeigt Gründe sowie fehlende oder abweichende Angaben. Das flexible Budget hat keine Preisgrenze. Reinigungsmerkmale zählen nur, wenn die vorhandene Kurzbeschreibung sie nennt. Preise, Sterne und Portionsgrößen sind als erfasste Angaben bzw. redaktionelle Orientierung gekennzeichnet. Die Prioritätsbeschriftungen entsprechen den tatsächlich verwendeten Feldern; Kapazität wird nicht als bestätigte Stellfläche ausgegeben. Es gibt keine erfundenen Match-Prozente oder pauschalen Alternativlabels.

Die vier vorgeschlagenen Geräte führen direkt in den vorhandenen Vergleich. Dort lassen sich gültige Geräte auswählen, entfernen und als Link teilen. Doppelte/ungültige IDs verbrauchen keine Vergleichsplätze. Gesperrte Zwischenablage: manuelles Kopierfeld.

Nachweise: `lib/finder-ranking.ts`, `lib/comparison-state.ts`, sechs Regressionstests. ESLint, Produktionsbuild und sechs vorhandene Release-Tests bestehen, einschließlich Erreichbarkeit aller 313 Sitemap-Seiten und Produktbild-/Affiliate-Link-Prüfung. Im mobilen Browser sind Auswahl, Kopieren/Fallback, Wiederöffnen und die komplette Finder-zu-Vergleich-Strecke geprüft.

Datenstand bleibt 22.08.2026. Keine neue Produktrecherche, keine eigenen Produkttests und kein gemessener Conversion-Uplift. Main-Push und Produktionsdeployment sind getrennte Vorgänge.
