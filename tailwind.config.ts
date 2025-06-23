import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './src/content/**/*.mdx', './src/**/*.{sass,scss}'],
  theme: {
    extend: {
      colors: {
        brand: {
          demorat: 'var(--color-brand-demorat)',
        },
        dark: 'var(--color-dark)',
        light: 'var(--color-light)',
        mfr: {
          glow: 'var(--color-mfr-glow)',
          green: 'var(--color-mfr-green)',
          yellow: 'var(--color-mfr-yellow)',
        },
      },
      fontFamily: {
        regular: ['dm sans', 'sans serif'],
        title: ['Covered By Your Grace', 'sans serif'],
        mfr: ['SKT', 'Covered By Your Grace', 'sans serif'],
      },
    },
  },
  plugins: [],
}
export default config
