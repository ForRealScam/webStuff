import { useState } from 'react'

export default function YouTubeEmbed({ id, title }) {
  const [active, setActive] = useState(false)

  function onKey(event) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    setActive(true)
  }

  if (active) {
    return (
      <div className="vcard-media">
        <iframe
          className="yt-frame"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div
      className="vcard-media"
      role="button"
      tabIndex={0}
      aria-label={`Play ${title} on YouTube`}
      onClick={() => setActive(true)}
      onKeyDown={onKey}
    >
      <img
        className="yt-thumb"
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt=""
        loading="lazy"
      />
      <span className="yt-shade" aria-hidden="true" />
      <svg className="vcard-play" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <polygon points="6 3 20 12 6 21 6 3" />
      </svg>
    </div>
  )
}
