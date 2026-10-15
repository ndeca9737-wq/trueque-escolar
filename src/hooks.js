import { useEffect, useRef, useState } from 'react'

export function useReveal() {
  const ref = useRef(null)
  const [visto, setVisto] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setVisto(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisto(true); io.disconnect() } }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, visto]
}

export const irA = (id, foco) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  if (foco) setTimeout(() => document.getElementById(foco)?.focus({ preventScroll: true }), 600)
}

// Generador pseudoaleatorio fijo (para que las ilustraciones no cambien en cada render)
export const azar = (semilla) => { let s = semilla; return () => ((s = (s * 16807) % 2147483647) / 2147483647) }
