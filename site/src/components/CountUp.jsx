import { useEffect, useRef } from 'react'
import { animate } from 'animejs'

const NUMBER = /(\d[\d,]*)/

function prefersReduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function CountUp({ text, className, delay = 0, active = true }) {
  const ref = useRef(null)
  const parts = text.split(NUMBER)

  useEffect(() => {
    const root = ref.current
    if (!root || prefersReduced()) return

    const cells = Array.from(root.querySelectorAll('.num'))
    if (!cells.length) return

    const targets = cells.map((el) => {
      const raw = el.dataset.value
      return { el, value: Number(raw.replace(/,/g, '')), grouped: raw.includes(',') }
    })

    targets.forEach(({ el }) => {
      el.textContent = '0'
    })

    if (!active) return

    let played = false
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || played) continue
          played = true
          observer.disconnect()

          targets.forEach(({ el, value, grouped }) => {
            const counter = { v: 0 }
            animate(counter, {
              v: value,
              duration: 1100,
              delay,
              ease: 'out(4)',
              onUpdate: () => {
                const n = Math.round(counter.v)
                el.textContent = grouped ? n.toLocaleString('en-US') : String(n)
              }
            })
          })

          animate(root, {
            y: [10, 0],
            opacity: [0.35, 1],
            duration: 700,
            delay,
            ease: 'out(3)'
          })
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [text, delay, active])

  return (
    <span className={className} ref={ref}>
      {parts.map((part, i) =>
        NUMBER.test(part) && /\d/.test(part) ? (
          <span className="num" key={i} data-value={part}>{part}</span>
        ) : (
          part
        )
      )}
    </span>
  )
}
