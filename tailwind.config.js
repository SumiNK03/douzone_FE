/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // src 내 모든 js, jsx, ts, tsx 파일
  ],
  theme: {
    extend: {
      fontFamily: {
         'anon': ['AnonymousPro', 'monospace'],
      },
    },
  },
  plugins: [],
}

