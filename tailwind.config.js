/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./global/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "fit-lg": "repeat(auto-fit, minmax(230px, 1fr))",
        "fit-md": "repeat(auto-fit, minmax(210px, 1fr))",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: {
        default: "rgba(24, 32, 38, 1)",
        lighter: "rgba(24, 32, 38, 0.8)",
        lightest: "rgba(24, 32, 38, 0.4)",
      },
      purple: {
        default: "rgba(193, 144, 191, 1)",
        lighter: "rgba(193, 144, 191, 0.75)",
        "mid-light": "rgba(193, 144, 191, 0.6)",
        lightest: "rgba(193, 144, 191, 0.3)",
      },
      green: {
        default: "rgba(171, 229, 161, 1)",
        lighter: "rgba(171, 229, 161, 0.75)",
        lightest: "rgba(171, 229, 161, 0.3)",
      },
      red: {
        default: "rgba(255, 107, 101, 1)",
        lighter: "rgba(255, 107, 101, 0.75)",
        lightest: "rgba(255, 107, 101, 0.3)",
      },
      yellow: {
        default: "rgba(255, 243, 147, 1)",
        lighter: "rgba(255, 243, 147, 0.75)",
        lightest: "rgba(255, 243, 147, 0.3)",
      },
      blue: {
        default: "rgba(113, 145, 192, 1)",
        lighter: "rgba(113, 145, 192, 0.75)",
        lightest: "rgba(113, 145, 192, 0.3)",
      },
      white: {
        default: "rgba(255, 255, 255, 1)",
        lighter: "rgba(255, 255, 255, 0.6)", // grey
        lightest: "rgba(255, 255, 255, 0.04)",
      },
    },
    fontSize: {
      // format: ['font_size', 'line_height']
      xs: ["10px", "14px"],
      sm: ["12px", "16px"],
      m: ["13", "17px"],
      base: ["14px", "20px"],
      lg: ["16px", "26px"],
      xl: ["20px", "28px"],
      "2xl": ["24px", "32px"],
      "3xl": ["36px", "44px"],
      "4xl": ["24px", "32px"],
    },
    borderRadius: {
      xs: "8px",
      sm: "12px",
      base: "18px",
      full: "9999px",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
