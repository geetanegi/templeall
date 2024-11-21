/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "420px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {
      backgroundColor: {
        "black-opacity-50": "rgba(0, 0, 0, 0.5)",
      },
    
      backgroundImage: {
        "mobile-background": "url('/src/assets/images/Golf BG.png')",
        "desktop-background": "url('/src/assets/images/AceCam-golf-bg.png')",
        "golfballBg": "url('/src/assets/images/GolfBallBg.png')",
        "profile_gradient_bg": "linear-gradient(174.16deg, #072E1A 3.87%, #006633 51.67%, #000000 99.48%)",
        'gradient-green': 'linear-gradient(180deg, #046221  0%, #072E1A 100%)',
        "reverse-graident-green": 'linear-gradient(180deg, #072E1A   0%, #046221 100%)',
        'hero-pattern':
          "linear-gradient(to right bottom, rgba(43, 108, 176, 0.9), rgba(43, 108, 176, 0.9)), url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.eAFxNBriFW8k0jCNOTCe6gHaHs%26pid%3DApi&f=1')",

        profilebackground: "url('/src/assets/images/BG.png')",
        "custom-gradient-1":
          "linear-gradient(270deg, rgba(4, 98, 33, 0.5) 0%, rgba(7, 46, 26, 0.9) 100%)",
        "custom-gradient-2":
          "linear-gradient(90deg, rgba(29, 26, 12, 0) 0%, rgba(29, 26, 12, 0.42) 36%, rgba(29, 26, 12, 0.7) 100%)",
        "custom-gradient-3":
          "linear-gradient(90deg, #95C11E 66.59%, rgba(255, 255, 255, 0) 100%)",
        "backgroundDark":"linear-gradient(180deg, #072E1A 0%, #006633 50%, #000000 100%)",
      },
      height: {
        "max-content": "max-content",
      },
      borderRadius: {
        "custom-border-radius": "432px 0px 0px 432px", // Define a custom border-radius
      },
      colors: {
        link: "#8DD35F",
        buttonPrimary: "#5FB643",
        primaryColor:"#046221",
        primaryText: "#FFFFFF",
        backgroundDark2:
          "linear-gradient(180deg, rgba(4, 98, 33, 0.6) 0%, rgba(7, 46, 26, 0.6) 100%)",
        yellowText: "#FFDE59",
        warning: "#FFF3E0",
        warningText:"#FF9800",
        textColor:"#1D1A0C",
       borderColor:"#E6E6E6",
       disabledFontColor:"#CACACA",
       tableHeadingTextColor:"#1D1A0C"
       
        
      },
    },
  },
  plugins: [],
};

