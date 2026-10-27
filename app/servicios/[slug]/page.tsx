import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowDownToLine, ArrowRight, Archive, BadgeCheck, Box, Camera, ChartLine, ChartSpline, CircleCheck, ClipboardList, Construction, Database, DraftingCompass, Drill, FileCheck2, HardHat, LandPlot, Layers, MapPinned, Map as MapIcon, Mountain, Pickaxe, Route, Ship, Shovel, Siren, Tent, Waves, type LucideIcon } from "lucide-react";
import { projects, services } from "@/lib/content";
import { CTASection, Kicker } from "@/components/ui";
import { ContactLink } from "@/components/nav";
import { ServicesCarousel } from "@/components/services-carousel";

const certs = {
  iso: { src: "/certificaciones/iso-9001-bureau-veritas.png", alt: "ISO 9001 Bureau Veritas", title: "Certificación ISO 9001:2015", text: "Servicios de topografía certificados para minería, geología, ingeniería y construcción." },
  dgac: { src: "/certificaciones/dgac.svg", alt: "DGAC Chile", title: "Acreditados por la DGAC", text: "Pilotos certificados y naves acreditadas para vuelos UAV desde 2015." },
} as const;

// Ícono específico para cada aplicación; si se agrega una nueva sin ícono, se usa CircleCheck
const appIcons: Record<string, LucideIcon> = {
  "Inspección técnica de obras": Construction,
  "Modelamiento digital de terreno": Mountain,
  "Subdivisiones de terreno": LandPlot,
  "Control de movimiento de tierra": Shovel,
  "Diseño de caminos y plataformas": Route,
  "Control de calidad": BadgeCheck,
  "Control de sondaje DDH y aire reverso": Drill,
  "Asistencia en geología": Pickaxe,
  "Administración de testigoteca": Archive,
  "Interpretación geológica": Layers,
  "Apoyo logístico de campamento": Tent,
  "Ingeniería desde prefactibilidad hasta puesta en marcha": DraftingCompass,
  "Proyectos viales": Route,
  "Minería": Pickaxe,
  "Registro de imágenes y video": Camera,
  "Monitoreo de avance de obras": ChartLine,
  "Cubicación de movimientos de tierra": Box,
  "Planificación territorial": MapIcon,
  "Mapeos superficiales": MapPinned,
  "Apoyo ante emergencias": Siren,
  "Control de acumulación en tranques y embalses": Waves,
  "Determinación de secciones y pendientes": ChartSpline,
  "Control de profundidades": ArrowDownToLine,
  "Control de sedimentación para planificar limpiezas o dragados": Ship,
};

const steps = [
  { icon: ClipboardList, title: "Requerimientos", text: "Revisamos el alcance, los objetivos y las condiciones del proyecto junto al cliente." },
  { icon: Route, title: "Planificación", text: "Definimos metodología, equipos, personal y plazos para cada etapa del servicio." },
  { icon: HardHat, title: "Ejecución en terreno", text: "Trabajamos con instrumental adecuado y foco permanente en la seguridad." },
  { icon: Database, title: "Procesamiento y entrega", text: "Procesamos y validamos la información para entregar resultados confiables." },
];

