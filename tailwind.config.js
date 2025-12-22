/** @type {import('tailwindcss').Config} */
const shadcnConfig = require("shadcn/ui/tailwind.config")

module.exports = {
  ...shadcnConfig,
  content: [...shadcnConfig.content, "./index.html", "./src/**/*.{js,jsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    ...shadcnConfig.theme,
    extend: {
      ...shadcnConfig.theme.extend,
      colors: {
        ...shadcnConfig.theme.extend.colors,
        primary: {
          ...shadcnConfig.theme.extend.colors.primary,
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [...shadcnConfig.plugins, require("tailwindcss-animate")],
}
