/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    screens: {
      sm: '420px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },

    extend: {
      backgroundColor: {
        'black-opacity-50': 'rgba(0, 0, 0, 0.5)'
      },
      backgroundImage: {
        'mobile-background': "url('/src/assets/images/Golf BG.png')",
        'desktop-background': "url('/src/assets/images/AceCam Golf BG.png')",
      },
      height: {
        'max-content': 'max-content',
      },
    },
  },
  plugins: [],
}
