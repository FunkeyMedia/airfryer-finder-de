"use client";

import { useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Gift, Sparkles } from "lucide-react";

// Inclusive through 6 December 2026 in Europe/Berlin (CET).
const expiresAt = Date.parse("2026-12-07T00:00:00+01:00");
const isVisible = () => Date.now() < expiresAt;
const serverSnapshot = () => false;

function subscribe(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  function schedule() {
    const remaining = expiresAt - Date.now();
    if (remaining <= 0) {
      onChange();
      return;
    }
    timer = setTimeout(() => {
      onChange();
      schedule();
    }, Math.min(remaining, 60_000));
  }
  schedule();
  window.addEventListener("focus", onChange);
  return () => {
    clearTimeout(timer);
    window.removeEventListener("focus", onChange);
  };
}

const calendars = [
  { asin: "3911635346", title: "Der 10 Minuten Airfryer Adventskalender 2026", description: "Der von uns vorgestellte Adventskalender für deine Heißluftfritteuse. Entdecke die Rezeptideen direkt bei Amazon.", image: "", label: "Advent 2026" },
  { asin: "394980160X", title: "Airfryer Adventskalender – 24 festliche Rezepte", description: "Von Anja Jung: Weihnachtsideen von Bratapfel bis Festtagssnacks für die Heißluftfritteuse.", image: "https://m.media-amazon.com/images/I/71eM6C3xJ+L._SY425_.jpg", label: "Festliche Küche" },
  { asin: "B0HFNHMSF3", title: "Weihnachten mit der Heißluftfritteuse", description: "Von Anna-Marie Adam: 24 süße und herzhafte Weihnachtsrezepte als Airfryer-Adventskalender.", image: "https://m.media-amazon.com/images/I/71YsFWjpFRL._SY425_.jpg", label: "Süß & herzhaft" },
  { asin: "9925823765", title: "Der Airfryer-Adventskalender – Knusprige Weihnachtsfreude", description: "Von Hannah Müller: 24 Rezeptideen von Zimtduft bis Käsekruste für die Adventszeit.", image: "https://cdn.idealo.com/folder/Product/208341/5/208341555/s1_produktbild_mittelgross/lmo-ltd-airfryer-adventskalender-knusprige-weihnachtsfreude-aus-der-heissluftfritteuse.jpg", label: "Weihnachtsfreude" },
];

function CalendarCover({ calendar }: { calendar: typeof calendars[number] }) {
  const [failed, setFailed] = useState(false);
  return <div className={`advent-art${calendar.image && !failed ? " advent-cover" : ""}`}>
    {calendar.image && !failed ? (
      // Use the original remote cover directly, without an image proxy.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={calendar.image} alt="" width={180} height={240} loading="lazy" decoding="async" onError={() => setFailed(true)} />
    ) : <><Sparkles className="advent-sparkles" size={25} aria-hidden="true" /><Gift size={70} strokeWidth={1.3} aria-hidden="true" /><span>ADVENTSZEIT</span><small>{failed ? "Buchcover bei Amazon ansehen" : "Symbolbild"}</small></>}
  </div>;
}

export function AdventCalendar() {
  const visible = useSyncExternalStore(subscribe, isVisible, serverSnapshot);
  if (!visible) return null;

  return (
    <section className="section shell advent-section" aria-labelledby="advent-title">
      <div className="section-heading">
        <span>Vorfreude für deine Küche</span>
        <h2 id="advent-title">Airfryer Adventskalender</h2>
        <p>Vier Geschenkideen für eine knusprige Adventszeit – entdecke Rezept-Adventskalender für deine Heißluftfritteuse.</p>
      </div>
      <div className="advent-grid">
        {calendars.map(calendar => <a key={calendar.asin} className="advent-card" href={`https://www.amazon.de/dp/${calendar.asin}?tag=onlinestarkei-21`} target="_blank" rel="sponsored nofollow noopener noreferrer">
          <CalendarCover calendar={calendar} />
          <div className="advent-copy">
            <span className="advent-label">{calendar.label} · Buch</span>
            <h3>{calendar.title}</h3>
            <p>{calendar.description}</p>
            <span className="button accent">Bei Amazon ansehen <ArrowUpRight size={16} aria-hidden="true" /></span>
            <small>Werbung · Affiliate-Link</small>
          </div>
        </a>)}
      </div>
      <p className="advent-note">Preis, Lieferbarkeit und genaue Buchausgabe bitte bei Amazon prüfen.</p>
    </section>
  );
}
