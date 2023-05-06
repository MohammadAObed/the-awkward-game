/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", //for file
    "./screens/**/*.{js,jsx,ts,tsx}", //for directory
    "./components/**/*.{js,jsx,ts,tsx}", //for directory
    "./common/**/*.{js,jsx,ts,tsx}", //for directory
    "./libraries/**/*.{js,jsx,ts,tsx}", //for directory
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        black: {
          500: "#212121",
          600: "#1D1D1D",
          700: "#191919",
        },
        yellow: {
          500: "#F4C41C",
        },
      },
    },
  },
  plugins: [],
};
