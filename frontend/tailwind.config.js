/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // for components from shadcn/ui
    "./components/**/*.{ts,tsx}",
  ],
  plugins: [require("tailwindcss-animate")],
  
  theme: {
    extend: {},
  },
  plugins: [],
}
