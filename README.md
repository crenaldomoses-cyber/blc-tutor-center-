# BLC Tutor Center — Website

*Bridge to Lifelong Confidence* · Learning · Respect · Growth

A fresh, modern marketing site for **BLC Tutor Center**, an Impaq-curriculum home-education tutor centre on the Bluff, Durban (Grades 1–12). Built with **Vite + React + React Router + Tailwind CSS (+ SCSS)** and deployed to **Firebase Hosting**.

## Getting started

```bash
npm install       # install dependencies
npm run dev       # start local dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build
npm run deploy    # build + firebase deploy --only hosting
```

## Project structure

```
src/
  App.jsx                 # routes, scroll-to-top, floating WhatsApp button
  main.jsx                # entry
  components/             # Navbar, Footer, PageHeader, Reveal, LazyImage
  pages/                  # Home, Programmes, Subjects, About, Enrol
  data/
    site.js               # contact, address, nav, WhatsApp helper
    programs.js           # grade tiers, fees, subjects, gallery, docs
  styles/main.scss        # Tailwind layers + brand components
public/images/            # logo + real centre photos
```

## Editing content

All real content lives in `src/data/`. Update fees, hours, subjects or contact
details there and every page updates automatically. Brand colours and fonts are
in `tailwind.config.js`.

## Deploying to Firebase

1. Create the Firebase project and set its id in [.firebaserc](.firebaserc)
   (currently `blc-learning-centre`).
2. `npm run deploy`

Source of truth for all details: the official *BLC 2026 Application* pack.
