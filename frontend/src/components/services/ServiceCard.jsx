import { Link } from 'react-router'
import { ArrowRight, Clock, IndianRupee } from 'lucide-react'
import Badge from '../ui/Badge'
import Card from '../ui/Card'

export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service.service_id}`}
      className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
    >
      <Card hover className="h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge color="blue">{service.category}</Badge>
              <span className="text-xs text-slate-500">{service.service_id}</span>
            </div>
            <h3 className="font-semibold text-slate-900 group-hover:text-primary-800">
              {service.service_name}
            </h3>
            <p className="mt-1 text-xs text-slate-500">{service.department}</p>
          </div>
          <ArrowRight
            className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-primary-600"
            aria-hidden="true"
          />
        </div>

        <p className="mt-3 line-clamp-2 text-sm text-slate-600">{service.description}</p>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <IndianRupee className="h-3.5 w-3.5" aria-hidden="true" />
            {service.fee}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {service.processing_time}
          </span>
        </div>
      </Card>
    </Link>
  )
}
