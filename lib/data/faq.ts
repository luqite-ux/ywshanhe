export interface FaqItem {
  question: string
  answer: string
}

export interface FaqGroup {
  id: string
  title: string
  items: FaqItem[]
}

export const faqGroups: FaqGroup[] = [
  {
    id: 'ordering',
    title: 'Ordering and customization',
    items: [
      {
        question: 'What is your minimum order quantity?',
        answer: 'Our minimum order quantity is 1,000 pieces.',
      },
      {
        question: 'Do you support OEM and ODM projects?',
        answer:
          'Yes. Send a reference photo, sketch or sample together with your target size, material and branding, and we will reply with the next steps.',
      },
      {
        question: 'What can be customized?',
        answer:
          'Shape and structure, material, size, colour and branding can all be specified for your project. Tell us what matters most and we will build the sample around it.',
      },
      { question: 'Do you provide technical data sheets or test reports?', answer: 'Yes. Tell us which product and document you need when you send your inquiry.' },
      { question: 'Which applications do you currently supply?', answer: 'The supplied product range covers document storage, cosmetic organization, insulated lunch carrying and digital-accessory storage.' },
      { question: 'Do you offer tiered or bulk pricing?', answer: 'Yes. Quotations can be adjusted by quantity and long-term cooperation requirements.' },
      { question: 'Does the quoted product price include packing, freight or taxes?', answer: 'No. Packing, freight and tax terms are confirmed separately for each quotation.' },
      { question: 'Can raw-material or exchange-rate changes affect pricing?', answer: 'Yes. The final quotation is confirmed against the current material requirements, quantity and commercial terms.' },
    ],
  },
  {
    id: 'samples',
    title: 'Samples and lead time',
    items: [
      {
        question: 'How long do samples take?',
        answer: 'Our sample time is 7 working days.',
      },
      { question: 'Can samples be shipped?', answer: 'Yes. Sample shipment details are confirmed with the buyer.' },
      { question: 'Are samples charged or refundable?', answer: 'Sample charges and any refund arrangement are confirmed according to the requested construction and order plan.' },
      { question: 'Can we approve the sample before bulk production?', answer: 'Yes. Bulk production starts after the sample is approved.' },
      { question: 'Will bulk production follow the approved sample?', answer: 'Yes. The approved sample is used as the reference for bulk production.' },
      {
        question: 'How long does normal production take?',
        answer:
          'Normal production takes 30–35 days. We confirm timing for your order once the sample is approved and quantities are set.',
      },
      { question: 'Is the bulk-order schedule stable?', answer: 'The agreed schedule is managed against the approved sample, quantity and production plan.' },
      { question: 'Can peak season extend lead time?', answer: 'Yes. Peak-season schedules may be extended, so timing is confirmed before the order is placed.' },
      { question: 'Do you support urgent production?', answer: 'Yes, subject to production capacity and an additional expedited-production charge.' },
      { question: 'Can you provide production progress updates?', answer: 'Yes. Production progress can be shared during the order.' },
    ],
  },
  {
    id: 'quality',
    title: 'Quality and inspection',
    items: [
      {
        question: 'Is third-party inspection supported?',
        answer:
          'Yes. Third-party inspection is supported. Tell us which inspection company or checklist you use when you send your inquiry.',
      },
      { question: 'Do you have a quality-control process?', answer: 'Yes. Quality-control checks are included in the production process.' },
      { question: 'Can you provide inspection or quality reports?', answer: 'Yes. Confirm the report scope required for your order before production.' },
      { question: 'How are quality issues handled?', answer: 'The specific issue, evidence and order requirements are reviewed with the buyer to agree on the appropriate resolution.' },
      {
        question: 'How is production linked to the sample?',
        answer:
          'Production follows the sample you approve, so size, material, colour and branding are agreed before bulk work starts.',
      },
    ],
  },
  {
    id: 'inquiry',
    title: 'Working with us',
    items: [
      {
        question: 'What should I include in my inquiry?',
        answer:
          'Bag type, estimated quantity, target size, material, colours, logo placement, destination and target timing. Photos or sketches help a great deal.',
      },
      {
        question: 'Where are you located?',
        answer:
          'We are based in Yiwu, Zhejiang, China, and develop and produce functional bags for B2B buyers.',
      },
    ],
  },
]

export const faqPlainItems = faqGroups.flatMap((group) => group.items)
