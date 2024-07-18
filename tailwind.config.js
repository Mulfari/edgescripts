module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        play: ['"Play"', 'sans-serif'],
        'press-start': ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        'blue-500': '#3B82F6',
      },
    },
  },
  plugins: [],
}
