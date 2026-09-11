import { useEffect, useRef } from 'react'
import { animate, stagger, createSpring } from 'animejs'

const NUMBER = /\d[\d,]*/g

function prefersReduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function canHover() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function renderChars(host, text) {
  host.textContent = ''
  for (const ch of text) {
    const span = document.createElement('span')
    span.className = /[^a-z\s]/.test(ch) ? 'ch ch-move' : 'ch'
    span.textContent = ch
    host.appendChild(span)
  }
}

export default function PriceCell({ text, delay = 0 }) {
  const ref = useRef(null)
  const ready = useRef(false)
  const running = useRef(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return

    if (prefersReduced()) {
      renderChars(host, text)
      ready.current = true
      return
    }

    const figures = [...text.matchAll(NUMBER)].map((match) => ({
      value: Number(match[0].replace(/,/g, '')),
      grouped: match[0].includes(',')
    }))

    const write = (progress) => {
      let i = 0
      host.textContent = text.replace(NUMBER, () => {
        const figure = figures[i++]
        const shown = Math.round(figure.value * progress)
        return figure.grouped ? shown.toLocaleString('en-US') : String(shown)
      })
    }

    write(0)

    let played = false
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || played) continue
          played = true
          observer.disconnect()

          const counter = { t: 0 }
          animate(counter, {
            t: 1,
            duration: 1100,
            delay,
            ease: 'out(4)',
            onUpdate: () => write(counter.t),
            onComplete: () => {
              renderChars(host, text)
              ready.current = true
            }
          })
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(host)
    return () => {
      observer.disconnect()
      if (running.current) {
        running.current.pause()
        running.current = null
      }
    }
  }, [text, delay])

  function wave(lifted) {
    const host = ref.current
    if (!host || !ready.current || prefersReduced() || !canHover()) return

    const chars = host.querySelectorAll('.ch-move')
    if (!chars.length) return

    if (running.current) running.current.pause()

    const rise = window.innerWidth <= 700 ? 8 : 11

    running.current = animate(chars, {
      y: lifted ? -rise : 0,
      delay: stagger(32, lifted ? {} : { from: 'last' }),
      ease: createSpring({ stiffness: 230, damping: 15 })
    })
  }

  return (
    <span
      className="price-hit"
      ref={ref}
      onPointerEnter={() => wave(true)}
      onPointerLeave={() => wave(false)}
    />
  )
}
