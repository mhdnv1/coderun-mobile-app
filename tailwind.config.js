/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "app-bg": "#010827",
        brand: "#9B0DD9",
        "brand-disabled": "#5B2B70",
        screen: "#F7F8FA",
        surface: "#FFFFFF",
        "primary-text": "#111827",
        secondary: "#4B5563",
        body: "#374151",
        muted: "#6B7280",
        soft: "#E5E7EB",
        "card-border": "#D9DEE8",
        "control-border": "#D1D5DB",
        "login-border": "#928787",
        danger: "#B91C1C",
        "danger-soft": "#FEF2F2",
        "danger-border": "#FECACA",
        "danger-light": "#FCA5A5",
        "danger-dark": "#450A0A",
      },
    },
  },
  plugins: [],
};
