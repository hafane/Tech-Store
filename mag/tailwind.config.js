import { transform } from 'typescript'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "accordion-open": "accordion-open 0.5s ease-out",
        "dropdown-open": "dropdown-open 0.5s ease-out",
        "sidebar-anima": "sidebar-open 0.5s ease-out",
      },
      keyframes: {
        "accordion-open": {
          "0%": { transform: "translateY(-50%)", opacity: 0 },
          "100%": { transform: "translateY(0%)", opacity: 1 },
        },
        "dropdown-open": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "sidebar-open": {
          "0%": {transform: "translateX(-100%)", opacity: 0},
          "100%": {transform: "translateX(0%)", opacity: 1},
        }
      },
    },
  },
  plugins: [],
}

