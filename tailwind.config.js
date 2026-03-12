/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Calistoga", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;