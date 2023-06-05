/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "game-back":
          "url('https://steamcdn-a.akamaihd.net/steamcommunity/public/images/items/1098340/29a536228d2a364f89ef7cb195aa5fa309bdfdec.jpg')",
        "main-back": "url('/src/images/mainBack.jpg')",
      },
      boxShadow: {
        card: "15px 15px 5px 0px rgba(0 0 0 / 0.1)",
      },
      colors: {
        button: "#2e3b52",
        "button-h": "#051124",
        back: "#282730",
        fore: "#f0f3f7",
      },
    },
  },
  plugins: [],
};