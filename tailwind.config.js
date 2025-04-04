/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}", "./src/js/*.js"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
