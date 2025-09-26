// tailwind.config.js (CommonJS)
const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // top-level custom colors (use like bg-cream, text-ui-text, bg-leaf-2)
        cream: "#F6F7F3",
        leaf: "#3F6B2A",
        "leaf-2": "#6FA76B",
        "leaf-3": "#9CCB95",
        "slate-2": "#E7ECE8",
        "ui-text": "#213028",
        "ui-muted": "#4B5D54",
        "ui-border": "#D1D5D1",
        "ui-border-2": "#E6EAE6",
        "ui-bg": "#FFFFFF",
        "ui-bg-2": "#F9FAF9",
        "ui-bg-3": "#F3F5F3"
      }
    }
  },
  plugins: [
    heroui(),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio")
  ]
};
