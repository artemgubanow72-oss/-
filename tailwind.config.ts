import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        wool: {
          navy:  '#1A1A2E',
          red:   '#E94560',
          gold:  '#F5A623',
          blue:  '#0F3460',
          cream: '#F8F4F0',
          dark:  '#0D0D1A',
        },
      },
      backgroundImage: {
        'wool-gradient': 'linear-gradient(135deg, #E94560 0%, #F5A623 100%)',
        'navy-gradient': 'linear-gradient(135deg, #1A1A2E 0%, #0F3460 100%)',
        'hero-mesh':     'radial-gradient(at 40% 20%, #E94560 0, transparent 50%), radial-gradient(at 80% 0%, #F5A623 0, transparent 50%), radial-gradient(at 0% 50%, #0F3460 0, transparent 50%)',
      },
      boxShadow: {
        wool:   '0 20px 60px rgba(233,69,96,0.25)',
        gold:   '0 20px 60px rgba(245,166,35,0.25)',
        glass:  '0 8px 32px rgba(0,0,0,0.12)',
      },
      animation: {
        'float':          'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

export default config
