import Image from "next/image";
import Link from "next/link";
import { ContactLink, DesktopNav, MobileMenu } from "@/components/nav";
import { ArrowUpRight, MapPin, Phone, Mail, Linkedin, Instagram, Facebook } from "lucide-react";

const services: (readonly [string, string])[] = [
  ["Topografía", "/servicios/topografia/"], ["Geología", "/servicios/geologia/"],
  ["Geodesia", "/servicios/geodesia/"], ["Aerofotogrametría", "/servicios/aerofotogrametria/"],
  ["Batimetría", "/servicios/batimetria/"]
];

export function SiteHeader() {
  return <>
    <div className="topbar"><div className="container topbar-inner"><span>Soluciones técnicas para proyectos de alta exigencia</span><div><a href="mailto:contacto@intosim.cl"><Mail size={13}/> contacto@intosim.cl</a><a href="tel:+56932120407"><Phone size={13}/> +56 9 3212 0407</a></div></div></div>
    <header className="header"><div className="container nav">
      <Link href="/" className="brand" aria-label="INTOSIM Inicio"><Image className="brand-logo" src="/logo-intosim.png" alt="INTOSIM" width={583} height={341} priority/></Link>
      <DesktopNav/>
      <ContactLink className="button button-red nav-cta">Solicitar cotización <ArrowUpRight size={16}/></ContactLink>
      <MobileMenu/>
    </div></header>
  </>;
}
export function SiteFooter() {
  return <footer className="footer"><div className="container footer-main">
    <div className="footer-brand"><Link href="/" className="brand brand-light" aria-label="INTOSIM Inicio"><Image className="brand-logo" src="/logo-intosim.png" alt="INTOSIM" width={583} height={341}/></Link><p>Soluciones técnicas y servicios especializados para proyectos de minería, ingeniería y construcción.</p><div className="socials"><a href="https://www.linkedin.com/in/servicios-intosim-spa-494b71100/" aria-label="LinkedIn"><Linkedin/></a><a href="https://www.instagram.com/intosimchile/" aria-label="Instagram"><Instagram/></a><a href="https://www.facebook.com/share/14ex4tG2GSi/" aria-label="Facebook"><Facebook/></a></div></div>
    <div><h4>Explorar</h4><Link href="/nosotros/">Nosotros</Link><Link href="/servicios/">Servicios</Link><Link href="/proyectos/">Proyectos</Link><Link href="/trabaja-con-nosotros/">Trabaja con nosotros</Link></div>
    <div><h4>Especialidades</h4>{services.map(([n,u])=><Link href={u} key={u}>{n}</Link>)}</div>
    <div><h4>Contacto</h4><p><MapPin/> Juan José Latorre #1689, Cía. Baja, La Serena, Chile</p><a href="tel:+56932120407"><Phone/> +56 9 3212 0407</a><a href="mailto:contacto@intosim.cl"><Mail/> contacto@intosim.cl</a><Link className="footer-cta" href="/contacto/">Hablemos de tu proyecto <ArrowUpRight size={15}/></Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Servicios Intosim SpA. Todos los derechos reservados.</span><span>La Serena · Región de Coquimbo · Chile</span></div></footer>;
}