/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'card': '1px 1px 2px 0px rgba(0, 0, 0, 1)',
      },        
      colors: {
        'button':'#2e3b52',
        'button-h':'#051124',
        'back':'#e4eaf5',
        'fore':'#f0f3f7',
    }},
  },
  plugins: [],
}