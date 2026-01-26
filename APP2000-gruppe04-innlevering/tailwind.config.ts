import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./styles/**/*.{css, tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/chakra-ui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        // Media-query breakpoints
        sm: "640px", // Tablet portrait
        md: "768px", // Tablet landscape
        lg: "1024px", // Desktop
        xl: "1280px", // Large Screens
        "2xl": "1536px", // Extra Large Screens
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        xxl: "3rem",
      },
      maxWidth: {
        xs: "25rem",
        sm: "40rem",
        md: "600rem",
        lg: "800rem",
        xl: "100rem",
        xxl: "120rem",
        full: "100vw",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#000000",
        secondary: "#FFFFFF",
        tertiary: "#333333",
        info: "#3498db", // Add info color
        success: "#2ecc71", // Add success color
        warning: "#f39c12", // Add warning color
        error: "#e74c3c", // Add error color
        light: "#ecf0f1", // Add light color
        dark: "#2c3e50", // Add dark color
      },
      fontFamily: {
        body: ["Open Sans", "sans-serif"],
        ingress: ["Lora", "serif"],
        h1: ["Roboto", "sans-serif"],
        h2: ["Roboto", "sans-serif"],
        h3: ["Roboto", "sans-serif"],
        h4: ["Roboto", "sans-serif"],
        h5: ["Roboto", "sans-serif"],
        h6: ["Roboto", "sans-serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        md: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        xxl: "1.5rem",
        "2xl": "1.75rem",
        "3xl": "2rem",
        "4xl": "2.25rem",
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "3rem",
      },
    },
  },
  darkMode: "class",
  lightMode: "class",
  plugins: [nextui()],
};
export default config;
