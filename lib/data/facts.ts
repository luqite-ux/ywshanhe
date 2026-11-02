export interface Fact {
  value: string
  unit?: string
  label: string
}

/** Capacity figures stated by the factory */
export const capacityFacts: Fact[] = [
  { value: '5', label: 'Automated production lines' },
  { value: '2', label: 'Customized production lines' },
  { value: '50,000', unit: 'pcs / month', label: 'Monthly capacity' },
]

/** Ordering terms stated by the factory */
export const termFacts: Fact[] = [
  { value: '1,000', unit: 'pcs', label: 'Minimum order quantity' },
  { value: '7', unit: 'working days', label: 'Sample time' },
  { value: '30–35', unit: 'days', label: 'Normal production' },
]

export const supportFacts = ['OEM and ODM supported', 'Third-party inspection supported']
