// Site-wide details — sourced from the official BLC 2026 application form.
export const site = {
  name: 'BLC Tutor Center',
  shortName: 'BLC',
  tagline: 'Bridge to Lifelong Confidence',
  values: ['Learning', 'Respect', 'Growth'],
  description:
    'A caring Impaq-curriculum tutor centre on the Bluff, Durban — supporting home-schooled learners from Grade 1 to Grade 12 in small, focused groups.',

  // Contact
  phone: '078 303 7483',
  phoneIntl: '27783037483',
  email: 'Charleen7078@gmail.com',
  address: {
    line1: '150 Maxwell Avenue',
    line2: 'Brighton Beach, Bluff',
    city: 'Durban',
    code: '4052',
  },
  mapsQuery: '150 Maxwell Avenue, Brighton Beach, Bluff, Durban, 4052',

  // Registration
  regNo: '2020 / 770652 / 07',
  venueNo: 'H6743',
  curriculum: 'Impaq',

  nav: [
    { label: 'Home', to: '/' },
    { label: 'Programmes', to: '/programmes' },
    { label: 'Subjects', to: '/subjects' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'About', to: '/about' },
    { label: 'Enrol', to: '/enrol' },
  ],
}

// Pre-filled WhatsApp enquiry link.
export const whatsappLink = (msg) =>
  `https://wa.me/${site.phoneIntl}?text=${encodeURIComponent(
    msg || `Hi BLC Tutor Center! I'd like to find out more about enrolling my child.`,
  )}`
