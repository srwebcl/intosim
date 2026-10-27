"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Project = { slug: string; name: string; client: string; logo?: string; service: string; description: string; images: string[] };

const AUTOPLAY_MS = 8000;

export function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement>(null);
  const count = projects.length;
  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);

  // Avance automático: se pausa al pasar el mouse o con foco dentro, y no corre con "reducir movimiento"
  useEffect(() => {
    if (paused || count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, count, go]);

  const p = projects[index];
  const next = projects[(index + 1) % count];

  return <section className="showcase" ref={root} aria-roledescription="carrusel" aria-label="Proyectos destacados"
    onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)} onBlur={e => { if (!root.current?.contains(e.relatedTarget as Node)) setPaused(false); }}>
    <div className="showcase-bg" aria-hidden="true">
      {projects.map((x, i) => <div key={x.slug} className={i === index ? "active" : undefined} style={{ backgroundImage: `url("${x.images[0]}")` }} />)}
    </div>
    <div className="container showcase-head">
      <div className="kicker"><span className="kicker-icon" aria-hidden="true" />Proyectos destacados</div>
      <div className="showcase-head-row">
        <h2>Experiencia que se demuestra en terreno.</h2>
        <p>Trabajamos junto a algunas de las principales compañías mineras del país, entregando información técnica precisa en cada etapa de sus operaciones.</p>
      </div>
    </div>
    <div className="container showcase-grid">
      <div className="showcase-left">
        <div className="showcase-card" aria-live="polite">
          <div className="showcase-content" key={p.slug}>
            <span className="showcase-tag">{p.service}</span>
            <h3>{p.name}</h3>
            <p className="showcase-desc">{p.description}</p>
            <div className="showcase-foot">
              {p.logo && <div className="showcase-logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={p.logo} alt={p.client} /></div>}
              <div className="showcase-client"><small>Cliente</small><strong>{p.client}</strong></div>
            </div>
          </div>
          <div className="showcase-bottom">
            <div className="showcase-controls">
              <div className="showcase-dots" role="tablist" aria-label="Elegir proyecto">
                {projects.map((x, i) => <button key={x.slug} type="button" role="tab" aria-selected={i === index} aria-label={`${i + 1}: ${x.name}`} className={i === index ? "active" : undefined} onClick={() => go(i)} />)}
              </div>
              <button type="button" className="showcase-arrow" onClick={() => go(index - 1)} aria-label="Proyecto anterior"><ArrowLeft size={20} /></button>
              <button type="button" className="showcase-arrow showcase-arrow-next" onClick={() => go(index + 1)} aria-label="Proyecto siguiente"><ArrowRight size={20} /></button>
            </div>
          </div>
        </div>
      </div>
      <div className="showcase-stack">
        <div className="showcase-back" aria-hidden="true" key={`back-${next.slug}`} style={{ backgroundImage: `url("${next.images[0]}")` }} />
        <div className="showcase-front" key={`front-${p.slug}`} role="img" aria-label={`${p.name}, ${p.client}`} style={{ backgroundImage: `url("${p.images[0]}")` }}>
          <span className="showcase-front-label">{p.client}</span>
        </div>
      </div>
    </div>
    <div className="container showcase-cta">
      <Link className="button button-red showcase-cta-btn" href="/proyectos/">Ver todos los proyectos <ArrowRight size={20} /></Link>
    </div>
  </section>;
}
