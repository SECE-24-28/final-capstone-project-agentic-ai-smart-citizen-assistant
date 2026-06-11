import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  fetchServiceById,
  fetchServices,
  filterServices,
  filterServicesByCategory,
  getDepartments,
} from '../api/services'

export function useServicesList() {
  return useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
    staleTime: 1000 * 60 * 30,
  })
}

export function useServiceDetail(serviceId) {
  return useQuery({
    queryKey: ['services', serviceId],
    queryFn: () => fetchServiceById(serviceId),
    enabled: Boolean(serviceId),
    staleTime: 1000 * 60 * 30,
  })
}

export function useFilteredServices({ search = '', department = '', categoryFilter = null } = {}) {
  const { data: services = [], ...rest } = useServicesList()

  const filtered = useMemo(() => {
    let result = filterServices(services, { search, department })
    if (categoryFilter) {
      result = filterServicesByCategory(result, categoryFilter)
    }
    return result
  }, [services, search, department, categoryFilter])

  const departments = useMemo(() => getDepartments(services), [services])

  return { services: filtered, allServices: services, departments, ...rest }
}
