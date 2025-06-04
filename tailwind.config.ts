import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.mdx",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{sass,scss}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          demorat: "#6615f7",
        },
        dark: "#0a0a0a",
        light: "#f8f8f8",
        mfr: {
          glow: "#59fd53",
          green: "#68c460",
          yellow: "#ffff0f",
        },
      },
      fontFamily: {
        regular: ["dm sans", "sans serif"],
        title: ["Covered By Your Grace", "sans serif"],
        mfr: ["SKT", "Covered By Your Grace", "sans serif"],
      },
    },
  },
  plugins: [],
};
export default config;