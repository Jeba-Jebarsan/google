/** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            'google-blue': '#4285F4',
            'google-red': '#DB4437',
            'google-yellow': '#F4B400',
            'google-green': '#0F9D58',
            'search-bg': '#f8f9fa',
            'search-text': '#202124',
            'search-border': '#dfe1e5',
            'search-hover': '#f1f3f4',
            'link-blue': '#1a0dab',
            'visited-link': '#609',
            'result-url': '#202124',
            'result-snippet': '#4d5156',
          },
          fontFamily: {
            sans: ['Arial', 'sans-serif'],
          },
        },
      },
      plugins: [],
    }
