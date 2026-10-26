import { useCallback, useState } from 'react'
import useScrollReveal from './useScrollReveal.js'
import TagRow from './components/TagRow.jsx'
import Cursor from './components/Cursor.jsx'
import CountUp from './components/CountUp.jsx'
import PriceCell from './components/PriceCell.jsx'
import Intro, { shouldPlayIntro } from './components/Intro.jsx'
import VideoCard from './components/VideoCard.jsx'
import YouTubeEmbed from './components/YouTubeEmbed.jsx'
import { videos, tiers, stats, specialties, shipped, steps, faq, testimonials, DISCORD } from './data.js'

export default function App() {
  const [introDone, setIntroDone] = useState(() => !shouldPlayIntro())
  const [copied, setCopied] = useState(false)
  const finishIntro = useCallback(() => setIntroDone(true), [])

  const statsRef = useScrollReveal({ selector: ':scope > div', step: 80, active: introDone })
  const shippedRef = useScrollReveal({ selector: ':scope > div', step: 110 })
  const workHeadRef = useScrollReveal({ selector: ':scope > *', step: 70 })
  const workGridRef = useScrollReveal({ selector: ':scope > *', step: 90, shift: 36 })
  const aboutRef = useScrollReveal({ selector: ':scope > div', step: 110 })
  const stepsHeadRef = useScrollReveal({ selector: ':scope > *', step: 70 })
  const stepsRef = useScrollReveal({ selector: ':scope > li', step: 90, shift: 24 })
  const priceHeadRef = useScrollReveal({ selector: ':scope > *', step: 70 })
  const priceRowsRef = useScrollReveal({ selector: 'tbody tr', step: 70, shift: 18 })
  const faqHeadRef = useScrollReveal({ selector: ':scope > *', step: 70 })
  const faqRef = useScrollReveal({ selector: ':scope > details', step: 60, shift: 18 })
  const quotesRef = useScrollReveal({ selector: ':scope > *', step: 90 })
  const contactRef = useScrollReveal({ selector: ':scope > *', step: 110 })

  async function copyName() {
    try {
      await navigator.clipboard.writeText('amacow')
    } catch (e) {
      return
    }
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
          <div className="nav-links">
            <a href="#floors">Floors</a>
            <a href="#work">Work</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
          <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Message on Discord</a>
        </nav>

        <div className="pad">
          <section className={introDone ? 'hero reveal' : 'hero'}>
            <h1>
              <span className="hero-line"><span>Roblox systems</span></span>
              <span className="hero-line"><span>that ship.</span></span>
            </h1>
            <p className="hero-lede">
              Luau scripter with 5 years of experience and AI work on Floors. Combat, data
              saving, UI, simulators, vehicles, anti-cheat, monetization. Third-year university student; available for
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

          <section id="floors" className="split shipped" ref={shippedRef}>
            <div>
              <span className="kicker">Shipped work</span>
              <h2>{shipped.name}</h2>
              <p className="shipped-role">{shipped.role}</p>
              <p className="shipped-desc">{shipped.desc}</p>
              <TagRow items={shipped.points} />
              {shipped.url && (
                <a href={shipped.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost shipped-link">
                  Play on Roblox
                </a>
              )}
            </div>
            <div>
              <YouTubeEmbed id={shipped.youtube} title={`${shipped.name} gameplay`} />
            </div>
          </section>

          <hr className="hr" />

          <section id="work" className="section">
            <div className="sec-head" ref={workHeadRef}>
              <span className="kicker">Work — demo videos</span>
              <h2>Six systems, recorded in Studio.</h2>
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

          <section id="process" className="section">
            <div className="sec-head" ref={stepsHeadRef}>
              <span className="kicker">How it works</span>
              <h2>From brief to delivery in four steps.</h2>
            </div>
            <ol className="steps" ref={stepsRef}>
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className="vcard-n">0{i + 1}</span>
                  <strong className="step-title">{s.title}</strong>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
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
              tier, paid by group payout, and never a percentage of the game.
            </p>
          </section>

          <hr className="hr" />

          <section id="faq" className="section">
            <div className="sec-head" ref={faqHeadRef}>
              <span className="kicker">FAQ</span>
              <h2>Before you message.</h2>
            </div>
            <div className="faq" ref={faqRef}>
              {faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {testimonials.length > 0 && (
            <>
              <hr className="hr" />
              <section className="section">
                <span className="kicker">Clients</span>
                <h2>What people say.</h2>
                <div className="quotes" ref={quotesRef}>
                  {testimonials.map((t) => (
                    <blockquote className="quote" key={t.who}>
                      <p>“{t.quote}”</p>
                      <footer>
                        <strong>{t.who}</strong>
                        {t.context && <span> · {t.context}</span>}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>

        <section id="contact" className="contact" ref={contactRef}>
          <h3>Message me on Discord.</h3>
          <div className="close-grid">
            <div>
              <span className="close-label">Username</span>
              <span className="close-value">amacow</span>
            </div>
            <div>
              <span className="close-label">Profile</span>
              <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="close-value">Open on Discord</a>
            </div>
            <div className="close-actions">
              <button type="button" className="btn" onClick={copyName} aria-live="polite">
                {copied ? 'Copied' : 'Copy username'}
              </button>
              <a href={DISCORD} target="_blank" rel="noopener noreferrer" className="btn">Message me</a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} amacow · Roblox scripter</span>
          <span>Discord is the only contact channel.</span>
        </footer>
      </div>
    </>
  )
}
