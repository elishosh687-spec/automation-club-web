/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./web/**/*.html", "./web/js/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-container": "#798098",
        "secondary": "#d6c4ac",
        "tertiary-container": "#1d160f",
        "on-tertiary-container": "#8a7f74",
        "on-secondary-fixed": "#231a0b",
        "surface-container-lowest": "#0f0e0d",
        "surface-container-high": "#2b2a29",
        "on-tertiary": "#372f26",
        "surface-container-low": "#1d1b1a",
        "secondary-fixed-dim": "#d6c4ac",
        "primary-fixed-dim": "#bec6e0",
        "primary-container": "#0f172a",
        "on-primary-fixed-variant": "#3f465c",
        "primary": "#bec6e0",
        "tertiary": "#d2c4b8",
        "surface-dim": "#141312",
        "on-primary": "#283044",
        "tertiary-fixed-dim": "#d2c4b8",
        "outline": "#909097",
        "error": "#ffb4ab",
        "surface-bright": "#3b3938",
        "secondary-container": "#544735",
        "on-primary-fixed": "#131b2e",
        "surface-tint": "#bec6e0",
        "on-error-container": "#ffdad6",
        "on-tertiary-fixed": "#211a13",
        "error-container": "#93000a",
        "inverse-primary": "#565e74",
        "on-secondary": "#3a2f1e",
        "on-background": "#e6e1e0",
        "inverse-surface": "#e6e1e0",
        "tertiary-fixed": "#eee0d3",
        "surface-container-highest": "#363433",
        "surface-container": "#211f1e",
        "on-surface": "#e6e1e0",
        "on-error": "#690005",
        "on-tertiary-fixed-variant": "#4e453c",
        "on-secondary-fixed-variant": "#514533",
        "on-surface-variant": "#c6c6cd",
        "on-secondary-container": "#c7b69e",
        "inverse-on-surface": "#32302f",
        "outline-variant": "#45464d",
        "primary-fixed": "#dae2fd",
        "secondary-fixed": "#f3e0c7",
        "surface-variant": "#363433",
        "surface": "#141312",
        "background": "#141312"
      },
      borderRadius: { DEFAULT: "0.125rem", lg: "0.25rem", xl: "0.5rem", full: "9999px" },
      fontFamily: {
        headline: ["Heebo", "Manrope", "sans-serif"],
        body: ["Assistant", "Heebo", "sans-serif"],
        label: ["Assistant", "Heebo", "sans-serif"],
        "latin-head": ["Newsreader", "serif"],
        "latin-body": ["Manrope", "sans-serif"]
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries")
  ]
};
