/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Brand palette drawn from the BLC Tutor Center logo.
      colors: {
        blc: {
          navy:     '#153a63',
          navydeep: '#0f2c4c',
          blue:     '#2c6ba3',
          bluepale: '#e9f0f7',
          red:       '#a5283a',
          redsoft:   '#c8455a',
          green:     '#4f9d3a',
          greensoft: '#7bc264',
          cream:     '#f7f5ef',
          cream2:    '#fbf9f4',
          ink:       '#1e2733',
          slate:     '#5a6577',
        },
      },
      fontFamily: {
        head: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        blc: '18px',
        blclg: '28px',
      },
      boxShadow: {
        blc: '0 14px 34px rgba(21, 58, 99, 0.14)',
        blcsoft: '0 8px 20px rgba(21, 58, 99, 0.10)',
      },
      maxWidth: {
        site: '1180px',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
        fadeIn: 'fadeIn .5s ease forwards',
      },
    },
  },
  plugins: [],
}
