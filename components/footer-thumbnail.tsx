"use client";

import { useState } from "react";
import Image from "next/image";

export function FooterThumbnail({ src, recipe = false }: { src: string; recipe?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <span className={`footer-thumbnail${recipe ? " footer-thumbnail-recipe" : ""}`}>
      {failed ? <span className="footer-image-fallback">Bild nicht verfügbar</span> : (
        <Image src={src} alt="" fill sizes="80px" loading="lazy" onError={() => setFailed(true)} />
      )}
    </span>
  );
}
