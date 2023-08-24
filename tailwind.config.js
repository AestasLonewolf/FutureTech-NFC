/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fe7000",
        secondary: "#2D2D2D",
      },
    },
  },
  plugins: [],
};
