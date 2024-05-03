/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/views/*.{html,mustache}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

