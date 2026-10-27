"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Send } from "lucide-react";
import { services } from "@/lib/content";

const serviceOptions = [...services.map(s => s.name), "Otro / asesoría inicial"];

// Da formato +56 9 XXXX XXXX mientras se escribe. Se quitan el código país y el 9 del prefijo y se
// conservan los últimos 8 dígitos, así "912345678" o "+56912345678" escritos sobre el prefijo quedan bien.
function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("569")) d = d.slice(3);
  else if (d.startsWith("56")) d = d.slice(2);
  if (d.length > 8) d = d.slice(-8);
  if (!d) return raw.trim() === "" ? "" : "+56 9 ";
  return `+56 9 ${d.slice(0, 4)}${d.length > 4 ? " " + d.slice(4) : ""}`;
}

function ServiceSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();
  const listId = `${id}-list`;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const choose = (i: number) => { onChange(serviceOptions[i]); setOpen(false); };
  const onKey = (e: React.KeyboardEvent) => {
    if (!open && ["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault(); setActive(Math.max(0, serviceOptions.indexOf(value))); setOpen(true); return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, serviceOptions.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(serviceOptions.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(active); }
    else if (e.key === "Escape" || e.key === "Tab") setOpen(false);
  };

  return <div className={`cselect${open ? " open" : ""}`} ref={root}>
    <button type="button" id={`${id}-btn`} className="cselect-trigger" aria-haspopup="listbox" aria-expanded={open} aria-controls={listId}
      aria-labelledby={`cta-service-label ${id}-btn`} aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
      onClick={() => { setActive(Math.max(0, serviceOptions.indexOf(value))); setOpen(o => !o); }} onKeyDown={onKey}>
      <span className={value ? undefined : "cselect-placeholder"}>{value || "Selecciona un servicio"}</span>
      <ChevronDown size={18} className="cselect-chevron" />
    </button>
    <ul id={listId} role="listbox" className="cselect-list" aria-labelledby="cta-service-label">
      {serviceOptions.map((opt, i) => <li key={opt} id={`${id}-opt-${i}`} role="option" aria-selected={opt === value}
        className={i === active ? "active" : undefined} onMouseEnter={() => setActive(i)} onMouseDown={e => e.preventDefault()} onClick={() => choose(i)}>
        <span>{opt}</span>{opt === value && <Check size={16} />}
      </li>)}
    </ul>
    <input type="hidden" name="service" value={value} />
  </div>;
}

export function CtaContactForm({ defaultService = "" }: { defaultService?: string }) {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(defaultService);

  if (sent) return <div className="cta-form cta-form-sent" role="status">
    <span className="cta-sent-icon"><Check size={28} /></span>
    <h3>¡Gracias por escribirnos!</h3>
    <p>Recibimos tu mensaje. Nuestro equipo te contactará a la brevedad.</p>
    <button type="button" className="button button-outline" onClick={() => { setSent(false); setPhone(""); setService(defaultService); }}>Enviar otro mensaje</button>
  </div>;

  return <form className="cta-form" onSubmit={e => { e.preventDefault(); setSent(true); }}>
    <h3>Escríbenos</h3>
    <div className="form-grid">
      <div className="field"><label htmlFor="cta-name">Nombre *</label><input id="cta-name" name="name" required autoComplete="name" placeholder="Tu nombre" /></div>
      <div className="field"><label htmlFor="cta-email">Correo *</label><input id="cta-email" name="email" type="email" required autoComplete="email" placeholder="nombre@empresa.cl" /></div>
      <div className="field"><label htmlFor="cta-phone">Teléfono *</label><input id="cta-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+56 9 XXXX XXXX"
        value={phone} onChange={e => setPhone(formatPhone(e.target.value))} onFocus={() => { if (!phone) setPhone("+56 9 "); }} onBlur={() => { if (phone.trim() === "+56 9") setPhone(""); }}
        pattern="\+56 9 \d{4} \d{4}" title="Formato: +56 9 XXXX XXXX" /></div>
      <div className="field"><label htmlFor="cta-company">Empresa <span className="field-optional">(opcional)</span></label><input id="cta-company" name="company" autoComplete="organization" placeholder="Nombre de la empresa" /></div>
      <div className="field field-full"><label id="cta-service-label">Servicio</label><ServiceSelect value={service} onChange={setService} /></div>
      <div className="field field-full"><label htmlFor="cta-message">Mensaje</label><textarea id="cta-message" name="message" placeholder="Cuéntanos brevemente sobre tu proyecto." /></div>
    </div>
    <button className="button button-red cta-submit" type="submit">Enviar mensaje <Send size={17} /></button>
  </form>;
}
