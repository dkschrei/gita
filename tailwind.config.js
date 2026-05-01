/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Krishna palette — divine blue, peacock teal, gold accent
        krishna: {
          50: "#EEF4FB",
          100: "#D6E5F4",
          200: "#A9C6E6",
          400: "#4A7DB8",
          600: "#1E4F8E",
          800: "#0F2D5C",
          900: "#081938",
        },
        // Arjuna palette — warrior coral, dust, weathered bronze
        arjuna: {
          50: "#FAEDE5",
          100: "#F2C9B3",
          400: "#C56A3E",
          600: "#8B3E1D",
          800: "#5C2611",
        },
        // Battlefield neutral
        dust: {
          50: "#F7F4ED",
          100: "#E8E2D4",
          200: "#C9C2B0",
          400: "#8A8472",
          600: "#54503F",
          800: "#2A2718",
          900: "#1A1810",
        },
        // Gold (royalty, divinity, dharma)
        dharma: {
          400: "#D9A441",
          600: "#A47419",
          800: "#5A3F08",
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
