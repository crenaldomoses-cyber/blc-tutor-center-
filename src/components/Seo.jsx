import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, pageMeta } from '../data/seo'

const setMeta = (selector, value) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(selector.startsWith('link') ? 'href' : 'content', value)
}

// Keeps the document head in sync with the current route during client-side navigation.
export default function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const path = pathname.replace(/\/+$/, '') || '/'
    const { title, description } = pageMeta(path)
    const url = SITE_URL + (path === '/' ? '/' : path)

    document.title = title
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
    setMeta('link[rel="canonical"]', url)
  }, [pathname])

  return null
}
