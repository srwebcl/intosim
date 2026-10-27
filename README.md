# INTOSIM — Sitio web

Sitio corporativo de **Servicios Intosim SpA**: servicios técnicos de topografía, geología, geodesia, aerofotogrametría y batimetría para minería, ingeniería y construcción.

## Tecnología

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript
- CSS propio en `app/globals.css` (sin frameworks de estilos)
- Íconos: [lucide-react](https://lucide.dev/)
- Fuentes Manrope y DM Sans servidas con `next/font`

## Desarrollo

Requiere Node.js 18.18 o superior.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build
npm run typecheck  # verificación de tipos
```

## Estructura

```
app/                 Páginas (App Router), estilos globales, favicon, sitemap y robots
  servicios/[slug]/  Página de cada servicio (generada desde lib/content.ts)
components/          Componentes compartidos (navegación, formularios, carruseles, etc.)
lib/content.ts       Contenido editable: servicios, proyectos y logos de clientes
public/              Imágenes (WebP), logos de clientes y certificaciones
```

## Editar contenido

Los servicios, proyectos y clientes se administran en `lib/content.ts`:

- **Servicios:** nombre, descripciones, aplicaciones, entregables e imágenes.
- **Proyectos:** nombre, cliente, logo, especialidad, descripción y galería.
- **Logos de clientes:** `clientLogos` (archivos en `public/logos/`).

Las imágenes nuevas conviene agregarlas en formato WebP, con un ancho máximo de 1920 px.

## Formularios

Los formularios de contacto y postulación validan los datos en el navegador, pero **todavía no están conectados a un servicio de envío**. Antes de publicar hay que integrarlos con un endpoint (por ejemplo, un Route Handler de Next.js con un proveedor de correo).

## Despliegue

Pensado para desplegarse en [Vercel](https://vercel.com/). No requiere variables de entorno por ahora.
