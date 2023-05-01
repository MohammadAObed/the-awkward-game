/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", //for file
    "./screens/**/*.{js,jsx,ts,tsx}", //for directory
    "./components/**/*.{js,jsx,ts,tsx}", //for directory
    "./common/**/*.{js,jsx,ts,tsx}", //for directory
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        black: {
          500: "#191919",
          600: "#212121",
          700: "#1D1D1D",
        },
        yellow: {
          500: "#F4C41C",
        },
      },
    },
  },
  plugins: [],
};
