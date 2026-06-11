import { useQuery } from '@tanstack/react-query'
import {
  AlertTriangle,
  ChevronDown,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  BookOpen,
} from 'lucide-react'
import { useState } from 'react'
import Card from '../components/ui/Card'
import { fetchMeta } from '../api/services'
import { HELP_FAQS } from '../utils/constants'

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-slate-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 transition ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="pb-4 text-sm leading-relaxed text-slate-600">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function HelpPage() {
  const { data: meta } = useQuery({
    queryKey: ['meta'],
    queryFn: fetchMeta,
    staleTime: Infinity,
  })

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Help & Support</h1>
        <p className="mt-2 text-slate-600">
          Official resources and guidance for using Smart Citizen Assistant
        </p>
      </div>

      <Card className="mb-8 border-amber-200 bg-amber-50">
        <div className="flex gap-3">
          <AlertTriangle className="h-6 w-6 shrink-0 text-amber-600" aria-hidden="true" />
          <div>
            <h2 className="font-semibold text-amber-900">Important Disclaimer</h2>
            <p className="mt-1 text-sm leading-relaxed text-amber-800">
              AI-generated responses provided by Smart Citizen Assistant are for informational
              guidance only. They do not constitute official government advice. Always verify
              documents, fees, eligibility criteria, and procedures through the official TNeSevai
              portal or at your nearest e-Sevai / CSC centre before submitting any application.
            </p>
          </div>
        </div>
      </Card>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <div className="flex items-start gap-3">
            <Phone className="h-6 w-6 text-primary-700" aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-slate-900">Toll-Free Helpline</h3>
              <a
                href={`tel:${meta?.toll_free ?? '18004256000'}`}
                className="mt-1 block text-lg font-bold text-primary-800 hover:underline"
              >
                {meta?.toll_free ?? '1800-425-6000'}
              </a>
              <p className="mt-1 text-sm text-slate-500">Available for e-Sevai support queries</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <Mail className="h-6 w-6 text-primary-700" aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-slate-900">Helpdesk Email</h3>
              <a
                href={`mailto:${meta?.helpdesk_email ?? 'tnesevaihelpdesk@tn.gov.in'}`}
                className="mt-1 block text-sm font-medium text-primary-800 hover:underline"
              >
                {meta?.helpdesk_email ?? 'tnesevaihelpdesk@tn.gov.in'}
              </a>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <MapPin className="h-6 w-6 text-primary-700" aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-slate-900">eSevai Centres</h3>
              <p className="mt-1 text-sm text-slate-600">
                {meta?.total_esevai_centres ?? '10,443 centres across Tamil Nadu'}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <BookOpen className="h-6 w-6 text-primary-700" aria-hidden="true" />
            <div>
              <h3 className="font-semibold text-slate-900">Official Portal</h3>
              <a
                href={meta?.citizen_portal ?? 'https://www.tnesevai.tn.gov.in/citizen/'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary-800 hover:underline"
              >
                TNeSevai Citizen Portal
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Official Resources</h2>
        <ul className="space-y-3">
          <li>
            <a
              href={meta?.source_portal ?? 'https://www.tnesevai.tn.gov.in/Pages/ServiceList.aspx'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary-700 hover:underline"
            >
              Complete Service List
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </li>
          <li>
            <a
              href={meta?.user_manual_index ?? 'https://tnesevai.tn.gov.in/Pages/UserManual.aspx'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary-700 hover:underline"
            >
              User Manuals Index
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </li>
          {meta?.user_manual_download_guide?.manuals?.slice(0, 3).map((manual) => (
            <li key={manual.url}>
              <a
                href={manual.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary-700 hover:underline"
              >
                {manual.title}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="mb-2 text-lg font-semibold text-slate-900">Frequently Asked Questions</h2>
        <div>
          {HELP_FAQS.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </Card>
    </div>
  )
}
