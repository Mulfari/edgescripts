module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        play: ['"Play"', 'sans-serif'],
      },
      colors: {
        'green-500': '#00ff00',
        'gray-900': '#1a1a1a',
      },
      height: {
        '144': '36rem', // Definir h-144
        '192': '48rem', // Definir h-192
      }
    },
  },
  plugins: [],
}
