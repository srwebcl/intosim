"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Títulos que entran palabra por palabra (el título del hero del home ya trae sus propias palabras)
const TITLES = "main h2, .sd-hero h1";
// Elementos que acompañan al título y entran con un fundido hacia arriba
const FADES = [
  ".kicker", ".sd-crumbs", ".sd-hero p", ".sd-hero-actions",
  ".section-head p", ".section-intro", ".sd-lead", ".about-intro", ".pl-head p", ".ns-team-head p", ".ns-quote",
  ".showcase-head p", ".certs-head p", ".cta-info > p", ".sd-apps-side > p", ".ct-lead",
].join(", ");

// Envuelve cada palabra en <span class="rw"><span>…</span></span>. Solo se aplica a títulos de texto plano,
// para no tocar nodos que React pueda actualizar.
function splitWords(el: HTMLElement) {
  if (el.dataset.rv) return;
  el.dataset.rv = "1";
  if ([...el.childNodes].some(n => n.nodeType !== Node.TEXT_NODE)) { el.classList.add("rv-fade"); return; }
  const words = (el.textContent ?? "").trim().split(/\s+/);
  el.textContent = "";
  words.forEach((w, i) => {
    const outer = document.createElement("span"); outer.className = "rw";
    const inner = document.createElement("span"); inner.textContent = w; inner.style.setProperty("--d", String(i));
    outer.append(inner); el.append(outer);
    if (i < words.length - 1) el.append(" ");
  });
  el.setAttribute("aria-label", words.join(" "));
  el.classList.add("rv-split");
}

export function Reveal() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("rv-ok");
    if (!root.classList.contains("js-rv")) return;

    const io = new IntersectionObserver(entries => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("rv-in"); io.unobserve(e.target); }
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

    const scan = () => {
      document.querySelectorAll<HTMLElement>(TITLES).forEach(el => { if (!el.closest(".hero")) splitWords(el); });
      document.querySelectorAll<HTMLElement>(FADES).forEach(el => { if (!el.closest(".hero") && !el.dataset.rv) { el.dataset.rv = "1"; el.classList.add("rv-fade"); } });
      // También los ya preparados que quedaron pendientes si el efecto se reinició antes de que aparecieran
      document.querySelectorAll(".rv-split:not(.rv-in), .rv-fade:not(.rv-in)").forEach(el => io.observe(el));
    };
    scan();
    // Contenido que se monta después (p. ej. páginas que se completan en el navegador)
    let raf = 0;
    const mo = new MutationObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(scan); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); cancelAnimationFrame(raf); };
  }, [pathname]);
  return null;
}

// Se ejecuta antes de pintar: oculta los elementos que se animarán (sin JavaScript o con "reducir movimiento", todo queda visible).
// Si el script de React no llega a iniciarse, a los 2,5 s se muestra todo igual.
export const revealBootScript = `(function(){var d=document.documentElement;if(window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("js-rv");setTimeout(function(){if(!d.classList.contains("rv-ok"))d.classList.remove("js-rv")},2500)})();`;
