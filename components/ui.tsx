import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { CtaContactForm } from "@/components/cta-form";
// Pre-título de sección: retícula animada + etiqueta corta
export function Kicker({children}:{children:React.ReactNode}) { return <div className="kicker"><span className="kicker-icon" aria-hidden="true"/>{children}</div> }
export function PageHero({crumb,title,description,image}:{crumb:string,title:string,description:string,image:string}) {
  return <section className="page-hero" style={{backgroundImage:`linear-gradient(90deg,rgba(8,38,79,.92),rgba(8,38,79,.58)),url("${image}")`}}><div className="container page-hero-content"><div className="breadcrumbs"><Link href="/">Inicio</Link><span>/</span><span>{crumb}</span></div><h1>{title}</h1><p>{description}</p></div></section>
}
export function CTASection({title="Conversemos sobre tu próximo proyecto",text="Cuéntanos qué necesitas y nuestro equipo te ayudará a evaluar la solución técnica adecuada.",kicker="Contacto",service}:{title?:string,text?:string,kicker?:string,service?:string}) {
 return <section className="cta-band" id="contacto">
  <div className="cta-bg" aria-hidden="true"/>
  <div className="container cta-grid">
   <div className="cta-info">
    <Kicker>{kicker}</Kicker><h2>{title}</h2><p>{text}</p>
    <ul className="cta-contacts">
     <li><span className="cta-contact-icon"><Phone size={20}/></span><div><small>Teléfono / WhatsApp</small><a href="tel:+56932120407">+56 9 3212 0407</a></div></li>
     <li><span className="cta-contact-icon"><Mail size={20}/></span><div><small>Correo electrónico</small><a href="mailto:contacto@intosim.cl">contacto@intosim.cl</a></div></li>
     <li><span className="cta-contact-icon"><MapPin size={20}/></span><div><small>Dirección</small><span>Juan José Latorre #1689, Cía. Baja, La Serena</span></div></li>
     <li><span className="cta-contact-icon"><Clock size={20}/></span><div><small>Horario de atención</small><span>Lunes a jueves 08:30–18:00</span><span>Viernes 08:30–14:00</span></div></li>
    </ul>
   </div>
   <CtaContactForm defaultService={service}/>
  </div>
 </section>
}
export function ServiceCard({title,description,href,image}:{title:string,description:string,href:string,image:string}) {
 return <Link href={href} className="service-card"><div className="service-image"><div style={{backgroundImage:`url("${image}")`}}/></div><div className="service-card-body"><h3>{title}</h3><p>{description}</p><span className="service-card-link">Conocer servicio <ArrowRight size={16}/></span></div></Link>
}
export function ClientsMarquee({logos,label="Clientes"}:{logos:{name:string,src:string,w:number,h:number}[],label?:string}) {
 // Se repite para que una mitad de la cinta cubra pantallas anchas; la segunda mitad permite el bucle sin cortes
 const items=[...logos,...logos];
 return <div className="clients-marquee" aria-label={label}><ul className="clients-track">{[0,1].map(copy=>items.map((l,i)=><li key={`${copy}-${i}`} aria-hidden={copy===1||i>=logos.length}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={l.src} alt={l.name} width={l.w} height={l.h} loading="lazy" decoding="async"/></li>))}</ul></div>
}
