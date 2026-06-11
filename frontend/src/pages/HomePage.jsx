import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {
  ArrowRight,
  Bot,
  FileText,
  MapPin,
  Search,
  Shield,
  Sparkles,
} from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import DepartmentCard from '../components/services/DepartmentCard'
import { useChat } from '../context/ChatContext'
import { useServicesList } from '../hooks/useServices'
import { DEPARTMENT_CATEGORIES, POPULAR_SERVICE_IDS } from '../utils/constants'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { setPendingQuestion } = useChat()
  const { data: services = [] } = useServicesList()

  const popularServices = useMemo(
    () =>
      POPULAR_SERVICE_IDS.map((id) => services.find((s) => s.service_id === id)).filter(Boolean),
    [services],
  )

  const departmentCounts = useMemo(
    () =>
      DEPARTMENT_CATEGORIES.map((cat) => ({
        category: cat,
        count: services.filter((s) => cat.filter(s.department)).length,
      })),
    [services],
  )

  const handleSearch = (value) => {
    const trimmed = (value ?? query).trim()
    if (!trimmed) return
    setPendingQuestion(trimmed)
    navigate('/chat')
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggIGQ9Ik0zNiAzNGg0djJoLTR6bS0yLTJoNHYyaC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium ring-1 ring-white/20 backdrop-blur">
              <Shield className="h-4 w-4 text-amber-300" aria-hidden="true" />
              Tamil Nadu e-Sevai · Government Services
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Smart Citizen Assistant
            </h1>
            <p className="mt-4 text-base leading-relaxed text-primary-100 sm:text-lg">
              Your AI-powered guide to government services — find documents, understand fees,
              check eligibility, and follow application procedures with confidence.
            </p>

            <div className="mt-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSearch(query)
                }}
                className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row"
                role="search"
              >
                <label htmlFor="hero-search" className="sr-only">
                  Ask a question about government services
                </label>
                <div className="relative flex-1">
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    id="hero-search"
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. What documents are needed for Income Certificate?"
                    className="w-full rounded-2xl border-0 py-4 pl-12 pr-4 text-base text-slate-900 shadow-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <Button type="submit" variant="amber" size="lg" className="shrink-0">
                  <Bot className="h-5 w-5" />
                  Ask AI
                </Button>
              </form>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-primary-200">
              <span className="inline-flex items-center gap-1.5">
                <FileText className="h-4 w-4" aria-hidden="true" />
                182 Services
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                10,443+ eSevai Centres
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                AI-Powered Guidance
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Popular Services</h2>
            <p className="mt-1 text-slate-600">Most requested government certificates and schemes</p>
          </div>
          <Link
            to="/services"
            className="hidden items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800 sm:inline-flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {popularServices.map((service) => (
            <Link
              key={service.service_id}
              to={`/services/${service.service_id}`}
              className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-2xl"
            >
              <Card hover className="h-full">
                <Badge color="blue">{service.category}</Badge>
                <h3 className="mt-2 font-semibold text-slate-900 group-hover:text-primary-800">
                  {service.service_name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{service.fee}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Departments */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900">Browse by Department</h2>
            <p className="mt-1 text-slate-600">Explore services across key government departments</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {departmentCounts.map(({ category, count }) => (
              <DepartmentCard key={category.id} category={category} serviceCount={count} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-primary-800 to-primary-700 p-8 text-white sm:p-12">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <Bot className="h-8 w-8" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold sm:text-2xl">Need help with a government service?</h2>
              <p className="mt-2 text-primary-100">
                Ask our AI assistant about documents, fees, processing times, and step-by-step
                procedures for any e-Sevai service.
              </p>
            </div>
            <Link to="/chat" className="shrink-0">
              <Button variant="amber" size="lg">
                Start Conversation
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  )
}
