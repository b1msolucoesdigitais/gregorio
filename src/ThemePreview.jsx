import React from 'react'
import { useTheme } from './App'

function ThemePreview() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="fixed bottom-20 right-4 z-40">
      <div className="bg-theme-surface border theme-border rounded-2xl p-4 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-3">
          <h4 className="text-sm font-semibold theme-text-primary mb-1">
            Preview do Tema
          </h4>
          <p className="text-xs theme-text-muted">
            {isDark ? 'Modo Escuro' : 'Modo Claro'}
          </p>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="theme-text-secondary">Fundo:</span>
            <div className="w-4 h-4 rounded theme-bg-primary border theme-border"></div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="theme-text-secondary">Superfície:</span>
            <div className="w-4 h-4 rounded theme-bg-surface border theme-border"></div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="theme-text-secondary">Texto:</span>
            <div className="w-4 h-4 rounded bg-current theme-text-primary"></div>
          </div>
        </div>
        
        <button
          onClick={toggleTheme}
          className="w-full text-xs px-3 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors duration-200"
        >
          Alternar Tema
        </button>
      </div>
    </div>
  )
}

export default ThemePreview
