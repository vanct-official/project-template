import { NavLink } from 'react-router-dom';
import ApiHealthCard from './ApiHealthCard';

export default function Navbar({ theme, onToggleTheme, favoritesCount = 0 }) {
  return (
    <header className="border-bottom sticky-top bg-body shadow-sm navbar-header">
      <div className="container-fluid px-3 px-lg-4 py-2">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
          {/* Brand & Subtitle */}
          <div className="d-flex align-items-center gap-3">
            <NavLink to="/" className="text-decoration-none d-flex align-items-center gap-2">
              <div
                className="d-flex align-items-center justify-content-center rounded bg-primary text-white"
                style={{ width: '36px', height: '36px', fontSize: '1.1rem' }}
              >
                <i className="bi bi-terminal-fill" />
              </div>
              <div>
                <h1 className="h6 mb-0 fw-bold text-body tracking-tight">
                  VanCT Developer Toolkit
                </h1>
                <p className="small text-secondary mb-0 d-none d-md-block" style={{ fontSize: '0.78rem' }}>
                  Commands, packages and project setup references for developers.
                </p>
              </div>
            </NavLink>
          </div>

          {/* Navigation Links & Action Controls */}
          <div className="d-flex align-items-center gap-3">
            <nav className="nav nav-pills gap-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link px-3 py-1-5 rounded-2 small fw-semibold ${
                    isActive ? 'active shadow-none' : 'text-body'
                  }`
                }
              >
                <i className="bi bi-house me-1" />
                Home
              </NavLink>
              <NavLink
                to="/commands"
                className={({ isActive }) =>
                  `nav-link px-3 py-1-5 rounded-2 small fw-semibold ${
                    isActive ? 'active shadow-none' : 'text-body'
                  }`
                }
              >
                <i className="bi bi-code-slash me-1" />
                Commands
              </NavLink>
              <NavLink
                to="/health"
                className={({ isActive }) =>
                  `nav-link px-3 py-1-5 rounded-2 small fw-semibold ${
                    isActive ? 'active shadow-none' : 'text-body'
                  }`
                }
              >
                <i className="bi bi-heart-pulse-fill me-1 text-danger" />
                API Health
              </NavLink>
            </nav>

            <div className="vr my-1 d-none d-sm-block text-secondary opacity-25" />

            {/* Live API Health indicator */}
            <div className="d-none d-md-flex align-items-center">
              <ApiHealthCard compact />
            </div>

            <div className="vr my-1 d-none d-md-block text-secondary opacity-25" />

            {/* Favorites Badge Indicator */}
            {favoritesCount > 0 && (
              <span
                className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle d-inline-flex align-items-center gap-1"
                title={`${favoritesCount} favorited command${favoritesCount > 1 ? 's' : ''}`}
              >
                <i className="bi bi-star-fill text-warning" />
                <span>{favoritesCount}</span>
              </span>
            )}

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary border-secondary-subtle d-flex align-items-center gap-1 px-2 py-1"
              onClick={onToggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
              aria-label="Toggle theme mode"
            >
              <i className={`bi ${theme === 'dark' ? 'bi-sun-fill text-warning' : 'bi-moon-stars-fill text-primary'}`} />
              <span className="small d-none d-sm-inline">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
