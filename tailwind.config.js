/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        whitesmoke: "#F5F5F5FF",
        materialPink:"#F06292",
        materialPurple:"#673AB7",
        googleGray:"#3c4043",
      },
    },
  },
  plugins: [],
};
