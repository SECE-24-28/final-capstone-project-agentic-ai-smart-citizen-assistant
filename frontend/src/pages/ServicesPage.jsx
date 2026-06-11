import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import ServiceFilters from '../components/services/ServiceFilters'
import ServiceGrid from '../components/services/ServiceGrid'
import { useFilteredServices } from '../hooks/useServices'
import { DEPARTMENT_CATEGORIES } from '../utils/constants'

export default function ServicesPage() {
  const [searchParams] = useSearchParams()
  const categoryId = searchParams.get('category')

  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')

  const categoryFilter = useMemo(() => {
    const cat = DEPARTMENT_CATEGORIES.find((c) => c.id === categoryId)
    return cat?.filter ?? null
  }, [categoryId])

  const { services, departments, isLoading } = useFilteredServices({
    search,
    department,
    categoryFilter,
  })

  const activeCategory = DEPARTMENT_CATEGORIES.find((c) => c.id === categoryId)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Government Services</h1>
        <p className="mt-2 text-slate-600">
          Browse and search {activeCategory ? `${activeCategory.label} ` : ''}e-Sevai services
          across Tamil Nadu
        </p>
      </div>

      <div className="mb-8">
        <ServiceFilters
          search={search}
          onSearchChange={setSearch}
          department={department}
          onDepartmentChange={setDepartment}
          departments={departments}
          resultCount={services.length}
        />
      </div>

      <ServiceGrid services={services} isLoading={isLoading} />
    </div>
  )
}
