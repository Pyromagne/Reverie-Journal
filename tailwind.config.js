/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        '320': '320px',
        '250': '250px',
      },
      minWidth: {
        '320': '320px',
        '250': '250px',
      },
      height: {
        '320': '320px',
        '250': '250px',
        '200' : '200px',
      },
    },
  },
  plugins: [],
}

