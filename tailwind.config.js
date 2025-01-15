/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundB: "rgba(var(--background))",
        textT: "rgba(var(--text))",
        primaryP: "rgba(var(--primary))",
        secondaryS:"rgba(var(--secondary))",
        accentA:"rgba(var(--accent))"
    },
    },
  },
  plugins: [
   
  ], 
  darkMode: "class"
}  