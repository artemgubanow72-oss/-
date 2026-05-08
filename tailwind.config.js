/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {

      // ═══════════════════════════════════
      // ЦВЕТОВАЯ ПАЛИТРА SHERSTON 2026
      // ═══════════════════════════════════
      colors: {
        // Основные бренд-цвета
        brand: {
          red:    '#E94560',
          gold:   '#F5A623',
          'red-light':  '#FF6B7A',
          'gold-light': '#FFB84D',
        },
        // Фоны
        bg: {
          base:    '#060608',
          surface: '#0C0C10',
          card:    '#111116',
          hover:   '#16161C',
        },
        // Стекло (Liquid Glass)
        glass: {
          '5':  'rgba(255,255,255,0.05)',
          '8':  'rgba(255,255,255,0.08)',
          '10': 'rgba(255,255,255,0.10)',
          '15': 'rgba(255,255,255,0.15)',
          'border': 'rgba(255,255,255,0.08)',
          'border-hover': 'rgba(255,255,255,0.16)',
        },
        // Текст
        content: {
          primary:   'rgba(255,255,255,1)',
          secondary: 'rgba(255,255,255,0.6)',
          tertiary:  'rgba(255,255,255,0.35)',
          disabled:  'rgba(255,255,255,0.15)',
        },
        // Семантические
        success: '#22C55E',
        warning: '#F5A623',
        error:   '#E94560',
        info:    '#3B82F6',
      },

      // ═══════════════════════════════════
      // ТИПОГРАФИКА
      // ═══════════════════════════════════
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        accent:  ['"Playfair Display"', 'serif'],
      },

      fontSize: {
        // Display — кинетические заголовки
        'display-2xl': ['clamp(4rem, 15vw, 16rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        'display-xl':  ['clamp(3rem, 11vw, 12rem)', { lineHeight: '0.88', letterSpacing: '-0.03em' }],
        'display-lg':  ['clamp(2.5rem, 8vw, 9rem)',  { lineHeight: '0.90', letterSpacing: '-0.02em' }],
        'display-md':  ['clamp(2rem, 5vw, 6rem)',    { lineHeight: '0.92', letterSpacing: '-0.02em' }],
        'display-sm':  ['clamp(1.5rem, 3vw, 4rem)',  { lineHeight: '1.0',  letterSpacing: '-0.01em' }],
      },

      // ═══════════════════════════════════
      // ГРАДИЕНТЫ
      // ═══════════════════════════════════
      backgroundImage: {
        // Основные
        'brand-gradient':   'linear-gradient(135deg, #E94560 0%, #F5A623 100%)',
        'brand-gradient-r': 'linear-gradient(225deg, #E94560 0%, #F5A623 100%)',
        'dark-gradient':    'linear-gradient(135deg, #0C0C10 0%, #1A0A0F 100%)',

        // Liquid Glass
        'glass-gradient':
          'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)',
        'glass-gradient-warm':
          'linear-gradient(135deg, rgba(233,69,96,0.12) 0%, rgba(245,166,35,0.06) 100%)',

        // Hero mesh
        'hero-mesh': `
          radial-gradient(at 20% 20%, rgba(233,69,96,0.15) 0, transparent 55%),
          radial-gradient(at 80% 10%, rgba(245,166,35,0.12) 0, transparent 55%),
          radial-gradient(at 10% 80%, rgba(44,44,84,0.20) 0, transparent 55%),
          radial-gradient(at 90% 80%, rgba(233,69,96,0.08) 0, transparent 55%)
        `,

        // Shimmer
        'shimmer':
          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',

        // Bento card accents
        'bento-red':    'linear-gradient(135deg, rgba(233,69,96,0.15), transparent)',
        'bento-gold':   'linear-gradient(135deg, rgba(245,166,35,0.15), transparent)',
        'bento-purple': 'linear-gradient(135deg, rgba(124,58,237,0.15), transparent)',
        'bento-green':  'linear-gradient(135deg, rgba(5,150,105,0.15), transparent)',
        'bento-blue':   'linear-gradient(135deg, rgba(59,130,246,0.15), transparent)',
      },

      // ═══════════════════════════════════
      // ТЕНИ
      // ═══════════════════════════════════
      boxShadow: {
        // Glow
        'glow-red':    '0 0 30px rgba(233,69,96,0.35),  0 0 60px rgba(233,69,96,0.15)',
        'glow-gold':   '0 0 30px rgba(245,166,35,0.35), 0 0 60px rgba(245,166,35,0.15)',
        'glow-sm-red': '0 0 15px rgba(233,69,96,0.25)',

        // Cards
        'card':     '0 1px 2px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)',
        'card-lg':  '0 4px 6px rgba(0,0,0,0.4), 0 20px 60px rgba(0,0,0,0.4)',
        'card-hover':'0 8px 16px rgba(0,0,0,0.5), 0 30px 80px rgba(0,0,0,0.5)',

        // Glass
        'glass':    'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 24px rgba(0,0,0,0.3)',
        'glass-lg': 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 40px rgba(0,0,0,0.4)',

        // Brand
        'brand':    '0 8px 32px rgba(233,69,96,0.3)',
        'brand-lg': '0 16px 60px rgba(233,69,96,0.4)',
      },

      // ═══════════════════════════════════
      // BORDER RADIUS
      // ═══════════════════════════════════
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },

      // ═══════════════════════════════════
      // АНИМАЦИИ
      // ═══════════════════════════════════
      animation: {
        // Базовые
        'float':      'float 7s ease-in-out infinite',
        'spin-slow':  'spin 25s linear infinite',
        'ping-slow':  'pingSlow 3s ease-in-out infinite',

        // Бегущая строка
        'marquee':    'marquee 28s linear infinite',
        'marquee-r':  'marqueeR 28s linear infinite',

        // Shimmer
        'shimmer':    'shimmer 3.5s linear infinite',

        // Grain
        'grain':      'grain 0.35s steps(1) infinite',

        // Fade
        'fade-in':    'fadeIn 0.6s ease-out forwards',
        'fade-up':    'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',

        // Градиент
        'gradient-x': 'gradientX 5s ease infinite',

        // Pulse glow
        'pulse-brand': 'pulseBrand 2.5s ease-in-out infinite',
      },

      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%':     { transform: 'translateY(-18px) rotate(2deg)' },
          '66%':     { transform: 'translateY(-8px) rotate(-1.5deg)' },
        },
        pingSlow: {
          '0%,100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%':     { transform: 'scale(1.5)', opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        marqueeR: {
          from: { transform: 'translateX(-50%)' },
          to:   { transform: 'translateX(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '10%':     { transform: 'translate(-2%,-2%)' },
          '20%':     { transform: 'translate(2%,2%)' },
          '30%':     { transform: 'translate(-1%,1%)' },
          '40%':     { transform: 'translate(1%,-1%)' },
          '50%':     { transform: 'translate(-2%,1%)' },
          '60%':     { transform: 'translate(2%,-2%)' },
          '70%':     { transform: 'translate(-1%,-1%)' },
          '80%':     { transform: 'translate(1%,2%)' },
          '90%':     { transform: 'translate(-2%,2%)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        gradientX: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        pulseBrand: {
          '0%,100%': { boxShadow: '0 0 20px rgba(233,69,96,0.3)' },
          '50%':     { boxShadow: '0 0 50px rgba(233,69,96,0.6), 0 0 80px rgba(233,69,96,0.2)' },
        },
      },

      // ═══════════════════════════════════
      // TRANSITION TIMING
      // ═══════════════════════════════════
      transitionTimingFunction: {
        'spring':     'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo':    'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo':   'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-expo':'cubic-bezier(0.87, 0, 0.13, 1)',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },

      // ═══════════════════════════════════
      // BLUR
      // ═══════════════════════════════════
      blur: {
        '4xl': '80px',
        '5xl': '120px',
      },

      // ═══════════════════════════════════
      // SPACING
      // ═══════════════════════════════════
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '128': '32rem',
        '144': '36rem',
      },
    },
  },

  plugins: [
    // Кастомные утилиты
    function({ addUtilities, addComponents, theme }: any) {

      // ── Liquid Glass компонент ──
      addComponents({
        '.liquid-glass': {
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 24px rgba(0,0,0,0.3)',
        },
        '.liquid-glass-warm': {
          background: 'linear-gradient(135deg, rgba(233,69,96,0.08) 0%, rgba(255,255,255,0.04) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(233,69,96,0.12)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3)',
        },
        '.liquid-glass-gold': {
          background: 'linear-gradient(135deg, rgba(245,166,35,0.08) 0%, rgba(255,255,255,0.04) 100%)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(245,166,35,0.12)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.3)',
        },

        // ── Bento карточки ──
        '.bento-card': {
          background: '#0C0C10',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '1.25rem',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            border: '1px solid rgba(255,255,255,0.12)',
            transform: 'translateY(-4px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          },
        },

        // ── Градиентные кнопки ──
        '.btn-brand': {
          background: 'linear-gradient(135deg, #E94560 0%, #F5A623 100%)',
          color: 'white',
          fontWeight: '700',
          borderRadius: '9999px',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          '&:hover': {
            transform: 'scale(1.04) translateY(-2px)',
            boxShadow: '0 12px 40px rgba(233,69,96,0.4)',
          },
          '&:active': {
            transform: 'scale(0.98)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: '0',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.5s ease',
          },
          '&:hover::after': {
            transform: 'translateX(100%)',
          },
        },

        '.btn-ghost': {
          background: 'transparent',
          color: 'rgba(255,255,255,0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
          fontWeight: '600',
          borderRadius: '9999px',
          transition: 'all 0.3s ease',
          '&:hover': {
            color: 'white',
            borderColor: 'rgba(255,255,255,0.25)',
            background: 'rgba(255,255,255,0.04)',
          },
        },

        // ── Текстовый stroke ──
        '.text-stroke': {
          WebkitTextStroke: '1px rgba(255,255,255,0.15)',
          WebkitTextFillColor: 'transparent',
        },
        '.text-stroke-brand': {
          WebkitTextStroke: '1px rgba(233,69,96,0.4)',
          WebkitTextFillColor: 'transparent',
        },
      })

      // ── Утилиты ──
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        },
        '.text-gradient': {
          background: 'linear-gradient(135deg, #E94560 0%, #F5A623 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.bg-noise': {
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        },
        '.perspective-800':  { perspective: '800px' },
        '.perspective-1200': { perspective: '1200px' },
        '.preserve-3d':      { transformStyle: 'preserve-3d' },
        '.backface-hidden':  { backfaceVisibility: 'hidden' },
        '.writing-vertical': { writingMode: 'vertical-rl' },
      })
    },
  ],
      }
