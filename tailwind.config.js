/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Paleta Premium de Verdes
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Verdes Premium Específicos
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        jade: {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        sage: {
          400: '#a7f3d0',
          500: '#6ee7b7',
          600: '#34d399',
          700: '#10b981',
        },
        // Cores Base Escuras (Tema Dark)
        base: {
          900: '#070a10', // Fundo principal
          800: '#0f1419',
          700: '#1a1f26',
        },
        // Superfícies (Tema Dark)
        surface: {
          800: '#0f1419',
          700: '#1a1f26',
          600: '#252a32',
        },
        // Slate para textos
        slate: {
          300: '#cbd5e1',
          400: '#94a3b8',
          700: '#334155',
          800: '#1e293b',
        },
        // Cores de Destaque Premium
        accent: {
          gold: '#fbbf24',
          bronze: '#cd7f32',
          copper: '#b87333',
        },
        // Cores do Tema Light
        light: {
          primary: '#ffffff',
          secondary: '#f8fafc',
          surface: '#f1f5f9',
          'surface-light': '#e2e8f0',
          text: '#0f172a',
          'text-secondary': '#334155',
          'text-muted': '#64748b',
          border: '#cbd5e1',
          'border-light': '#e2e8f0',
        }
      },
      container: {
        center: true,
        padding: '1rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glow': '0 0 20px rgba(34, 197, 94, 0.3)',
        'glow-emerald': '0 0 25px rgba(16, 185, 129, 0.4)',
        'glow-jade': '0 0 25px rgba(34, 197, 94, 0.4)',
        'glow-emerald-light': '0 0 25px rgba(5, 150, 105, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      // Configurações para temas
      backgroundColor: {
        'theme-primary': 'var(--bg-primary)',
        'theme-secondary': 'var(--bg-secondary)',
        'theme-surface': 'var(--bg-surface)',
        'theme-surface-light': 'var(--bg-surface-light)',
      },
      textColor: {
        'theme-primary': 'var(--text-primary)',
        'theme-secondary': 'var(--text-secondary)',
        'theme-muted': 'var(--text-muted)',
        'theme-accent': 'var(--accent-primary)',
      },
      borderColor: {
        'theme': 'var(--border-color)',
        'theme-light': 'var(--border-light)',
      },
    },
  },
  plugins: [],
}


