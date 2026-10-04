// Grade tiers, hours and monthly fees — from the BLC 2026 application form.
export const gradeTiers = [
  {
    key: 'foundation',
    grades: 'Grade 1 – 3',
    phase: 'Foundation Phase',
    hours: 'Mon – Fri · 07:30 – 12:30',
    fee: 'R1 900',
    blurb: 'Building strong reading, writing and number foundations through play, crafts and hands-on discovery.',
  },
  {
    key: 'intermediate',
    grades: 'Grade 4 – 6',
    phase: 'Intermediate Phase',
    hours: 'Mon – Fri · 07:30 – 13:30',
    fee: 'R2 100',
    blurb: 'Growing confident, independent learners with structured support across every core subject.',
  },
  {
    key: 'senior',
    grades: 'Grade 7 – 9',
    phase: 'Senior Phase',
    hours: 'Mon – Fri · 08:00 – 14:00',
    fee: 'R2 300',
    blurb: 'Guiding learners through the GET phase and preparing them for the demands of the FET years.',
  },
  {
    key: 'fet',
    grades: 'Grade 10 – 11',
    phase: 'FET Phase',
    hours: 'Mon – Fri · 08:00 – 15:00',
    fee: 'R2 700',
    blurb: 'Subject-focused tutoring towards the National Senior Certificate, with a wide choice of electives.',
  },
  {
    key: 'matric',
    grades: 'Grade 12',
    phase: 'Matric',
    hours: 'Mon – Fri · 08:00 – 15:00',
    fee: 'R2 900',
    blurb: 'Dedicated matric support. Choose 12 months (Jan–Dec) or an intensive 10-month plan at R3 960/month.',
    note: '10-month option: R3 960 · Jan – Oct',
  },
]

export const feeNotes = [
  'Part-time tutoring available at R250 per hour lesson.',
  'Once-off, non-refundable administration fee of R500 before a new learner starts.',
  'Pay the full year in advance and save R1 000 off the total.',
  'Fees are payable monthly in advance on the 1st or 15th of each month.',
]

// FET Phase subjects (Grade 10 – 12).
export const subjects = {
  core: [
    'English Home Language',
    'Afrikaans First Additional Language',
    'Mathematics',
    'Mathematical Literacy',
    'Life Orientation',
  ],
  electives: [
    'Business Studies',
    'Life Sciences',
    'Computer Applications Technology (CAT)',
    'Tourism',
    'Engineering Graphics & Design (EGD)',
    'Physical Sciences',
    'Hospitality Studies',
  ],
  electiveNotes: [
    'Physical Sciences learners must take Mathematics (not Mathematical Literacy).',
    'Hospitality Studies carries an additional R100 per month.',
  ],
}

export const whyBlc = [
  {
    icon: '👩‍🏫',
    title: 'Small, focused groups',
    text: 'Caring tutors who know every learner by name — real attention, not a crowded classroom.',
  },
  {
    icon: '📚',
    title: 'Impaq curriculum',
    text: 'We facilitate the trusted Impaq home-education curriculum and manage assessments to their standards.',
  },
  {
    icon: '🔬',
    title: 'Learning by doing',
    text: 'Science experiments, STEM builds and creative projects that make lessons stick.',
  },
  {
    icon: '🏊',
    title: 'More than academics',
    text: 'Swimming, activities and life skills that build well-rounded, confident young people.',
  },
]

// Documents required to apply.
export const enrolDocs = [
  'Certified copy of Parent/Guardian ID',
  "Learner's Birth Certificate / ID",
  'Most recent School / Previous Institution Report',
  'Proof that previous fees are paid up to date',
  'Proof of address',
]
