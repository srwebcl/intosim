"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { services } from "@/lib/content";
import { CtaContactForm } from "@/components/cta-form";
import { Kicker } from "@/components/ui";

const address = "Juan José Latorre 1689, Compañía Baja, La Serena, Chile";

export function ContactPageContent() {
  // Los enlaces antiguos /contacto/?servicio=<slug> llegan con el servicio ya elegido
  const slug = useSearchParams().get("servicio");
  const preset = services.find(s => s.slug === slug)?.name ?? "";

  return <main>
    <section className="sd-hero ct-hero">
      <div className="sd-hero-bg" style={{ backgroundImage: 'url("/images/planta-industrial.webp")' }} aria-hidden="true" />
      <div className="container sd-hero-inner">
        <nav className="sd-crumbs" aria-label="Ruta"><Link href="/">Inicio</Link><span>/</span><span aria-current="page">Contacto</span></nav>
        <h1>Contacto</h1>
        <p>Cuéntanos tus necesidades técnicas. Nuestro equipo revisará tu solicitud y coordinará los siguientes pasos.</p>
        <div className="sd-hero-actions">
          <a className="button button-red" href="tel:+56932120407"><Phone size={18} /> Llamar ahora</a>
          <a className="button sd-button-ghost" href="https://wa.me/56932120407" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> Escribir por WhatsApp</a>
        </div>
      </div>
    </section>

    <section className="section section-soft ct-main">
      <div className="container ct-grid">
        <div className="ct-info">
          <Kicker>Hablemos</Kicker>
          <h2>Estamos para ayudarte en tu próximo proyecto.</h2>
          <p className="ct-lead">Recibimos consultas sobre nuestros servicios y solicitudes de cotización. Escríbenos por el formulario o usa cualquiera de nuestros canales.</p>
          <ul className="ct-cards">
            <li><span className="ct-icon"><Phone size={22} /></span><div><small>Teléfono / WhatsApp</small><a href="tel:+56932120407">+56 9 3212 0407</a></div></li>
            <li><span className="ct-icon"><Mail size={22} /></span><div><small>Correo electrónico</small><a href="mailto:contacto@intosim.cl">contacto@intosim.cl</a></div></li>
            <li><span className="ct-icon"><MapPin size={22} /></span><div><small>Dirección</small><span>Juan José Latorre #1689, Cía. Baja, La Serena, Chile</span></div></li>
            <li><span className="ct-icon"><Clock size={22} /></span><div><small>Horario de atención</small><span>Lunes a jueves 08:30–18:00</span><span>Viernes 08:30–14:00</span></div></li>
          </ul>
        </div>
        <div className="ct-form"><CtaContactForm defaultService={preset} key={preset} /></div>
      </div>
    </section>

    <section className="ct-map-section">
      <div className="container ct-map-wrap">
        <div className="ct-map">
          <iframe title="Ubicación de INTOSIM en La Serena" src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
        <div className="ct-map-card">
          <Kicker>Oficina</Kicker>
          <h2>La Serena, Región de Coquimbo</h2>
          <p>Juan José Latorre #1689, Compañía Baja.</p>
          <a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer">Cómo llegar <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>

    <section className="ct-jobs">
      <div className="container ct-jobs-inner">
        <div><strong>¿Quieres trabajar con nosotros?</strong><span>Envíanos tus antecedentes para futuras oportunidades.</span></div>
        <Link className="button button-outline" href="/trabaja-con-nosotros/">Postular <ArrowRight size={18} /></Link>
      </div>
    </section>
  </main>;
}
