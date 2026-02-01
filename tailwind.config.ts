import type { Config } from 'tailwindcss'
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        aurora: "aurora 60s linear infinite",
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'chat-glow': 'chatGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        chatGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1.15)' },
          '50%': { opacity: '0.7', transform: 'scale(1.25)' },
        },
      },
      boxShadow: {
        'chat': '0 0 0 0 rgba(99, 102, 246, 0.4), 0 10px 40px -10px rgba(99, 102, 246, 0.35), 0 0 60px -15px rgba(168, 85, 247, 0.25)',
        'chat-hover': '0 0 0 0 rgba(99, 102, 246, 0.5), 0 20px 50px -12px rgba(99, 102, 246, 0.45), 0 0 80px -10px rgba(168, 85, 247, 0.4)',
      },
      fontFamily: {
        mono: ['var(--font-roboto-mono)'],
        serif: ['ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: {
          light: '#fafafa',
          dark: '#0f0f0f',
        },
        surface: {
          light: '#ffffff',
          dark: '#1a1a1a',
        },
        border: {
          light: '#e5e7eb',
          dark: '#374151',
        },
        accent: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
          success: '#10b981',
          warning: '#f59e0b',
        },
        text: {
          primary: {
            light: '#1f2937',
            dark: '#f9fafb',
          },
          secondary: {
            light: '#6b7280',
            dark: '#9ca3af',
          },
          accent: {
            light: '#4f46e5',
            dark: '#818cf8',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.5rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2.25rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 3rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.9rem + 1.75vw, 3.75rem)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    addVariablesForColors
  ],
}

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

export default config 