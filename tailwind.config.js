/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode
  theme: {
    extend: {
      colors: {
        darkBg: "#06080E",
        darkBorder: "#1f2937",
        darkText: "#ffffff",
        lightBg: "#ffffff",
        lightText: "#03050C",
        lightBorder: "#1f2937",
        darkTagBg: "#121317",
        darkTagText: "#A2A6B9",
        lightTagBg: "#E0E2EB",
        lightTagText: "#3D435C",
      },
    },
  },
  plugins: [],
};
