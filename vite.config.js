import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { SITE_URL, SITE_NAME, OG_IMAGE, OG_IMAGE_ALT, pages } from './src/data/seo.js'

const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const headFor = (path) => {
  const { title, description } = pages[path]
  const url = SITE_URL + path
  const t = escape(title)
  const d = escape(description)
  return `<!-- seo:start -->
  <title>${t}</title>
  <meta name="description" content="${d}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:locale" content="en_ZA" />
  <meta property="og:title" content="${t}" />
  <meta property="og:description" content="${d}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${SITE_URL + OG_IMAGE}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="${escape(OG_IMAGE_ALT)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${t}" />
  <meta name="twitter:description" content="${d}" />
  <meta name="twitter:image" content="${SITE_URL + OG_IMAGE}" />
  <!-- seo:end -->`
}

// Injects per-page meta tags and, on build, writes one HTML file per route
// (e.g. dist/programmes.html) so crawlers and link previews see the right tags
// without running JavaScript. Also emits robots.txt and sitemap.xml.
function seoPages() {
  return {
    name: 'seo-pages',
    transformIndexHtml: (html) => html.replace('<!-- seo -->', headFor('/')),
    writeBundle({ dir }) {
      const write = (file, source) => writeFileSync(resolve(dir, file), source)
      const index = readFileSync(resolve(dir, 'index.html'), 'utf8')
      for (const path of Object.keys(pages)) {
        if (path === '/') continue
        write(`${path.slice(1)}.html`, index.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/, headFor(path)))
      }
      write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
      const urls = Object.keys(pages)
        .map((p) => `  <url><loc>${SITE_URL + p}</loc></url>`)
        .join('\n')
      write(
        'sitemap.xml',
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoPages()],
  build: {
    outDir: 'dist',
  },
})
