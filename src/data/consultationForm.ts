export const developmentFeasibilityOptions = ['Market Review', 'Financial Outlook'] as const

export const verificationOptions = [
  'Due Diligence',
  'Purchase recommendation',
  'Title verfication',
] as const

export const propertyLocations = [
  'Lekki / Ajah',
  'Sangotedo / Ogombo',
  'Ibeju-Lekki / Epe',
  'Ikoyi / Victoria Island',
  'Mainland Lagos',
  'Other Lagos Location',
  'Outside Lagos',
] as const

export const propertyTypes = [
  'Bare Land',
  'Residential Plot',
  'Commercial Land',
  'Mixed-Use Development',
  'Built Property',
  'Other',
] as const

export type ConsultationPreset = {
  packageName?: string
  development?: string[]
  verification?: string[]
  projectPlanning?: boolean
}

export function verificationPackagePreset(packageName: string): ConsultationPreset {
  return {
    packageName,
    verification: ['Due Diligence', 'Title verfication'],
  }
}

export function feasibilityPackagePreset(): ConsultationPreset {
  return {
    packageName: 'Development Feasibility Assessment',
    development: [...developmentFeasibilityOptions],
  }
}

export function planningPackagePreset(): ConsultationPreset {
  return {
    packageName: 'Project Planning & Structuring',
    projectPlanning: true,
  }
}
