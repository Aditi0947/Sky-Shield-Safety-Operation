import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ROLE_LABELS, useAuth } from '../auth'

const NAV = {
  reporter: [['/report/new', 'New report', 'bi-plus-square'], ['/incidents', 'My reports', 'bi-journal-text']],
  safety_officer: [['/incidents', 'Incident queue', 'bi-inboxes'], ['/dashboard', 'Dashboard', 'bi-grid-1x2'], ['/report/new', 'New report', 'bi-plus-square']],
  admin: [['/admin', 'Overview', 'bi-shield-check'], ['/dashboard', 'Dashboard', 'bi-grid-1x2'], ['/admin/users', 'Users', 'bi-people'], ['/policies', 'Policy library', 'bi-journal-bookmark']],
}
function title(path, role) {
  if (path.startsWith('/admin/incidents/')) return 'Incident review'
  if (path.startsWith('/incidents/')) return 'Incident record'
  if (path === '/report/new') return 'New incident report'
  if (path === '/incidents') return role === 'reporter' ? 'My reports' : 'Incident queue'
  if (path === '/dashboard') return 'Safety dashboard'
  if (path === '/admin/users') return 'User administration'
  if (path === '/policies') return 'Policy library'
  return 'Safety overview'
}
function initials(name) {
  return (name || 'Sky Shield').split(/\s+/).filter(Boolean).slice(0, 2).map((x) => x[0]).join('').toUpperCase()
}
export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className="sky-shell">
      <aside className="sky-sidebar">
        <div className="sky-brand">
          <span className="sky-brand-mark"><i className="bi bi-shield-fill-check" aria-hidden="true" /></span>
          <span className="sky-brand-copy"><strong>SkyShield</strong><small>SAFETY OPERATIONS</small></span>
        </div>
        <div className="sky-sidebar-label">WORKSPACE</div>
        <nav className="sky-nav" aria-label="Main navigation">
          {(NAV[user.role] || []).map(([to, label, icon]) => (
            <NavLink key={to} to={to} end={to === '/admin'} className="sky-nav-link">
              <span className="sky-nav-icon"><i className={'bi ' + icon} aria-hidden="true" /></span>
              <span>{label}</span><i className="bi bi-arrow-up-right sky-nav-arrow" aria-hidden="true" />
            </NavLink>
          ))}
        </nav>
        <div className="sky-sidebar-bottom">
          <div className="sky-system-status"><span className="sky-status-dot" />Operational workspace</div>
          <div className="sky-user-card">
            <span className="sky-avatar">{initials(user.full_name)}</span>
            <span className="sky-user-copy"><strong>{user.full_name}</strong><small>{ROLE_LABELS[user.role]}</small></span>
            <button className="sky-logout" type="button" title="Log out" aria-label="Log out"
              onClick={() => { logout(); navigate('/login') }}>
              <i className="bi bi-box-arrow-right" aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>
      <div className="sky-main">
        <header className="sky-topbar">
          <div><div className="sky-topbar-eyebrow">SKYSHIELD <span>/</span> OPERATIONS</div>
            <div className="sky-topbar-title">{title(location.pathname, user.role)}</div></div>
          <div className="sky-topbar-note"><i className="bi bi-lock" aria-hidden="true" /> Secure incident workspace</div>
        </header>
        <main className="sky-content"><Outlet /></main>
      </div>
    </div>
  )
}

