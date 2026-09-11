import { useEffect, useRef, useState } from 'react'

export default function VideoCard({ item }) {
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
    if (!el) return
    setActive(true)
    el.muted = false
    el.controls = true
    el.play().catch(() => {})
    if (!touch && el.requestFullscreen) el.requestFullscreen().catch(() => {})
  }

  const hint = touch ? 'Tap to play with sound' : 'Hover to play · click for sound'

  return (
    <figure className="vcard">
      <div className="vcard-media" onMouseEnter={enter} onMouseLeave={leave}>
        {item.src ? (
          <>
            <video
              ref={ref}
              src={item.src}
              muted
              loop
              playsInline
              preload="metadata"
              onClick={open}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            {!playing && (
              <svg className="vcard-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            )}
            {!active && <span className="vcard-badge">{hint}</span>}
          </>
        ) : (
          <>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
            <span className="vcard-badge">Demo recording soon</span>
          </>
        )}
      </div>
      <figcaption className="vcard-cap">
        <span className="vcard-n">0{item.n}</span>
        <span>
          <strong className="vcard-title">{item.title}</strong>
          <span className="vcard-desc">{item.desc}</span>
        </span>
        <span className="tag tag-neutral">{item.tag}</span>
      </figcaption>
    </figure>
  )
}
