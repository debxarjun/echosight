/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          50: '#e8eaf0',
          100: '#c5c9d8',
          200: '#9ea5be',
          300: '#7780a4',
          400: '#596591',
          500: '#3b4a7e',
          600: '#354376',
          700: '#2d3a6b',
          800: '#263261',
          900: '#19224e',
          950: '#0B1020',
        },
        cyan: {
          400: '#38DDF5',
          500: '#20c5dd',
          600: '#10adc5',
        },
        violet: {
          400: '#8B7CFF',
          500: '#7B6CF0',
          600: '#6B5CE0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(56, 221, 245, 0.2), 0 0 20px rgba(56, 221, 245, 0.1)' },
          '100%': { boxShadow: '0 0 10px rgba(56, 221, 245, 0.4), 0 0 40px rgba(56, 221, 245, 0.2)' },
        },
      },
    },
  },
  plugins: [],
};
