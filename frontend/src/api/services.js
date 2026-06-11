import servicesData from '../data/services.json'
import metaData from '../data/meta.json'

const USE_REMOTE_API = false

/**
 * Fetch all government services.
 * Swap USE_REMOTE_API when GET /api/services is available.
 */
export async function fetchServices() {
  if (USE_REMOTE_API) {
    const { default: apiClient } = await import('./client')
    const { data } = await apiClient.get('/services')
    return data
  }

  return servicesData
}

/**
 * Fetch a single service by ID.
 * Swap USE_REMOTE_API when GET /api/services/:id is available.
 */
export async function fetchServiceById(serviceId) {
  if (USE_REMOTE_API) {
    const { default: apiClient } = await import('./client')
    const { data } = await apiClient.get(`/services/${serviceId}`)
    return data
  }

  const service = servicesData.find((s) => s.service_id === serviceId)
  if (!service) {
    throw new Error('Service not found')
  }
  return service
}

/**
 * Fetch portal metadata (helpdesk, toll-free, etc.)
 */
export async function fetchMeta() {
  if (USE_REMOTE_API) {
    const { default: apiClient } = await import('./client')
    const { data } = await apiClient.get('/meta')
    return data
  }

  return metaData
}

export function getDepartments(services) {
  const departments = [...new Set(services.map((s) => s.department))]
  return departments.sort((a, b) => a.localeCompare(b))
}

export function filterServices(services, { search = '', department = '' } = {}) {
  const query = search.trim().toLowerCase()

  return services.filter((service) => {
    const matchesDepartment = !department || service.department === department

    const matchesSearch =
      !query ||
      service.service_name.toLowerCase().includes(query) ||
      service.service_id.toLowerCase().includes(query) ||
      service.department.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query) ||
      service.category.toLowerCase().includes(query)

    return matchesDepartment && matchesSearch
  })
}

export function filterServicesByCategory(services, categoryFilter) {
  if (!categoryFilter) return services
  return services.filter((s) => categoryFilter(s.department))
}
