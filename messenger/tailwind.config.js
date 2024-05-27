/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        dark: {
        "primary": "#7e22ce",
        "secondary": "#a855f7",
        "accent": "#c084fc",
        "neutral": "#9333ea",
        "base-100": "#010101",
        "info": "#0000ff",
        "success": "#22c55e",
        "warning": "#facc15",    
        "error": "#dc2626",
        },
      },
    ],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),

  ],
}