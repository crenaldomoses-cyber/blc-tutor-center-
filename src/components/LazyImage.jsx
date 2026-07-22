import { useState } from 'react'

// Lightweight image with a soft blur-up while loading.
export default function LazyImage({ src, alt = '', className = '', ...rest }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`transition-all duration-700 ${
        loaded ? 'blur-0 scale-100' : 'blur-md scale-105'
      } ${className}`}
      {...rest}
    />
  )
}
