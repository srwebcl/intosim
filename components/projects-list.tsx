"use client";
import { useState } from "react";

type Project = { slug: string; name: string; client: string; logo?: string; service: string; description: string; images: string[] };

function Gallery({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const imgs = project.images.slice(0, 3);
  return <div className="pl-gallery">
    <div className="pl-main" role="img" aria-label={`${project.name}, imagen ${active + 1}`}>
      {imgs.map((src, i) => <div key={src} className={i === active ? "active" : undefined} style={{ backgroundImage: `url("${src}")` }} />)}
    </div>
    {imgs.length > 1 && <div className="pl-thumbs">
      {imgs.map((src, i) => <button key={src} type="button" className={i === active ? "active" : undefined} aria-label={`Ver imagen ${i + 1}`} aria-pressed={i === active}
        onClick={() => setActive(i)} style={{ backgroundImage: `url("${src}")` }} />)}
    </div>}
  </div>;
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  const services = [...new Set(projects.map(p => p.service))];
  const [filter, setFilter] = useState<string | null>(null);
  const shown = filter ? projects.filter(p => p.service === filter) : projects;

  return <>
    <div className="pl-filters" role="group" aria-label="Filtrar por especialidad">
      <button type="button" className={!filter ? "active" : undefined} aria-pressed={!filter} onClick={() => setFilter(null)}>Todos <span>{projects.length}</span></button>
      {services.map(s => <button key={s} type="button" className={filter === s ? "active" : undefined} aria-pressed={filter === s} onClick={() => setFilter(s)}>{s}</button>)}
    </div>
    <div className="pl-list" aria-live="polite">
      {shown.map(p => <article className="pl-item" id={p.slug} key={p.slug}>
        <Gallery project={p} />
        <div className="pl-body">
          <span className="pl-service">{p.service}</span>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <div className="pl-client">
            {p.logo
              ? <div className="pl-logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={p.logo} alt={p.client} loading="lazy" /></div>
              : <div className="pl-logo pl-logo-text">{p.client}</div>}
            <dl>
              <div><dt>Cliente</dt><dd>{p.client}</dd></div>
              <div><dt>Especialidad</dt><dd>{p.service}</dd></div>
            </dl>
          </div>
        </div>
      </article>)}
    </div>
  </>;
}
