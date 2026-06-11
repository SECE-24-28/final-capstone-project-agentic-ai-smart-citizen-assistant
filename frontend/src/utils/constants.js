export const CHAT_STORAGE_KEY = 'sca_chat_v1'
export const CHECKLIST_STORAGE_PREFIX = 'sca_checklist_'

export const POPULAR_SERVICE_IDS = [
  'REV-102',
  'REV-101',
  'REV-103',
  'REV-127',
  'REV-201',
]

export const DEPARTMENT_CATEGORIES = [
  {
    id: 'revenue',
    label: 'Revenue',
    description: 'Certificates, land records & revenue services',
    filter: (dept) => dept.toLowerCase().includes('revenue'),
    color: 'bg-blue-50 text-primary-800 border-blue-100',
    iconColor: 'text-primary-700',
  },
  {
    id: 'electricity',
    label: 'Electricity',
    description: 'TNEB / TANGEDCO power services',
    filter: (dept) => dept.toLowerCase().includes('tneb') || dept.toLowerCase().includes('tangedco'),
    color: 'bg-amber-50 text-amber-800 border-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    id: 'transport',
    label: 'Transport',
    description: 'Motor vehicles & driving services',
    filter: (dept) => dept.toLowerCase().includes('motor vehicle'),
    color: 'bg-slate-100 text-slate-800 border-slate-200',
    iconColor: 'text-slate-600',
  },
  {
    id: 'health',
    label: 'Health',
    description: 'Health, registration & medical schemes',
    filter: (dept) => dept.toLowerCase().includes('health'),
    color: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'welfare',
    label: 'Welfare',
    description: 'Social welfare & pension schemes',
    filter: (dept) =>
      dept.toLowerCase().includes('social welfare') ||
      dept.toLowerCase().includes('pension') ||
      dept.toLowerCase().includes('welfare'),
    color: 'bg-violet-50 text-violet-800 border-violet-100',
    iconColor: 'text-violet-600',
  },
]

export const SUGGESTED_QUESTIONS = [
  'What documents are required for Income Certificate?',
  'How do I apply for Community Certificate?',
  'What is the fee for Nativity Certificate?',
  'How long does Birth Certificate processing take?',
  'Who is eligible for Old Age Pension?',
  'What are the steps to get a Solvency Certificate?',
]

export const HELP_FAQS = [
  {
    question: 'What is Smart Citizen Assistant?',
    answer:
      'Smart Citizen Assistant is an AI-powered portal that helps Tamil Nadu citizens find information about e-Sevai government services, including required documents, fees, processing times, and application procedures.',
  },
  {
    question: 'Is the AI response legally binding?',
    answer:
      'No. AI-generated responses are for guidance only. Always verify details on the official TNeSevai portal or at your nearest e-Sevai centre before applying.',
  },
  {
    question: 'Where can I apply for government services?',
    answer:
      'You can apply at any of the 10,443+ e-Sevai / CSC centres across Tamil Nadu, or through the official citizen portal at tnesevai.tn.gov.in.',
  },
  {
    question: 'How do I contact the e-Sevai helpdesk?',
    answer:
      'Call the toll-free helpline at 1800-425-6000 or email tnesevaihelpdesk@tn.gov.in for official support.',
  },
]
