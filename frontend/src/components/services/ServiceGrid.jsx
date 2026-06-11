import ServiceCard from './ServiceCard'
import LoadingSpinner from '../ui/LoadingSpinner'

export default function ServiceGrid({ services, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!services.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <p className="text-base font-medium text-slate-700">No services found</p>
        <p className="mt-1 text-sm text-slate-500">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.service_id} service={service} />
      ))}
    </div>
  )
}
