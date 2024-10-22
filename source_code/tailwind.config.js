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
        'desktop-background': "url('/src/assets/images/AceCam-golf-bg.png')",
        'profilebackground': "url('/src/assets/images/peofile_background.svg')",
        'custom-gradient-1': 'linear-gradient(90deg, rgba(209, 228, 156, 0.9) 32.85%, rgba(255, 255, 255, 0.6) 67.86%)',
        'custom-gradient-2': 'linear-gradient(90deg, rgba(29, 26, 12, 0) 0%, rgba(29, 26, 12, 0.42) 36%, rgba(29, 26, 12, 0.7) 100%)',
        'custom-gradient-3': 'linear-gradient(90deg, #95C11E 66.59%, rgba(255, 255, 255, 0) 100%)'
      },
      height: {
        'max-content': 'max-content',
      },
      borderRadius: {
        'custom-border-radius': '432px 0px 0px 432px', // Define a custom border-radius
      },
    },
  },
  plugins: [],
}
