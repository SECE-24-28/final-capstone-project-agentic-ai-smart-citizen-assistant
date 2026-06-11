import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Bot, Menu, X, Shield } from 'lucide-react'
import Button from '../ui/Button'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/chat', label: 'AI Assistant' },
  { to: '/services', label: 'Services' },
  { to: '/help', label: 'Help' },
]

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm font-medium transition ${
          isActive
            ? 'bg-primary-50 text-primary-800'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          aria-label="Smart Citizen Assistant home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-800 text-white shadow-sm">
            <Shield className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold leading-tight text-slate-900">
              Smart Citizen Assistant
            </p>
            <p className="text-xs text-slate-500">Tamil Nadu e-Sevai Portal</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/chat">
            <Button size="sm">
              <Bot className="h-4 w-4" aria-hidden="true" />
              Ask AI
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-slate-200 bg-white px-4 py-4 md:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavItem key={link.to} {...link} onClick={closeMobile} />
            ))}
            <Link to="/chat" onClick={closeMobile} className="mt-2">
              <Button className="w-full">
                <Bot className="h-4 w-4" />
                Ask AI
              </Button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
