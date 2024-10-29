/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#22223b",
        "bg-dark-hover": "#22223b",
        "title-color": "#4a4e69",
        "input-border": "#4a4e6920",
      },
    },
  },
  plugins: [],
};
