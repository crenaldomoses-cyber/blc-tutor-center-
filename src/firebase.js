import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'

// Web config for the blc-tutor-center Firebase project. These values are
// public identifiers, not secrets — safe to ship in the client bundle.
const firebaseConfig = {
  apiKey: 'AIzaSyDGLBQ35EZzqCcpC22TY5kRvF6lz1b1I3s',
  authDomain: 'blc-tutor-center.firebaseapp.com',
  projectId: 'blc-tutor-center',
  storageBucket: 'blc-tutor-center.firebasestorage.app',
  messagingSenderId: '93286584667',
  appId: '1:93286584667:web:f74bee8e18efb0c4e24a7e',
  measurementId: 'G-K3VBFS6LVM',
}

export const app = initializeApp(firebaseConfig)

// Only collect analytics from the production build, and only where the
// browser supports it (e.g. not when cookies/IndexedDB are blocked).
// SPA route changes are picked up by GA4 enhanced measurement (history events).
if (import.meta.env.PROD) {
  isSupported().then((ok) => {
    if (ok) getAnalytics(app)
  })
}
