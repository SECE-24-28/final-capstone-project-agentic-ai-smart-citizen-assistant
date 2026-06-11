import { Link } from 'react-router'
import { Building2, Heart, Landmark, Truck, Zap } from 'lucide-react'
import Card from '../ui/Card'

const iconMap = {
  revenue: Landmark,
  electricity: Zap,
  transport: Truck,
  health: Heart,
  welfare: Building2,
}

export default function DepartmentCard({ category, serviceCount }) {
  const Icon = iconMap[category.id] || Landmark

  return (
    <Link
      to={`/services?category=${category.id}`}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 rounded-2xl"
    >
      <Card hover className={`h-full border ${category.color}`}>
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ${category.iconColor}`}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-primary-800">
              {category.label}
            </h3>
            <p className="mt-1 text-sm text-slate-600">{category.description}</p>
            <p className="mt-2 text-xs font-medium text-slate-500">
              {serviceCount} service{serviceCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </Card>
    </Link>
  )
}
