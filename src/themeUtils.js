// Utilitários para aplicação consistente dos temas
export const themeClasses = {
  // Backgrounds
  bg: {
    primary: 'bg-theme-primary',
    secondary: 'bg-theme-secondary', 
    surface: 'bg-theme-surface',
    'surface-light': 'bg-theme-surface-light',
  },
  
  // Textos
  text: {
    primary: 'text-theme-primary',
    secondary: 'text-theme-secondary',
    muted: 'text-theme-muted',
    accent: 'text-theme-accent',
  },
  
  // Bordas
  border: {
    default: 'border-theme',
    light: 'border-theme-light',
  },
  
  // Gradientes que se adaptam ao tema
  gradients: {
    primary: 'from-emerald-500 to-jade-500',
    surface: 'from-theme-surface to-theme-surface-light',
    glass: 'from-theme-surface/50 to-theme-surface-light/50',
  },
  
  // Sombras
  shadows: {
    glow: 'shadow-glow-emerald',
    'glow-light': 'shadow-glow-emerald-light',
  }
}

// Função para obter classes condicionais baseadas no tema
export const getThemeClasses = (isDark, darkClasses, lightClasses) => {
  return isDark ? darkClasses : lightClasses
}

// Classes específicas para cada tema
export const darkThemeClasses = {
  bg: 'bg-base-900',
  surface: 'bg-surface-800',
  'surface-light': 'bg-surface-700',
  text: 'text-white',
  'text-secondary': 'text-slate-300',
  'text-muted': 'text-slate-400',
  border: 'border-slate-700',
  'border-light': 'border-slate-600',
  glass: 'bg-white/5 backdrop-blur-md border border-white/10',
}

export const lightThemeClasses = {
  bg: 'bg-light-primary',
  surface: 'bg-light-surface',
  'surface-light': 'bg-light-surface-light',
  text: 'text-light-text',
  'text-secondary': 'text-light-text-secondary',
  'text-muted': 'text-light-text-muted',
  border: 'border-light-border',
  'border-light': 'border-light-border-light',
  glass: 'bg-black/5 backdrop-blur-md border border-black/10',
}

// Função para aplicar classes de tema
export const applyTheme = (isDark, elementClasses) => {
  const themeClasses = isDark ? darkThemeClasses : lightThemeClasses
  
  return Object.entries(elementClasses).reduce((acc, [key, classes]) => {
    if (themeClasses[key]) {
      acc[key] = `${classes} ${themeClasses[key]}`
    } else {
      acc[key] = classes
    }
    return acc
  }, {})
}
