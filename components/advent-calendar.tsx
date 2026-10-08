"use client";

import { useSyncExternalStore } from "react";
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

export function AdventCalendar() {
  const visible = useSyncExternalStore(subscribe, isVisible, serverSnapshot);
  if (!visible) return null;

  return (
    <section className="section shell advent-section" aria-labelledby="advent-title">
      <div className="section-heading">
        <span>Vorfreude für deine Küche</span>
        <h2 id="advent-title">Airfryer Adventskalender</h2>
        <p>Eine Geschenkidee für alle, die ihren Airfryer lieben.</p>
      </div>
      <a className="advent-card" href="https://www.amazon.de/dp/3911635346?tag=onlinestarkei-21" target="_blank" rel="sponsored nofollow noopener noreferrer">
        <div className="advent-art" aria-hidden="true">
          <Sparkles className="advent-sparkles" size={30} />
          <Gift size={80} strokeWidth={1.3} />
          <span>ADVENT 2026</span>
        </div>
        <div className="advent-copy">
          <span className="advent-label">Geschenkidee · Buch</span>
          <h3>Airfryer Adventskalender 2026</h3>
          <p>Entdecke den Adventskalender für die Heißluftfritteuse. Alle Informationen zum Inhalt, Preis und zur Verfügbarkeit findest du bei Amazon.</p>
          <span className="button accent">Bei Amazon ansehen <ArrowUpRight size={18} /></span>
          <small>Werbung · Affiliate-Link</small>
        </div>
      </a>
    </section>
  );
}
