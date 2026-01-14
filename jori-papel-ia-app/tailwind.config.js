/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'jori-azul': '#1e3a5f',
        'jori-azul-claro': '#2d5a87',
        'jori-azul-escuro': '#0f2744',
        'jori-cinza': '#9ca3af',
        'jori-cinza-medio': '#6b7280',
      },
    },
  },
  plugins: [],
}
