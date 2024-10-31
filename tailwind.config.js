/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors:{
        "bg-page":"var(--bg-page)",
        "bg-content":"var(--bg-content)",
        "text-primary-color": "var(--text-primary-color)"
      }
    },
  },
  plugins: [],
}

