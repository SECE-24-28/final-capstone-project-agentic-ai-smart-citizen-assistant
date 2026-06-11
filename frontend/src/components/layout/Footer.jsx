import { ExternalLink, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <h2 className="text-base font-semibold text-slate-900">Smart Citizen Assistant</h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
              AI-powered guidance for Tamil Nadu government services. Get help with documents,
              fees, eligibility, and application procedures through e-Sevai.
            </p>
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 ring-1 ring-amber-100">
              AI responses are for guidance only. Always verify on official government portals.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/chat" className="text-slate-600 hover:text-primary-700">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 hover:text-primary-700">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-slate-600 hover:text-primary-700">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Official Support</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
                <a href="tel:18004256000" className="hover:text-primary-700">
                  1800-425-6000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary-700" aria-hidden="true" />
                <a
                  href="mailto:tnesevaihelpdesk@tn.gov.in"
                  className="hover:text-primary-700"
                >
                  tnesevaihelpdesk@tn.gov.in
                </a>
              </li>
              <li>
                <a
                  href="https://www.tnesevai.tn.gov.in/citizen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-primary-700"
                >
                  TNeSevai Portal
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Smart Citizen Assistant · Tamil Nadu e-Sevai Government
          Services
        </div>
      </div>
    </footer>
  )
}
