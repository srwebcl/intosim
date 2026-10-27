"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

type Slide = { slug: string; name: string; short: string; image: string };

export function ServicesCarousel({ services }: { services: Slide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  // Avanza exactamente una tarjeta (ancho + separación)
  const go = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return <div className="svc-carousel" role="region" aria-roledescription="carrusel" aria-label="Servicios">
    <div className="svc-track" ref={track} onScroll={update}>
      {services.map(s => <Link key={s.slug} className="svc-card" href={`/servicios/${s.slug}/`}>
        <div className="svc-card-img" style={{ backgroundImage: `url("${s.image}")` }} />
        <span className="svc-card-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
        <div className="svc-card-body">
          <h3>{s.name}</h3>
          <div className="svc-card-reveal"><div><p>{s.short}</p><span className="svc-card-link">Conocer servicio <ArrowRight size={16} /></span></div></div>
        </div>
      </Link>)}
    </div>
    <div className="svc-controls">
      <div className="svc-progress" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }} /></div>
      <div className="svc-buttons">
        <button type="button" onClick={() => go(-1)} disabled={atStart} aria-label="Servicio anterior"><ArrowLeft size={20} /></button>
        <button type="button" onClick={() => go(1)} disabled={atEnd} aria-label="Servicio siguiente"><ArrowRight size={20} /></button>
      </div>
    </div>
  </div>;
}
