import { useCallback, useState } from 'react'
import useScrollReveal from './useScrollReveal.js'
import TagRow from './components/TagRow.jsx'
import Cursor from './components/Cursor.jsx'
import CountUp from './components/CountUp.jsx'
import PriceCell from './components/PriceCell.jsx'
import Intro from './components/Intro.jsx'
import VideoCard from './components/VideoCard.jsx'
import { videos, tiers, stats, specialties, DISCORD } from './data.js'

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [copied, setCopied] = useState(false)
  const finishIntro = useCallback(() => setIntroDone(true), [])

  const statsRef = useScrollReveal({ selector: ':scope > div', step: 80, active: introDone })
  const workHeadRef = useScrollReveal({ selector: ':scope > *', step: 70 })
  const workGridRef = useScrollReveal({ selector: ':scope > *', step: 90, shift: 36 })
  const aboutRef = useScrollReveal({ selector: ':scope > div', step: 110 })
  const priceHeadRef = useScrollReveal({ selector: ':scope > *', step: 70 })
  const priceRowsRef = useScrollReveal({ selector: 'tbody tr', step: 70, shift: 18 })
  const contactRef = useScrollReveal({ selector: ':scope > *', step: 110 })

  function copyName() {
    try {
      navigator.clipboard && navigator.clipboard.writeText('amacow')
    } catch (e) {}
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <>
      <Cursor />
      {!introDone && <Intro onDone={finishIntro} />}

      <div className="page">
        <nav className="nav">
          <span className="nav-brand">amacow</span>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <a href={DISCORD} className="btn btn-primary">Message on Discord</a>
        </nav>

        <div className="pad">
          <section className={introDone ? 'hero reveal' : 'hero'}>
            <h1>
              <span className="hero-line"><span>Roblox systems</span></span>
              <span className="hero-line"><span>that ship.</span></span>
            </h1>
            <p className="hero-lede">
              Luau scripter with 5 years of experience. Combat, data saving, UI, simulators,
              vehicles, anti-cheat, monetization. Third-year university student; available for
              commissions.
            </p>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">Watch the demos</a>
              <a href="#pricing" className="btn btn-ghost">See pricing</a>
            </div>
          </section>

          <hr className="hr" />

          <section className="stats" ref={statsRef}>
            {stats.map((s, i) => (
              <div key={s.label}>
                <p className="stat-num"><CountUp text={s.value} delay={i * 90} active={introDone} /></p>
                <p className="stat-label">{s.label}</p>
              </div>
            ))}
          </section>

          <hr className="hr" />

          <section id="work" className="section">
            <div className="sec-head" ref={workHeadRef}>
              <span className="kicker">Work — demo videos</span>
              <h2>Four systems, recorded in Studio.</h2>
            </div>
            <div className="vgrid" ref={workGridRef}>
              {videos.map((v) => <VideoCard key={v.n} item={v} />)}
              <div className="vgrid-tail">
                <span className="kicker" style={{ marginBottom: 0 }}>Also scripted</span>
                <TagRow items={specialties} />
              </div>
            </div>
          </section>

          <hr className="hr" />

          <section id="about" className="split" ref={aboutRef}>
            <div>
              <span className="kicker">About</span>
              <h2 style={{ margin: 0 }}>Five years in Luau. Still a student.</h2>
            </div>
            <div style={{ fontSize: '15.5px', lineHeight: '28px', color: 'var(--color-neutral-800)' }}>
              <p style={{ margin: '0 0 28px' }}>
                I have 5 years of experience scripting on Roblox and I am a 3rd year university
                student. I build server-authoritative systems with clean module boundaries, so what
                I hand over is readable and easy to extend.
              </p>
              <div className="facts">
                <div><span>Language</span><br />Luau, Roblox Studio</div>
                <div><span>Tooling</span><br />Rojo, Git, Knit / custom frameworks</div>
                <div><span>Delivery</span><br />Source in your place, documented</div>
                <div><span>Payment</span><br />Money, or Robux — no percentage of the game</div>
              </div>
            </div>
          </section>

          <hr className="hr" />

          <section id="pricing" className="section">
            <div className="sec-head" ref={priceHeadRef}>
              <span className="kicker">Pricing — per system</span>
              <h2>Priced by scope, not by the hour. Systems, not full games.</h2>
            </div>
            <div className="table-wrap" ref={priceRowsRef}>
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>Tier</th>
                    <th>What fits</th>
                    <th style={{ width: '16%' }}>Turnaround</th>
                    <th style={{ width: '14%', textAlign: 'right' }}>USD</th>
                    <th style={{ width: '16%', textAlign: 'right' }}>Or in Robux</th>
                  </tr>
                </thead>
                <tbody>
                  {tiers.map((t, i) => (
                    <tr key={t.name}>
                      <td className="t-name">{t.name}</td>
                      <td data-label="What fits" style={{ color: 'var(--color-neutral-800)' }}>{t.fits}</td>
                      <td data-label="Turnaround" style={{ color: 'var(--color-neutral-800)' }}>{t.time}</td>
                      <td data-label="USD" className="t-usd">
                        <PriceCell text={t.price} delay={i * 90} />
                      </td>
                      <td data-label="Or in Robux" className="t-rbx">
                        <PriceCell text={t.robux} delay={i * 90 + 60} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-neutral-700)', margin: '16px 0 0' }}>
              Systems only — I do not script full games. Robux is an alternative to USD on every
              tier, paid by group payout — debugging from 1K, simple scripts 1K to 15K. Never a
              percentage of the game. Half up front, half on delivery; revisions within scope
              included.
            </p>
          </section>
        </div>

        <section id="contact" className="contact" ref={contactRef}>
          <h3>Message me on Discord.</h3>
          <div className="close-grid">
            <div>
              <span className="close-label">Username</span>
              <span className="close-value">amacow</span>
            </div>
            <div>
              <span className="close-label">Server</span>
              <a href={DISCORD} className="close-value">discord.gg/EVxxN9jFKj</a>
            </div>
            <div className="close-actions">
              <button type="button" className="btn" onClick={copyName}>
                {copied ? 'Copied' : 'Copy username'}
              </button>
              <a href={DISCORD} className="btn">Join the server</a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <span>amacow · Roblox scripter</span>
          <span>Discord is the only contact channel.</span>
        </footer>
      </div>
    </>
  )
}
