export type ProcessIconName = 'brief' | 'sample' | 'approval' | 'production' | 'inspection'

export interface ProcessStep {
  id: string
  icon: ProcessIconName
  title: string
  description: string
}

export const processSteps: ProcessStep[] = [
  {
    id: 'brief',
    icon: 'brief',
    title: 'Brief and quote',
    description: 'You send bag type, quantity, size, material and branding. We reply with questions and a quote.',
  },
  {
    id: 'sample',
    icon: 'sample',
    title: 'Sampling',
    description: 'Samples are ready in 7 working days.',
  },
  {
    id: 'approval',
    icon: 'approval',
    title: 'Sample approval',
    description: 'You confirm the sample. Production follows what you approved.',
  },
  {
    id: 'production',
    icon: 'production',
    title: 'Controlled production',
    description: 'Normal production takes 30–35 days.',
  },
  {
    id: 'inspection',
    icon: 'inspection',
    title: 'Inspection and shipment',
    description: 'Third-party inspection is supported. Shipment is arranged with you.',
  },
]
