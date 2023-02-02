const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        gray: "#2a2a2a",
        primary: "#2a92eb",
        secondary: "#d9a300",
        text: {
          primary: "#b9b9b9",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
});
