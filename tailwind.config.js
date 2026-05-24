import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          DEFAULT: '#fbcfe8',
          light: '#fde8f3',
          dark: '#f9a8d4',
        },
        lavender: {
          DEFAULT: '#e9d5ff',
          light: '#f3e8ff',
          dark: '#d8b4fe',
        },
        cream: {
          DEFAULT: '#fdf4ff',
          dark: '#fae8ff',
        },
        sage: {
          DEFAULT: '#d1fae5',
          dark: '#a7f3d0',
        },
        peach: {
          DEFAULT: '#fed7aa',
          dark: '#fdba74',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 4px 24px 0 rgba(251,207,232,0.25)',
        'soft-lg': '0 8px 40px 0 rgba(233,213,255,0.30)',
        'soft-hover': '0 8px 32px 0 rgba(249,168,212,0.35)',
      },
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'fade-up': 'fade-up 0.4s ease-out both',
        'fade-in': 'fade-in 0.3s ease-out',
      },
    },
  },
  plugins: [typography],
}
