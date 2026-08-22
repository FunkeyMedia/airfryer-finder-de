import type { ReactNode } from "react";

export function SectionHeading({ kicker, title, children, align = "left" }: { kicker: string; title: string; children?: ReactNode; align?: "left" | "center" }) {
  return <div className={`section-heading ${align === "center" ? "center" : ""}`}><span>{kicker}</span><h2>{title}</h2>{children && <p>{children}</p>}</div>;
}
