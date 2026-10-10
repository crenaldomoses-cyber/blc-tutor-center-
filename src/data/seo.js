// Per-page SEO and social-share metadata.
// Used at runtime (src/components/Seo.jsx) and at build time (vite.config.js),
// which writes a pre-filled HTML file per route so link previews work without JS.
export const SITE_URL = 'https://blc-tutor-center.web.app'
export const SITE_NAME = 'BLC Tutor Center'
export const OG_IMAGE = '/images/og-image.jpg'
export const OG_IMAGE_ALT = 'Learners doing a science practical at BLC Tutor Center'

export const pages = {
  '/': {
    title: 'BLC Tutor Center | Impaq Tutor Centre on the Bluff, Durban',
    description:
      'Impaq-curriculum home-schooling support for Grades 1–12 on the Bluff, Durban. Small groups, caring tutors and hands-on learning. Now enrolling for 2026.',
  },
  '/programmes': {
    title: 'Programmes & Fees 2026 | BLC Tutor Center',
    description:
      '2026 hours and monthly fees for Grade 1 to Matric at BLC Tutor Center, Bluff. Small Impaq groups from R1 900 per month, plus part-time tutoring at R250 an hour.',
  },
  '/subjects': {
    title: 'FET Subjects for Grades 10–12 | BLC Tutor Center',
    description:
      'Core and elective FET subjects for Grades 10–12, from Maths and Physical Sciences to CAT, EGD, Tourism and Hospitality. Build the right NSC at BLC Tutor Center.',
  },
  '/gallery': {
    title: 'Gallery | Life at BLC Tutor Center',
    description:
      'Photos of lessons, science practicals, STEM projects, outings and celebrations at BLC Tutor Center, a home-education centre on the Bluff, Durban.',
  },
  '/about': {
    title: 'About Us | BLC Tutor Center, Bluff, Durban',
    description:
      'BLC Tutor Center is a registered home-education centre on the Bluff, Durban, guiding learners from Grade 1 to Matric through the Impaq curriculum in small groups.',
  },
  '/enrol': {
    title: 'Enrol for 2026 | BLC Tutor Center',
    description:
      'Enrol your child at BLC Tutor Center: the documents to bring, how to get in touch and directions to 150 Maxwell Avenue, Brighton Beach, Bluff. WhatsApp 078 303 7483.',
  },
}

export const pageMeta = (path) => pages[path] || pages['/']
