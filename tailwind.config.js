const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        opener: "moveOpener 0.5s ease",
        drawer: "moveDrawer 0.5s ease",
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        sixth: "moveCard 40s ease infinite",
      },
      keyframes: {
        moveCard: {
          "0%": {
            transform: "translateX(-30%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-30%) translateY(-10%)",
          },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        moveOpener: {
          "0%": {
            transform: "translateY(0rem)",
          },
          "50%": {
            transform: "translateY(0.5rem)",
          },
          "100%": {
            transform: "translateY(0.5rem)",
          },
        },
        moveDrawer: {
          "0%": {
            transform: "translateY(0.5rem)",
          },
          "50%": {
            transform: "translateY(0rem)",
          },
          "100%": {
            transform: "translateY(0rem)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors:{
        brandblack:'#0b0f13',
        brandsecond:"#131820",
      },
    },
  },
  plugins: [],
};

