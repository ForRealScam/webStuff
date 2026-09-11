import { useEffect, useState } from 'react'

const NAME = 'amacow'
const HOLD_MS = 2200
const LIFT_MS = 720

export default function Intro({ onDone }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    document.body.classList.add('intro-lock')
    let liftTimer
    const holdTimer = setTimeout(() => {
      setLeaving(true)
      liftTimer = setTimeout(finish, LIFT_MS)
    }, HOLD_MS)

    function finish() {
      document.body.classList.remove('intro-lock')
      onDone()
    }

    function skip(event) {
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Escape') return
      clearTimeout(holdTimer)
      clearTimeout(liftTimer)
      setLeaving(true)
      liftTimer = setTimeout(finish, LIFT_MS)
    }

    window.addEventListener('pointerdown', skip)
    window.addEventListener('keydown', skip)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(liftTimer)
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
      document.body.classList.remove('intro-lock')
    }
  }, [onDone])

  return (
    <div className={leaving ? 'intro is-leaving' : 'intro'} aria-hidden="true">
      <div className="intro-name">
        {NAME.split('').map((letter, i) => (
          <span key={i} style={{ animationDelay: `${i * 70}ms` }}>{letter}</span>
        ))}
      </div>
      <div className="intro-rule" />
      <div className="intro-sub">Roblox scripter</div>
    </div>
  )
}
