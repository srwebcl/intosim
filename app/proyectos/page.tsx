import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clientLogos, projects } from "@/lib/content";
import { ClientsMarquee, CTASection, Kicker } from "@/components/ui";
import { ContactLink } from "@/components/nav";
import { ProjectsList } from "@/components/projects-list";

export const metadata: Metadata = { title: "Proyectos", description: "Proyectos destacados de INTOSIM en topografía, geología, geodesia, aerofotogrametría y batimetría para la minería en Chile." };

export default function Proyectos() {
  return <main>
    <section className="sd-hero">
      <div className="sd-hero-bg" style={{ backgroundImage: 'url("/images/faena-minera.webp")' }} aria-hidden="true" />
      <div className="container sd-hero-inner">
        <nav className="sd-crumbs" aria-label="Ruta"><Link href="/">Inicio</Link><span>/</span><span aria-current="page">Proyectos</span></nav>
        <h1>Proyectos</h1>
        <p>Experiencia en servicios técnicos para operaciones y proyectos mineros, desde la exploración hasta la operación.</p>
        <div className="sd-hero-actions">
          <ContactLink className="button button-red">Cotizar un proyecto <ArrowRight size={18} /></ContactLink>
          <a className="button sd-button-ghost" href="#clientes">Nuestros clientes</a>
        </div>
      </div>
    </section>

    <section className="section section-soft">
      <div className="container">
        <div className="pl-head">
          <div><Kicker>Proyectos destacados</Kicker><h2>Experiencia que se demuestra en terreno.</h2></div>
          <p>Cada proyecto refleja nuestra forma de trabajar: información técnica precisa, coordinación cercana con el cliente y foco permanente en la seguridad.</p>
        </div>
        <ProjectsList projects={projects} />
      </div>
    </section>

    <section className="section clients-section" id="clientes">
      <div className="container">
        <div className="section-head section-head-center"><div><Kicker>Clientes</Kicker><h2>Empresas que confían en nosotros.</h2><p>Hemos desarrollado servicios de topografía, geología, geodesia, aerofotogrametría y batimetría para operaciones y proyectos mineros de distinta escala.</p></div></div>
      </div>
      <ClientsMarquee logos={clientLogos} />
    </section>

    <CTASection kicker="Cotización" title="¿Tienes un proyecto similar?" text="Cuéntanos tus requerimientos y revisemos juntos la mejor solución técnica." />
  </main>;
}
