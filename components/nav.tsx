"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Mail, Menu, MessageSquareText, Phone, X } from "lucide-react";
import { services } from "@/lib/content";

const isActive = (pathname: string, href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, ""));

// Lleva al formulario de contacto al final de la página (#contacto) con desplazamiento suave.
// Si la página no lo tiene, el enlace sigue a /contacto/.
function scrollToContact(e: React.MouseEvent, delay = 0) {
  if (!document.getElementById("contacto")) return false;
  e.preventDefault();
  window.setTimeout(() => {
    const el = document.getElementById("contacto");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => el.querySelector<HTMLInputElement>("input:not([type=hidden])")?.focus({ preventScroll: true }), reduce ? 0 : 700);
  }, delay);
  return true;
}

export function ContactLink({ className, children, onNavigate, delay }: { className?: string; children: React.ReactNode; onNavigate?: () => void; delay?: number }) {
  return <Link className={className} href="/contacto/" onClick={e => { scrollToContact(e, delay); onNavigate?.(); }}>{children}</Link>;
}

function MegaMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <div className={`mega${open ? " open" : ""}`} id="mega-servicios">
    <div className="container mega-inner">
      <div className="mega-intro">
        <span className="mega-label">Servicios</span>
        <p className="mega-title">Soluciones técnicas para cada etapa del proyecto.</p>
        <p className="mega-text">Topografía, geología, geodesia, aerofotogrametría y batimetría para minería, ingeniería y construcción.</p>
        <Link className="mega-all" href="/servicios/" onClick={onClose}>Ver todos los servicios <ArrowRight size={18} /></Link>
      </div>
      <ul className="mega-grid">
        {services.map(s => <li key={s.slug}>
          <Link className="mega-item" href={`/servicios/${s.slug}/`} onClick={onClose}>
            <span className="mega-thumb" style={{ backgroundImage: `url("${s.image}")` }} />
            <span className="mega-item-text"><strong>{s.name}</strong><small>{s.short}</small></span>
            <ArrowUpRight size={18} className="mega-item-arrow" />
          </Link>
        </li>)}
        <li>
          <ContactLink className="mega-item mega-cta" onNavigate={onClose}>
            <span className="mega-cta-icon"><MessageSquareText size={22} /></span>
            <span className="mega-item-text"><strong>¿Necesitas una cotización?</strong><small>Cuéntanos tu proyecto y te respondemos a la brevedad.</small></span>
            <ArrowRight size={18} className="mega-item-arrow" />
          </ContactLink>
        </li>
      </ul>
    </div>
  </div>;
}

export function DesktopNav() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const wrap = useRef<HTMLDivElement>(null);
  const skipFocusOpen = useRef(false);
  const cls = (href: string) => isActive(pathname, href) ? "active" : undefined;

  useEffect(() => { setMegaOpen(false); }, [pathname]);
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setMegaOpen(false); skipFocusOpen.current = true; wrap.current?.querySelector<HTMLElement>(".nav-mega-trigger")?.focus(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  // Pequeña espera al salir para que el menú no se cierre al cruzar el borde con el mouse
  const show = () => { window.clearTimeout(closeTimer.current); setMegaOpen(true); };
  const hide = () => { window.clearTimeout(closeTimer.current); closeTimer.current = window.setTimeout(() => setMegaOpen(false), 120); };

  return <nav className="desktop-nav" aria-label="Principal">
    <Link className={cls("/")} href="/">Inicio</Link>
    <Link className={cls("/nosotros/")} href="/nosotros/">Nosotros</Link>
    <div className="nav-mega" ref={wrap} onMouseEnter={show} onMouseLeave={hide}
      onFocus={() => { if (skipFocusOpen.current) { skipFocusOpen.current = false; return; } show(); }} onBlur={e => { if (!wrap.current?.contains(e.relatedTarget as Node)) hide(); }}>
      <Link className={`nav-mega-trigger${cls("/servicios/") ? " active" : ""}`} href="/servicios/" aria-expanded={megaOpen} aria-controls="mega-servicios">
        Servicios <ChevronDown size={16} className="nav-chevron" />
      </Link>
      <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
    </div>
    <Link className={cls("/proyectos/")} href="/proyectos/">Proyectos</Link>
    <Link className={cls("/contacto/")} href="/contacto/">Contacto</Link>
  </nav>;
}

export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [open]);
  const close = () => setOpen(false);
  const cls = (href: string) => isActive(pathname, href) ? "active" : undefined;
  return <>
    <button className="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><Menu size={28}/></button>
    <div id="mobile-menu" className={`mobile-overlay${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Menú" hidden={!open}>
      <div className="mobile-overlay-head">
        <Link href="/" onClick={close} aria-label="INTOSIM Inicio"><Image className="brand-logo" src="/logo-intosim.png" alt="INTOSIM" width={583} height={341}/></Link>
        <button className="menu-toggle" type="button" aria-label="Cerrar menú" onClick={close}><X size={30}/></button>
      </div>
      <nav className="mobile-links" aria-label="Principal">
        <Link className={cls("/")} href="/" onClick={close}>Inicio</Link>
        <Link className={cls("/nosotros/")} href="/nosotros/" onClick={close}>Nosotros</Link>
        <Link className={cls("/servicios/")} href="/servicios/" onClick={close}>Servicios</Link>
        <div className="mobile-sub">{services.map(s => <Link key={s.slug} href={`/servicios/${s.slug}/`} onClick={close}>{s.name}</Link>)}</div>
        <Link className={cls("/proyectos/")} href="/proyectos/" onClick={close}>Proyectos</Link>
        <Link className={cls("/contacto/")} href="/contacto/" onClick={close}>Contacto</Link>
      </nav>
      <div className="mobile-overlay-foot">
        {/* Se espera a que se cierre el menú (y se libere el scroll) antes de desplazarse */}
        <ContactLink className="button button-red" onNavigate={close} delay={60}>Solicitar cotización <ArrowUpRight size={18}/></ContactLink>
        <a href="tel:+56932120407"><Phone size={16}/> +56 9 3212 0407</a>
        <a href="mailto:contacto@intosim.cl"><Mail size={16}/> contacto@intosim.cl</a>
      </div>
    </div>
  </>;
}
