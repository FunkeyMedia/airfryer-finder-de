"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button type="button" className="button secondary print-button" onClick={() => window.print()}>
      <Printer /> Rezept drucken
    </button>
  );
}
