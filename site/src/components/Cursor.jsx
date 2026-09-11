import { useEffect } from 'react'
import { animate, createAnimatable, createSpring } from 'animejs'

const INTERACTIVE = 'a, button, .tag-live'
const HIDDEN = '.vcard-media'
const READABLE = 'p, h1, h2, h3, td, th, figcaption, .facts'
const ON_ACCENT = '#contact, .intro'

export default function Cursor() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const layer = document.createElement('div')
    layer.className = 'cursor-layer'
    layer.setAttribute('aria-hidden', 'true')
    layer.innerHTML =
      '<div class="cursor-pos ring-pos"><div class="cursor-ring"></div></div>' +
      '<div class="cursor-pos dot-pos"><div class="cursor-dot"></div></div>'
    document.body.appendChild(layer)
    document.body.classList.add('has-cursor')

    const ringPos = layer.querySelector('.ring-pos')
    const dotPos = layer.querySelector('.dot-pos')
    const ring = layer.querySelector('.cursor-ring')

    const trail = reduced ? 0 : 430
    const lead = reduced ? 0 : 70
    const ringMove = createAnimatable(ringPos, { x: trail, y: trail, ease: 'out(3)' })
    const dotMove = createAnimatable(dotPos, { x: lead, y: lead, ease: 'out(3)' })

    let mode = 'default'
    let overVideo = false

    function setMode(next) {
      if (next === mode) return
      mode = next
      const scale = next === 'active' ? 1.85 : next === 'text' ? 0.5 : 1
      animate(ring, {
        scale,
        ease: reduced ? 'out(2)' : createSpring({ stiffness: 240, damping: 16 }),
        duration: reduced ? 1 : undefined
      })
    }

    function onMove(event) {
      layer.style.opacity = overVideo ? '0' : '1'
      ringMove.x(event.clientX)
      ringMove.y(event.clientY)
      dotMove.x(event.clientX)
      dotMove.y(event.clientY)
    }

    function onOver(event) {
      const el = event.target
      if (!el || !el.closest) return
      layer.classList.toggle('on-accent', !!el.closest(ON_ACCENT))
      overVideo = !!el.closest(HIDDEN)
      document.body.classList.toggle('over-video', overVideo)
      layer.style.opacity = overVideo ? '0' : '1'
      if (overVideo) setMode('default')
      else if (el.closest(INTERACTIVE)) setMode('active')
      else if (el.closest(READABLE)) setMode('text')
      else setMode('default')
    }

    function hide() {
      layer.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
      document.body.classList.remove('has-cursor')
      document.body.classList.remove('over-video')
      layer.remove()
    }
  }, [])

  return null
}
