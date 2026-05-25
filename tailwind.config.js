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
        gold: {
          DEFAULT: '#fcd34d',
          dark: '#f59e0b',
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
        'pro-glow': '0 0 0 1px rgba(252,211,77,0.4), 0 8px 32px 0 rgba(252,211,77,0.25)',
      },
      backgroundSize: {
        '300%': '300% 300%',
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
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.04)', opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -16px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-18px, 14px)' },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.6' },
          '50%': { transform: 'scale(1.3) rotate(180deg)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '60%': { opacity: '1', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'ping-soft': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'fade-up': 'fade-up 0.4s ease-out both',
        'fade-in': 'fade-in 0.3s ease-out',
        'gradient-shift': 'gradient-shift 12s ease infinite',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
        'float-slow': 'float-slow 11s ease-in-out infinite',
        'float-reverse': 'float-reverse 9s ease-in-out infinite',
        sparkle: 'sparkle 2.6s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'pop-in': 'pop-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'ping-soft': 'ping-soft 1.4s ease-out infinite',
      },
    },
  },
  plugins: [typography],
}
