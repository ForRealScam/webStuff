import { useEffect, useRef, useState } from 'react'

export default function CaseRow({ item }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [touch, setTouch] = useState(false)

  useEffect(() => {
    setTouch(!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  function enter() {
    const el = ref.current
    if (!el || active || touch) return
    el.play().catch(() => {})
  }

  function leave() {
    const el = ref.current
    if (!el || active || touch) return
    el.pause()
    el.currentTime = 0
  }

  function open() {
    const el = ref.current
    if (!el || active) return
    setActive(true)
    el.muted = false
    el.controls = true
    el.play().catch(() => {})
  }

  function onKey(event) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    open()
  }

  const trigger = !active
    ? { role: 'button', tabIndex: 0, 'aria-label': `Play ${item.title} demo with sound`, onClick: open, onKeyDown: onKey }
    : {}

  return (
    <article className="case">
      <div className="vcard-media" onMouseEnter={enter} onMouseLeave={leave} {...trigger}>
        <video
          ref={ref}
          src={item.src + '#t=0.1'}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {!playing && (
          <svg className="vcard-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        )}
      </div>
      <div className="case-body">
        <span className="case-tag">{item.tag}</span>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
        <ul className="case-points">
          {item.points.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </div>
    </article>
  )
}
