module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {RobotoCondensed: ["Roboto Condensed", "sans-serif"]},
    fontSize: {
      headline1: [
        "96px",
        {
          lineHeight: "102px",
          letterSpacing: -1.5,
        },
      ],
      headline2: [
        "60px",
        {
          lineHeight: "76px",
          letterSpacing: 1.5,
        },
      ],
      headline3: [
        "48px",
        {
          lineHeight: "56px",
          letterSpacing: 0,
        },
      ],
      headline4: [
        "34px",
        {
          lineHeight: "44px",
          letterSpacing: 0.25,
        },
      ],
      headline5: [
        "24px",
        {
          lineHeight: "30px",
          letterSpacing: 0.5,
        },
      ],
      headline6: [
        "20px",
        {
          lineHeight: "26px",
          letterSpacing: 0.15,
        },
      ],
      headline: [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: 1,
        },
      ],
      subtitle1: [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: 0.25,
        },
      ],
      subtitle2: [
        "14px",
        {
          lineHeight: "21px",
          letterSpacing: 0.1,
        },
      ],
      body: ["16px", "24px"],
      body1: [
        "16px",
        {
          lineHeight: "24px",
          letterSpacing: 0.5,
        },
      ],
      body2: [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: 0.25,
        },
      ],
      button: [
        "14px",
        {
          lineHeight: "20px",
          letterSpacing: 1.25,
        },
      ],
      button2: [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: 0.4,
        },
      ],
      caption: [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: 0.4,
        },
      ],
      caption2: [
        "12px",
        {
          lineHeight: "16px",
          letterSpacing: 2,
        },
      ],
      overline: [
        "10px",
        {
          lineHeight: "16px",
          letterSpacing: 1.5,
        },
      ],
    },
    extend: {
      colors: {
        primary: "#42A5F5",
        secondary: "#90CAF9",
        error: "#F44336",
        background: {
          primary: "#121212",
          secondary: "#272727",
          tertiary: "#383838",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
