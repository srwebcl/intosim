import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, HardHat, Target } from "lucide-react";
import { clientLogos } from "@/lib/content";
import { ClientsMarquee, CTASection, Kicker } from "@/components/ui";
import { CertificationsSection } from "@/components/certifications";

export const metadata: Metadata = { title: "Nosotros", description: "Conoce al equipo, el propósito y las certificaciones de Servicios Intosim SpA, empresa de servicios técnicos de la Región de Coquimbo." };

const principles = [
  { icon: Target, title: "Misión", text: "Entregar servicios técnicos de calidad que respondan a las necesidades de los clientes y aporten al desarrollo responsable de sus proyectos." },
  { icon: BadgeCheck, title: "Calidad", text: "Trabajar con orientación a la mejora continua, consistencia técnica y cumplimiento de los requerimientos acordados." },
  { icon: HardHat, title: "Seguridad y equipo", text: "Valorar a las personas, el trabajo colaborativo y la atención a las condiciones de operación." },
];

export default function Nosotros() {
  return <main>
    <section className="sd-hero">
      <div className="sd-hero-bg" style={{ backgroundImage: 'url("/images/pala-minera.webp")' }} aria-hidden="true" />
      <div className="container sd-hero-inner">
        <nav className="sd-crumbs" aria-label="Ruta"><Link href="/">Inicio</Link><span>/</span><span aria-current="page">Nosotros</span></nav>
        <h1>Nosotros</h1>
        <p>Experiencia técnica y compromiso en terreno. Una empresa de la Región de Coquimbo orientada a entregar resultados de calidad en proyectos exigentes.</p>
        <div className="sd-hero-actions">
          <Link className="button button-red" href="/servicios/">Conoce nuestros servicios <ArrowRight size={18} /></Link>
          <Link className="button sd-button-ghost" href="/proyectos/">Ver proyectos</Link>
        </div>
      </div>
    </section>

    <section className="ns-team">
      <div className="container ns-team-head">
        <Kicker>Quiénes somos</Kicker>
        <h2>Un equipo que aporta información para mejores decisiones.</h2>
        <p>Servicios Intosim SpA es una empresa integrada por profesionales y técnicos, principalmente de la Región de Coquimbo. Nuestro trabajo se orienta a apoyar proyectos de minería, geología, ingeniería y construcción con información técnica precisa y confiable.</p>
      </div>
      <div className="container">
        <figure className="ns-team-photo">
          <div className="ns-team-img" role="img" aria-label="Equipo de INTOSIM" />
          <figcaption><strong>Nuestro equipo</strong><span>Profesionales y técnicos comprometidos con cada proyecto.</span></figcaption>
        </figure>
      </div>
    </section>

    <section className="section ns-purpose">
      <div className="container">
        <div className="ns-purpose-grid">
          <div><Kicker>Propósito</Kicker><h2>Contribuir al desarrollo regional y nacional.</h2></div>
          <p className="ns-quote">Desde nuestros inicios mantenemos el compromiso con la calidad del servicio, la cercanía con nuestros clientes, la seguridad de nuestros trabajadores y la mejora continua.</p>
        </div>
        <div className="ns-principles">
          {principles.map(({ icon: Icon, title, text }) => <article className="about-card" key={title}>
            <span className="about-icon"><Icon size={26} /></span><h3>{title}</h3><p>{text}</p>
          </article>)}
        </div>
        <div className="about-clients ns-clients"><p>Empresas que confían en nosotros</p><ClientsMarquee logos={clientLogos} /></div>
      </div>
    </section>

    <CertificationsSection />

    <CTASection title="Conoce cómo podemos aportar a tu proyecto" text="Revisemos tus necesidades y las capacidades técnicas más adecuadas." />
  </main>;
}
