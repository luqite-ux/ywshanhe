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
      {
        question: 'How long does normal production take?',
        answer:
          'Normal production takes 30–35 days. We confirm timing for your order once the sample is approved and quantities are set.',
      },
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
