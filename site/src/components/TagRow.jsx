import { useEffect, useRef } from 'react'
import { animate, stagger, createSpring } from 'animejs'

function prefersReduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function TagRow({ items }) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root || prefersReduced()) return

    const tags = Array.from(root.children)
    tags.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'scale(0.8)'
    })

    let played = false
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || played) continue
          played = true
          observer.disconnect()
          animate(tags, {
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: stagger(55),
            ease: createSpring({ stiffness: 160, damping: 12 })
          })
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  function lift(event) {
    if (prefersReduced()) return
    animate(event.currentTarget, {
      scale: 1.09,
      y: -4,
      ease: createSpring({ stiffness: 340, damping: 11 })
    })
  }

  function drop(event) {
    if (prefersReduced()) return
    animate(event.currentTarget, {
      scale: 1,
      y: 0,
      ease: createSpring({ stiffness: 200, damping: 16 })
    })
  }

  return (
    <div className="tag-row" ref={ref}>
      {items.map((label) => (
        <span
          key={label}
          className="tag tag-outline tag-live"
          onMouseEnter={lift}
          onMouseLeave={drop}
        >
          {label}
        </span>
      ))}
    </div>
  )
}