export function generateStaticParams() { return services.map(s => ({ slug: s.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find(x => x.slug === slug);
  return s ? { title: s.name, description: s.short, openGraph: { title: `${s.name} | INTOSIM`, description: s.short, images: [s.image] } } : {};
}

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find(x => x.slug === slug);
  if (!s) notFound();
  const cert = "cert" in s && s.cert ? certs[s.cert as keyof typeof certs] : null;
  const project = projects.find(p => p.service === s.name);
  const others = services.filter(x => x.slug !== s.slug);

  return <main>
    <section className="sd-hero">
      <div className="sd-hero-bg" style={{ backgroundImage: `url("${"heroImage" in s && s.heroImage ? s.heroImage : s.image}")` }} aria-hidden="true" />
      <div className="container sd-hero-inner">
        <nav className="sd-crumbs" aria-label="Ruta"><Link href="/">Inicio</Link><span>/</span><Link href="/servicios/">Servicios</Link><span>/</span><span aria-current="page">{s.name}</span></nav>
        <h1>{s.name}</h1>
        <p>{s.short}</p>
        <div className="sd-hero-actions">
          <ContactLink className="button button-red">Cotizar {s.name.toLowerCase()} <ArrowRight size={18} /></ContactLink>
          <a className="button sd-button-ghost" href="#entregables">Ver entregables</a>
        </div>
      </div>
    </section>

    <section className="section sd-intro">
      <div className="container sd-intro-grid">
        <div>
          <Kicker>La especialidad</Kicker>
          <h2>{s.headline}</h2>
          <p className="sd-lead">{s.description}</p>
          <p className="sd-lead">El alcance, la metodología y los equipos se definen de acuerdo con los requisitos técnicos de cada proyecto y cliente.</p>
          {cert && <div className="sd-cert">
            <div className="sd-cert-logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={cert.src} alt={cert.alt} loading="lazy" /></div>
            <div><strong>{cert.title}</strong><span>{cert.text}</span></div>
          </div>}
        </div>
        <div className="sd-intro-photo" role="img" aria-label={`${s.name} en terreno`} style={{ backgroundImage: `url("${s.image}")` }} />
      </div>
    </section>

    <section className="section sd-apps-section">
      <div className={`container sd-apps-grid${s.applications.length < 4 ? " short" : ""}`}>
        <div className="sd-apps-side">
          <Kicker>Aplicaciones</Kicker>
          <h2>¿Dónde aplicamos {s.name.toLowerCase()}?</h2>
          <p>Soluciones aplicadas en distintas etapas y tipos de proyecto, según las necesidades técnicas de cada cliente.</p>
          <div className="sd-apps-photo" role="img" aria-label={`${s.name} en terreno`} style={{ backgroundImage: `url("${"appsImage" in s && s.appsImage ? s.appsImage : s.image}")` }} />
        </div>
        <ol className="sd-apps-list">
          {s.applications.map((a, i) => { const Icon = appIcons[a] ?? CircleCheck; return <li key={a}>
            <span className="sd-apps-icon"><Icon size={26} strokeWidth={1.8} /></span>
            <span className="sd-apps-name">{a}</span>
            <span className="sd-apps-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          </li>; })}
        </ol>
      </div>
    </section>

    <section className="section" id="entregables">
      <div className="container sd-deliv-grid">
        <div className="sd-deliv-head">
          <Kicker>Entregables</Kicker>
          <h2>Productos que recibes.</h2>
          <p className="sd-lead">Información técnica lista para usar en el diseño, la planificación y el control de tu proyecto.</p>
          <ContactLink className="text-link">Consultar por un entregable <ArrowRight size={16} /></ContactLink>
        </div>
        <ul className="sd-deliv">
          {s.deliverables.map(d => <li key={d}><FileCheck2 size={20} />{d}</li>)}
        </ul>
      </div>
    </section>

    <section className="section sd-process">
      <div className="container">
        <div className="section-head"><div><Kicker>Cómo trabajamos</Kicker><h2>Un proceso claro, de principio a fin.</h2></div></div>
        <ol className="sd-steps">
          {steps.map(({ icon: Icon, title, text }, i) => <li key={title}>
            <div className="sd-step-top"><span className="sd-step-icon"><Icon size={24} /></span><span className="sd-step-num">0{i + 1}</span></div>
            <h3>{title}</h3><p>{text}</p>
          </li>)}
        </ol>
      </div>
    </section>

    {project && <section className="section sd-project">
      <div className="container sd-project-card">
        <div className="sd-project-photo" role="img" aria-label={project.name} style={{ backgroundImage: `url("${project.images[0]}")` }} />
        <div className="sd-project-body">
          <Kicker>Experiencia</Kicker>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <div className="sd-project-client">
            {"logo" in project && project.logo && <div className="sd-project-logo">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={project.logo} alt={project.client} loading="lazy" /></div>}
            <div><small>Cliente</small><strong>{project.client}</strong></div>
          </div>
          <Link className="text-link" href="/proyectos/">Ver todos los proyectos <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>}

    <section className="section section-soft">
      <div className="container">
        <div className="section-head"><div><Kicker>Otras especialidades</Kicker><h2>Complementa tu proyecto.</h2></div><Link className="text-link" href="/servicios/">Ver todos los servicios <ArrowRight size={16} /></Link></div>
        <ServicesCarousel services={others} />
      </div>
    </section>

    <CTASection kicker="Cotización" title={`Cotiza ${s.name.toLowerCase()} para tu proyecto`} text="Cuéntanos qué necesitas. Nuestro equipo revisará tu requerimiento y te contactará a la brevedad." service={s.name} />
  </main>;
}
