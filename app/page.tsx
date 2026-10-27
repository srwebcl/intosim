import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Crosshair, HardHat, ShieldCheck } from "lucide-react";
import { ClientsMarquee, CTASection, Kicker } from "@/components/ui";
import { ServicesCarousel } from "@/components/services-carousel";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { CertificationsSection } from "@/components/certifications";
import { clientLogos, services, projects } from "@/lib/content";
// position: encuadre vertical de cada foto, para mostrar la faena y no solo el cielo
const heroImages = [
  { src: "/images/rajo-abierto.webp", position: "50% 80%" },
  { src: "/images/faena-minera.webp", position: "50% 68%" },
  { src: "/images/planta-industrial.webp", position: "50% 72%" },
  { src: "/images/planta-chancado.webp", position: "50% 75%" },
];
// Palabras del título del hero: cada una entra en cascada (ver .hw en globals.css)
function Words({ text, start = 0 }: { text: string; start?: number }) {
  return <>{text.split(" ").map((w, i) => <Fragment key={i}><span className="hw"><span style={{ "--d": start + i } as React.CSSProperties}>{w}</span></span>{" "}</Fragment>)}</>;
}

export default function Home() {
 return <main>
  <section className="hero"><div className="hero-slides" aria-hidden="true">{heroImages.map((img,i)=><span key={img.src} style={{backgroundImage:`url("${img.src}")`,backgroundPosition:img.position,animationDelay:`${i*6}s`}}/>)}</div><div className="container hero-content"><div className="hero-copy"><h1><Words text="Especialistas en servicios técnicos"/><br className="hero-break"/><em><Words text="para minería, ingeniería y construcción." start={4}/></em></h1><p>Desarrollamos servicios especializados en {services.map((s,i)=><span key={s.slug}>{i>0&&(i===services.length-1?" y ":", ")}<Link className="hero-service" style={{"--i":i} as React.CSSProperties} href={`/servicios/${s.slug}/`}>{s.name.toLowerCase()}</Link></span>)} para apoyar el desarrollo de proyectos y las operaciones en terreno.</p><div className="hero-actions"><Link className="button button-red" href="/servicios/">Conocer nuestros servicios <ArrowUpRight size={17}/></Link><Link className="button button-outline" style={{color:"#fff",borderColor:"#ffffff80"}} href="/nosotros/">Conoce INTOSIM</Link></div></div></div></section>
  <section className="trust-strip"><div className="container trust-grid"><div className="trust-item"><div className="trust-icon"><ShieldCheck/></div><div><strong>Calidad y compromiso</strong><span>Orientación a resultados y mejora continua</span></div></div><div className="trust-item"><div className="trust-icon"><Crosshair/></div><div><strong>Precisión técnica</strong><span>Información para decisiones confiables</span></div></div><div className="trust-item"><div className="trust-icon"><HardHat/></div><div><strong>Experiencia en terreno</strong><span>Soluciones adaptadas a cada proyecto</span></div></div></div></section>
  <section className="section about"><div className="container about-head"><div><Kicker>Nosotros</Kicker><h2>Capacidades técnicas al servicio de proyectos exigentes.</h2></div><div className="about-intro"><p>Somos una empresa con base en la Región de Coquimbo, integrada por profesionales y técnicos que trabajan para entregar información precisa y soluciones ajustadas a las necesidades de cada proyecto.</p><Link className="button button-outline" href="/nosotros/">Conoce nuestra empresa <ArrowRight size={18}/></Link></div></div><div className="container about-cards"><article className="about-card"><span className="about-icon"><HardHat size={26}/></span><h3>Minería, ingeniería y construcción</h3><p>Servicios técnicos para cada etapa del proyecto, desde la exploración hasta la operación.</p></article><article className="about-card"><span className="about-icon"><Crosshair size={26}/></span><h3>Soluciones a la medida</h3><p>Alcance, metodología y entregables definidos según los requerimientos técnicos de cada cliente.</p></article><article className="about-card"><span className="about-icon"><ShieldCheck size={26}/></span><h3>Calidad y seguridad</h3><p>Compromiso con la calidad del servicio, la seguridad en terreno y el trabajo colaborativo.</p></article></div><div className="container about-clients"><p>Empresas que confían en nosotros</p><ClientsMarquee logos={clientLogos}/></div></section>
  <section className="section section-soft"><div className="container"><div className="section-head"><div><Kicker>Servicios</Kicker><h2>Servicios técnicos para cada etapa del proyecto.</h2><p>Conoce nuestras áreas de trabajo y las soluciones que podemos aportar a tu operación.</p></div><Link className="text-link" href="/servicios/">Ver todos los servicios <ArrowRight size={16}/></Link></div><ServicesCarousel services={services}/></div></section>
  <CertificationsSection/>
  <ProjectsShowcase projects={projects.filter(p=>p.logo).slice(0,3)}/>
  <CTASection/>
 </main>
}