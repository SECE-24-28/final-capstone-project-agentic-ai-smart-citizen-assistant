import { Link, useNavigate, useParams } from 'react-router'
import {
  ArrowLeft,
  Bot,
  Clock,
  ExternalLink,
  FileText,
  IndianRupee,
  MapPin,
  Shield,
} from 'lucide-react'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ApplicationSteps from '../components/services/ApplicationSteps'
import DocumentChecklist from '../components/services/DocumentChecklist'
import { useChat } from '../context/ChatContext'
import { useServiceDetail } from '../hooks/useServices'

export default function ServiceDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { setPendingQuestion } = useChat()
  const { data: service, isLoading, isError } = useServiceDetail(id)

  const handleAskAI = () => {
    if (!service) return
    const question = `Tell me everything I need to know about ${service.service_name} (${service.service_id}) — documents, fee, processing time, and how to apply.`
    setPendingQuestion(question)
    navigate('/chat')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-24">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (isError || !service) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="text-xl font-bold text-slate-900">Service not found</h1>
        <p className="mt-2 text-slate-600">The requested service could not be located.</p>
        <Link to="/services" className="mt-6 inline-block">
          <Button>Browse Services</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        to="/services"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-primary-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to services
      </Link>

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge color="blue">{service.category}</Badge>
          <Badge color="slate">{service.service_id}</Badge>
        </div>
        <h1 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
          {service.service_name}
        </h1>
        <p className="mt-1 text-slate-600">{service.department}</p>
        <p className="mt-3 text-slate-700">{service.description}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={handleAskAI}>
            <Bot className="h-4 w-4" />
            Ask AI About This Service
          </Button>
          {service.service_url && (
            <a href={service.service_url} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">
                <ExternalLink className="h-4 w-4" />
                Official Portal
              </Button>
            </a>
          )}
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="flex items-center gap-3">
            <IndianRupee className="h-5 w-5 text-amber-600" aria-hidden="true" />
            <div>
              <p className="text-xs text-slate-500">Fee</p>
              <p className="font-semibold text-slate-900">{service.fee}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary-700" aria-hidden="true" />
            <div>
              <p className="text-xs text-slate-500">Processing Time</p>
              <p className="font-semibold text-slate-900">{service.processing_time}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <div>
              <p className="text-xs text-slate-500">Validity</p>
              <p className="font-semibold text-slate-900">{service.validity}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-slate-600" aria-hidden="true" />
            <div>
              <p className="text-xs text-slate-500">Output</p>
              <p className="text-sm font-semibold text-slate-900">{service.output}</p>
            </div>
          </div>
        </Card>
      </div>

      {service.where_to_apply && (
        <Card className="mb-8 flex items-start gap-3 bg-primary-50 border-primary-100">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-700" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-primary-900">Where to Apply</p>
            <p className="mt-1 text-sm text-primary-800">{service.where_to_apply}</p>
          </div>
        </Card>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <DocumentChecklist
            key={service.service_id}
            serviceId={service.service_id}
            documents={service.documents_required}
          />
        </Card>
        <Card>
          <ApplicationSteps steps={service.application_steps} />
        </Card>
      </div>

      {service.user_manual_pdf && (
        <Card className="mt-8">
          <h3 className="text-base font-semibold text-slate-900">User Manual</h3>
          <p className="mt-1 text-sm text-slate-600">
            Download the official user manual for detailed instructions.
          </p>
          <a
            href={service.user_manual_pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800"
          >
            Download PDF
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Card>
      )}
    </div>
  )
}
