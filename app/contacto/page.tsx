import type {Metadata} from "next";
import { Suspense } from "react";
import { ContactPageContent } from "@/components/contact-page";
export const metadata:Metadata={title:"Contacto y cotizaciones",description:"Contacta a INTOSIM y solicita una cotización para servicios técnicos."};
export default function Contacto(){return <Suspense fallback={<div className="section container">Cargando formulario…</div>}><ContactPageContent/></Suspense>}