/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", //for file
    "./screens/**/*.{js,jsx,ts,tsx}", //for directory
    "./components/**/*.{js,jsx,ts,tsx}", //for directory
    "./common/**/*.{js,jsx,ts,tsx}", //for directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
