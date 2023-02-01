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
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
});
