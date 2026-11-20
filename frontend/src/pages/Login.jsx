import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { homeFor, useAuth } from '../auth'
import { ErrorAlert } from '../components/ui'

const DEMO = [
  ['Reporter', 'ananya.iyer@skyshield.example'],
  ['Safety Officer', 'arjun.mehta@skyshield.example'],
  ['Admin', 'admin@skyshield.example'],
]
export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)
  if (user) return <Navigate to={homeFor(user.role)} replace />
  async function submit(e) {
    e.preventDefault()
    setBusy(true); setError(null)
    try {
      const u = await login(email.trim(), password)
      navigate(location.state?.from || homeFor(u.role), { replace: true })
    } catch (err) { setError(err) } finally { setBusy(false) }
  }
  return (
    <div className="login-wrap">
      <div className="login-frame">
        <section className="login-story">
          <div className="login-story-top">
            <span className="login-brand-mark"><i className="bi bi-shield-fill-check" aria-hidden="true" /></span>
            <span className="login-brand-name">SkyShield</span><span className="login-brand-divider" />
            <span className="login-brand-caption">SAFETY OPERATIONS</span>
          </div>
          <div className="login-story-body">
            <div className="login-eyebrow"><span /> A clearer view of safety</div>
            <h1>Every signal<br />makes a safer sky.</h1>
            <p>One connected workspace for reporting incidents, coordinating follow-up, and keeping every safety measure in view.</p>
            <div className="login-principles">
              <div><span className="login-principle-icon"><i className="bi bi-send" aria-hidden="true" /></span><span><strong>Report with clarity</strong><small>Capture the details that matter.</small></span></div>
              <div><span className="login-principle-icon"><i className="bi bi-diagram-3" aria-hidden="true" /></span><span><strong>Coordinate every response</strong><small>Keep actions and ownership connected.</small></span></div>
              <div><span className="login-principle-icon"><i className="bi bi-shield-check" aria-hidden="true" /></span><span><strong>Close the safety loop</strong><small>See what is complete and what remains.</small></span></div>
            </div>
          </div>
          <div className="login-flight-art" aria-hidden="true">
            <span className="flight-ring flight-ring-one" /><span className="flight-ring flight-ring-two" />
            <span className="flight-line" /><span className="flight-point flight-point-one" />
            <span className="flight-point flight-point-two" /><span className="flight-plane"><i className="bi bi-airplane-fill" /></span>
          </div>
          <div className="login-story-footer"><span>BUILT FOR AWARENESS</span><span>01 — 03</span></div>
        </section>
        <section className="login-panel">
          <div className="login-form-wrap">
            <div className="login-form-icon"><i className="bi bi-person-lock" aria-hidden="true" /></div>
            <div className="login-form-eyebrow">YOUR WORKSPACE</div>
            <h2>Welcome back</h2><p className="login-intro">Sign in to continue to SkyShield.</p>
            <ErrorAlert error={error} />
            <form onSubmit={submit} noValidate>
              <div className="mb-3"><label className="form-label" htmlFor="email">Work email</label>
                <div className="login-input-wrap"><i className="bi bi-envelope" aria-hidden="true" />
                  <input id="email" type="email" className="form-control" placeholder="you@company.com" autoComplete="username" required
                    value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              </div>
              <div className="mb-2"><label className="form-label" htmlFor="password">Password</label>
                <div className="login-input-wrap"><i className="bi bi-key" aria-hidden="true" />
                  <input id="password" type="password" className="form-control" placeholder="Enter your password" autoComplete="current-password" required
                    value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              </div>
              <div className="login-secure-note"><i className="bi bi-shield-lock" aria-hidden="true" /> Your session is protected</div>
              <button className="btn btn-primary login-submit w-100" disabled={busy || !email || !password}>
                {busy ? <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />Signing in…</> : <>Sign in <i className="bi bi-arrow-right ms-2" aria-hidden="true" /></>}
              </button>
            </form>
            <div className="login-demo">
              <div className="login-demo-heading"><span>DEMO ACCESS</span><span>Password <code>Password@123</code></span></div>
              <div className="d-flex flex-wrap gap-2">{DEMO.map(([label, mail]) => (
                <button key={mail} type="button" className="btn btn-sm btn-outline-secondary"
                  onClick={() => { setEmail(mail); setPassword('Password@123') }}>
                  <i className="bi bi-person-circle me-1" aria-hidden="true" />{label}
                </button>
              ))}</div>
            </div>
          </div>
          <div className="login-panel-footer"><span>SKYSHIELD SAFETY OPERATIONS</span><span><i className="bi bi-lock-fill" aria-hidden="true" /> PRIVATE &amp; SECURE</span></div>
        </section>
      </div>
    </div>
  )
}

