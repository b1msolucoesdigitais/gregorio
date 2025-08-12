# 🎨 Sistema de Temas Light/Dark - Gregório Paisagista

## 📋 Visão Geral

Este projeto implementa um sistema completo de temas **Light** e **Dark** para o site do Gregório Paisagista, mantendo o tema **Dark como padrão** conforme solicitado.

## ✨ Características

- **Tema Dark como padrão** - Mantém a identidade visual original
- **Toggle elegante** no header com ícones de sol/lua
- **Transições suaves** entre os temas
- **Persistência** da preferência do usuário no localStorage
- **Classes CSS responsivas** que se adaptam automaticamente
- **Design consistente** em ambos os temas

## 🎯 Como Funciona

### 1. Context de Tema
```jsx
const ThemeContext = createContext()

function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider')
  }
  return context
}
```

### 2. Provider do Tema
```jsx
function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true) // Dark como padrão
  
  useEffect(() => {
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])
  
  // Aplicar tema ao documento
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])
}
```

### 3. Toggle no Header
```jsx
function Header() {
  const { isDark, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      {isDark ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-400" />}
    </button>
  )
}
```

## 🎨 Sistema de Cores

### Variáveis CSS
```css
:root {
  /* Tema Dark (padrão) */
  --bg-primary: #070a10;
  --bg-secondary: #0f1419;
  --bg-surface: #1a1f26;
  --text-primary: #ffffff;
  --text-secondary: #cbd5e1;
  --accent-primary: #10b981;
}

html.light {
  /* Tema Light */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-surface: #f1f5f9;
  --text-primary: #0f172a;
  --text-secondary: #334155;
  --accent-primary: #059669;
}
```

### Classes Utilitárias
```css
.theme-bg-primary { background-color: var(--bg-primary); }
.theme-bg-secondary { background-color: var(--bg-secondary); }
.theme-bg-surface { background-color: var(--bg-surface); }
.theme-text-primary { color: var(--text-primary); }
.theme-text-secondary { color: var(--text-secondary); }
.theme-border { border-color: var(--border-color); }
```

## 🚀 Como Usar

### 1. Aplicar Classes de Tema
```jsx
// Antes (hardcoded)
<div className="bg-surface-800 text-white border-slate-700">

// Depois (com tema)
<div className="theme-bg-surface theme-text-primary theme-border">
```

### 2. Usar o Hook useTheme
```jsx
function MeuComponente() {
  const { isDark, toggleTheme } = useTheme()
  
  return (
    <div className={isDark ? 'bg-dark' : 'bg-light'}>
      <button onClick={toggleTheme}>
        {isDark ? '☀️' : '🌙'}
      </button>
    </div>
  )
}
```

### 3. Classes Condicionais
```jsx
const themeClasses = isDark ? darkThemeClasses : lightThemeClasses

<div className={`${baseClasses} ${themeClasses.bg}`}>
  Conteúdo
</div>
```

## 📱 Componentes Atualizados

### ✅ Header
- Logo e navegação com cores de tema
- Toggle de tema elegante
- Transições suaves

### ✅ Hero Section
- Textos adaptáveis ao tema
- Cards com fundos temáticos
- Gradientes responsivos

### ✅ Seções de Conteúdo
- Backgrounds automáticos
- Textos legíveis em ambos os temas
- Bordas e sombras consistentes

### ✅ Cards e Elementos
- Superfícies com transparência
- Efeitos glass adaptáveis
- Hover states temáticos

## 🔧 Personalização

### Adicionar Novas Cores
```css
:root {
  --nova-cor: #123456;
}

html.light {
  --nova-cor: #abcdef;
}
```

### Criar Novas Classes
```css
.theme-nova-cor {
  color: var(--nova-cor);
}
```

### Modificar Transições
```css
* {
  transition: background-color 0.3s ease, 
              color 0.3s ease, 
              border-color 0.3s ease;
}
```

## 📊 Performance

- **CSS Variables** para mudanças instantâneas
- **Transições CSS** para animações suaves
- **localStorage** para persistência eficiente
- **Context React** para gerenciamento de estado otimizado

## 🎯 Próximos Passos

1. **Testar em diferentes dispositivos**
2. **Adicionar mais variações de tema**
3. **Implementar tema automático** baseado no sistema
4. **Criar preview de temas** para usuários
5. **Otimizar para acessibilidade** (contraste)

## 🐛 Troubleshooting

### Tema não muda
- Verificar se o `ThemeProvider` está envolvendo o app
- Confirmar se as classes CSS estão sendo aplicadas
- Verificar console para erros

### Cores inconsistentes
- Usar sempre as classes `.theme-*`
- Evitar cores hardcoded
- Verificar se as variáveis CSS estão definidas

### Transições quebradas
- Confirmar se as classes de transição estão aplicadas
- Verificar se não há conflitos de CSS
- Testar em diferentes navegadores

---

**Desenvolvido com ❤️ para o Gregório Paisagista**
*Sistema de temas responsivo e elegante*
