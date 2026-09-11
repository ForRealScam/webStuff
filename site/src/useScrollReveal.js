import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'

function prefersReduced() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function useScrollReveal(options = {}) {
  const {
    selector = null,
    step = 90,
    shift = 30,
    delay = 0,
    duration = 820,
    threshold = 0.15,
    active = true
  } = options

  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = selector ? Array.from(root.querySelectorAll(selector)) : [root]
    if (!targets.length || prefersReduced()) return

    targets.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = `translateY(${shift}px)`
      el.style.willChange = 'opacity, transform'
    })

    if (!active) return

    let played = false

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || played) continue
          played = true
          observer.disconnect()
          animate(targets, {
            opacity: [0, 1],
            y: [shift, 0],
            duration,
            delay: stagger(step, { start: delay }),
            ease: 'out(3)',
            onComplete: () => {
              targets.forEach((el) => {
                el.style.willChange = ''
                el.style.transform = ''
              })
            }
          })
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' }
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [selector, step, shift, delay, duration, threshold, active])

  return ref
}
