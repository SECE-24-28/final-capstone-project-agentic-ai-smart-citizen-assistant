export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

export function loadChecklist(serviceId) {
  const key = `sca_checklist_${serviceId}`
  return loadFromStorage(key, {})
}

export function saveChecklist(serviceId, checklist) {
  const key = `sca_checklist_${serviceId}`
  saveToStorage(key, checklist)
}
