import React, { createContext, useContext, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Sprout, Droplets, Shovel, MessageCircle, Sun, Moon } from 'lucide-react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import ThemePreview from './ThemePreview'

const config = {
  whatsapp: '5531989484903',
  email: 'contato@gregoriopaisagista.com.br',
  phone: '(31) 98948-4903',
  formEndpoint: '', // ex.: https://formspree.io/f/SEU_ID
}

// Context para gerenciar o tema
export const ThemeContext = createContext()

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider')
  }
  return context
}

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true) // Dark como padrão

  useEffect(() => {
    // Verificar preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      // Se não houver preferência salva, usar dark como padrão
      setIsDark(true)
    }
  }, [])

  useEffect(() => {
    // Aplicar tema ao documento
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function Header() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50">
      <div className="glass">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 font-semibold">
            <span className="text-xl">🌿</span>
            <span className="tracking-tight theme-text-primary">Gregório Paisagista</span>
          </motion.div>
                     <nav className="hidden md:flex items-center gap-6 text-sm font-medium theme-text-secondary">
             <a href="#servicos" className="hover:text-theme-primary transition-colors duration-200">Serviços</a>
             <a href="#projetos" className="hover:text-theme-primary transition-colors duration-200">Projetos</a>
             <a href="#sobre" className="hover:text-theme-primary transition-colors duration-200">Sobre</a>
             <a href="#depoimentos" className="hover:text-theme-primary transition-colors duration-200">Depoimentos</a>
             <a href="#contato" className="hover:text-theme-primary transition-colors duration-200">Contato</a>
           </nav>
                               <motion.a
             initial={{ opacity: 0, y: -6 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1 }}
             href={buildWhatsUrl()}
             target="_blank"
             rel="noreferrer"
             className="hover-scale inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-jade-500 px-4 py-2 text-white font-semibold shadow-md shadow-glow-emerald"
           >
             <MessageCircle className="h-4 w-4" /> Entrar em contato
           </motion.a>
           
           {/* Toggle de Tema */}
           <motion.button 
             onClick={toggleTheme} 
             initial={{ opacity: 0, y: -6 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="ml-4 p-2 rounded-xl backdrop-blur-sm border transition-all duration-300 hover:scale-110 theme-bg-surface theme-border hover:theme-bg-surface-light"
             aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
           >
             {isDark ? (
               <Sun className="w-5 h-5 text-yellow-400" />
             ) : (
               <Moon className="w-5 h-5 text-blue-400" />
             )}
           </motion.button>
        </div>
      </div>
    </header>
  )
}

function buildWhatsUrl(message) {
  const params = new URLSearchParams()
  params.set('text', message || 'Olá, gostaria de um orçamento.')
  const url = new URL(window.location.href)
  ;['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k => {
    const v = url.searchParams.get(k)
    if (v) params.set(k, v)
  })
  return `https://wa.me/${config.whatsapp}?${params.toString()}`
}

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      {/* Loading animado */}
      <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ delay: 1, duration: 0.5 }} className="absolute inset-0 z-50 flex items-center justify-center bg-[#070a10]">
        <div className="text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
          <div className="text-2xl font-bold text-white">GREGÓRIO PAISAGISTA</div>
          <div className="text-slate-400 mt-2">Loading...</div>
        </div>
      </motion.div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.img
          initial={{ scale: 1.08, opacity: 0.9 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src="/images/bghero.png"
          alt="Gregório Paisagista"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-theme-primary/95" />
      </div>

      {/* Ícones sutis decorativos */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2, duration: 0.6 }} className="w-16 h-16 bg-emerald-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <Leaf className="w-8 h-8 text-emerald-400" />
        </motion.div>
      </div>
      <div className="absolute top-40 right-20 hidden lg:block">
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.2, duration: 0.6 }} className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <Sprout className="w-6 h-6 text-white/70" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo principal */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="theme-text-primary">
            <h1 className="font-semibold tracking-tight leading-tight text-4xl md:text-6xl mb-6">
              O <span className="text-emerald-500">Arquiteto Paisagista</span> que <span className="theme-text-primary">Revolucionou</span> o<br /> Vale do Aço
            </h1>
            <p className="mt-6 theme-text-primary/90 text-lg md:text-xl leading-relaxed">
              <strong>Gregório</strong> não é apenas mais um paisagista. É o <span className="text-emerald-400 font-semibold">único franqueado Vertigarden</span> da região, 
              responsável por transformar espaços comuns em <span className="text-emerald-400 font-semibold">obras de arte vivas</span>. 
              Sua expertise em solo, nutrição e sistemas sustentáveis fez dele a <span className="text-emerald-400 font-semibold">referência absoluta</span> 
              em paisagismo de alto padrão.
            </p>
            <p className="mt-4 theme-text-primary/80 text-base md:text-lg">
              De residências de luxo a projetos corporativos, cada jardim assinado por Gregório conta uma história de <span className="text-emerald-400 font-medium">excelência técnica</span> 
              e <span className="text-emerald-400 font-medium">visão artística</span> que poucos conseguem replicar.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={buildWhatsUrl('Quero que o Gregório transforme meu espaço.')} target="_blank" rel="noreferrer" className="hover-scale inline-flex items-center rounded-2xl bg-gradient-to-r from-emerald-500 to-jade-500 px-6 py-4 text-white font-semibold shadow-lg shadow-glow-emerald text-lg transition-all duration-300 hover:shadow-glow-emerald/70"><MessageCircle className="mr-3 h-6 w-6"/>Quero o Gregório no meu projeto</a>
            </div>
          </motion.div>

          {/* Card sobreposto estilo HappyHome */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="relative">
            <div className="theme-bg-surface/10 backdrop-blur-md border theme-border-light rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-emerald-400 font-medium text-sm">Exclusividade</span>
              </div>
              <h3 className="text-2xl font-bold theme-text-primary mb-3">Jardins Verticais Vertigarden</h3>
              <p className="theme-text-primary/80 text-sm leading-relaxed mb-6">
                Sistema patenteado exclusivo no Vale do Aço. Transforme qualquer parede em uma obra de arte viva com tecnologia sustentável e acabamento premium.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="theme-text-primary/60 text-xs">Sistema Patenteado</span>
                </div>
               </div>
            </div>

            {/* Métricas em cards menores */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                {k:'anos',v:'10+',desc:'de domínio técnico'},
                {k:'projetos',v:'100+',desc:'que mudaram vidas'},
                {k:'exclusividade',v:'Vertigarden',desc:'único da região'}
              ].map((m,i)=> (
                <motion.div key={i} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:1 + i*0.1}} className="theme-bg-surface/90 backdrop-blur-sm border theme-border rounded-2xl p-4 text-center shadow-lg">
                  <div className="text-xl font-bold text-emerald-500">{m.v}</div>
                  <div className="text-xs theme-text-secondary capitalize">{m.k}</div>
                  <div className="text-xs text-emerald-400 mt-1">{m.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

// Seção de autoridade com números
function AuthoritySection() {
  const stats = [
    { number: '10+', label: 'Anos de Experiência', desc: 'Atuando no mercado' },
    { number: '100+', label: 'Projetos Entregues', desc: 'Com excelência' },
    { number: '500+', label: 'Clientes Satisfeitos', desc: 'Em todo Brasil' },
    { number: '24h', label: 'Tempo de Resposta', desc: 'WhatsApp' }
  ]
  
  return (
    <section className="py-16 theme-bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold theme-text-primary mb-4">Números que Comprovam</h2>
          <p className="theme-text-secondary max-w-2xl mx-auto">Resultados que demonstram nossa autoridade e compromisso com a excelência em paisagismo.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-emerald-500 mb-2">{stat.number}</div>
              <div className="text-lg font-semibold theme-text-primary mb-1">{stat.label}</div>
              <div className="text-sm theme-text-muted">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Seção de serviços estilo HappyHome
function ServicesSection() {
  const [videoOpen, setVideoOpen] = React.useState(false)
  
  const services = [
    {
      title: "Jardins Verticais Vertigarden",
      subtitle: "Sistema Exclusivo",
      description: "Transforme qualquer parede em uma obra de arte viva com o sistema patenteado Vertigarden, exclusivo no Vale do Aço.",
      image: "/images/vertigarden.png",
      video: "/images/videojardimertigarden.mp4",
      features: [
        "Sistema patenteado com alta durabilidade",
        "Drenagem e irrigação integradas", 
        "Estética premium para áreas internas e externas",
        "Garantia de qualidade internacional"
      ],
      cta: "Quero meu jardim vertical",
      ctaMsg: "Quero um Jardim Vertical Vertigarden."
    },
    {
      title: "Projetos Paisagísticos",
      subtitle: "Conceito Autoral",
      description: "Projetos únicos que harmonizam arquitetura, clima e solo, criando espaços que contam histórias e elevam o valor do patrimônio.",
      image: "/images/paisagismo2.jpg",
      features: [
        "Conceito, anteprojeto e executivo",
        "Estudos de insolação, clima e espécies",
        "Entrega técnica e autoral",
        "Sustentabilidade integrada"
      ],
      cta: "Quero um projeto sob medida",
      ctaMsg: "Tenho um projeto para discutir."
    }
  ]

  return (
    <section id="servicos" className="py-20 theme-bg-surface">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold theme-text-primary mb-6">
            Serviços <span className="text-emerald-500">Exclusivos</span> que Transformam
          </h2>
          <p className="theme-text-secondary max-w-3xl mx-auto text-lg leading-relaxed">
            Oferecemos diferentes tipos de serviços com a qualidade e exclusividade que só Gregório pode entregar. 
            Cada projeto é uma obra única que eleva o padrão do seu espaço.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative overflow-hidden rounded-3xl theme-bg-surface-light border theme-border shadow-2xl hover:shadow-glow-emerald/20 transition-all duration-500 hover:scale-[1.02]"
            >
                             <div className="relative h-64 overflow-hidden rounded-t-3xl">
                 <img 
                   src={service.image} 
                   alt={service.title}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                 
                 {/* Badge de subtítulo */}
                 <div className="absolute bottom-4 left-4">
                   <span className="inline-block bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                     {service.subtitle}
                   </span>
                 </div>
                 
                 {/* Botão de vídeo para Jardins Verticais */}
                 {service.video && (
                   <div className="absolute top-4 right-4">
                     <button
                       onClick={() => setVideoOpen(true)}
                       className="group/play inline-flex items-center justify-center w-12 h-12 bg-emerald-500/90 backdrop-blur-sm text-white rounded-full hover:bg-emerald-500 transition-all duration-300 hover:scale-110 shadow-lg"
                       aria-label="Assistir vídeo"
                     >
                       <svg className="w-5 h-5 ml-0.5 group-hover/play:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M8 5v14l11-7z"/>
                       </svg>
                     </button>
                   </div>
                 )}
               </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold theme-text-primary mb-4">{service.title}</h3>
                <p className="theme-text-secondary leading-relaxed mb-6">{service.description}</p>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      <span className="theme-text-secondary text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                                <a
                href={buildWhatsUrl(service.ctaMsg)}
                target="_blank"
                rel="noreferrer"
                className="hover-scale inline-flex items-center rounded-2xl bg-gradient-to-r from-emerald-500 to-jade-500 px-6 py-3 text-white font-semibold shadow-lg shadow-glow-emerald transition-all duration-300 hover:shadow-glow-emerald/70"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {service.cta}
              </a>
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Modal de Vídeo */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setVideoOpen(false)}
          >
                         <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="relative w-full max-w-sm mx-4 bg-black rounded-2xl overflow-hidden shadow-2xl"
               style={{ aspectRatio: '9/16' }}
               onClick={(e) => e.stopPropagation()}
             >
                             {/* Botão de fechar */}
               <button
                 onClick={() => setVideoOpen(false)}
                 className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors duration-200 flex items-center justify-center"
                 aria-label="Fechar vídeo"
               >
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>
              
                             {/* Vídeo */}
               <video
                 className="w-full h-full object-cover"
                 controls
                 autoPlay
                 loop
                 playsInline
                 controlsList="nodownload"
               >
                <source src="/images/videojardimertigarden.mp4" type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Skills com porcentagens estilo HappyHome
function SkillsSection() {
  const skills = [
    { 
      name: 'Jardins Verticais', 
      percentage: 98, 
      icon: Leaf,
      description: 'Domínio absoluto em sistemas Vertigarden e técnicas de implantação vertical'
    },
    { 
      name: 'Projetos Paisagísticos', 
      percentage: 95, 
      icon: Sprout,
      description: 'Conceitos autorais que harmonizam arquitetura e natureza'
    },
    { 
      name: 'Irrigação Inteligente', 
      percentage: 92, 
      icon: Droplets,
      description: 'Sistemas automatizados para eficiência hídrica máxima'
    },
    { 
      name: 'Implantação', 
      percentage: 96, 
      icon: Shovel,
      description: 'Execução impecável com materiais premium e técnicas avançadas'
    }
  ]
  
  return (
    <section className="py-20 theme-bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold theme-text-primary mb-6">
            Nossas <span className="text-emerald-500">Especialidades</span> em Números
          </h2>
          <p className="theme-text-secondary max-w-3xl mx-auto text-lg leading-relaxed">
            Domínio técnico comprovado em cada área de atuação, com resultados que falam por si.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: i * 0.1 }} 
              className="group relative theme-bg-surface/50 backdrop-blur-sm border theme-border rounded-3xl p-8 hover:theme-bg-surface/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center group-hover:bg-emerald-500/30 transition-colors duration-300">
                  <skill.icon className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold theme-text-primary mb-2">{skill.name}</h3>
                  <p className="theme-text-secondary text-sm leading-relaxed">{skill.description}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="theme-text-primary font-medium">Proficiência</span>
                  <span className="text-emerald-500 font-bold text-lg">{skill.percentage}%</span>
                </div>
                <div className="w-full theme-bg-surface-light rounded-full h-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    whileInView={{ width: `${skill.percentage}%` }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }} 
                    className="bg-gradient-to-r from-emerald-500 to-jade-500 h-3 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </motion.div>
                </div>
              </div>
              
              {/* Badge de destaque */}
              <div className="absolute top-4 right-4">
                <span className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500/30">
                  Expert
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA adicional */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6, delay: 0.4 }} 
          className="text-center mt-12"
        >
          <p className="text-slate-300 mb-6">Quer ver essas habilidades em ação?</p>
                      <a
              href={buildWhatsUrl('Quero ver o Gregório aplicando essas especialidades no meu projeto.')}
              target="_blank"
              rel="noreferrer"
              className="hover-scale inline-flex items-center rounded-2xl bg-gradient-to-r from-emerald-500 to-jade-500 px-8 py-4 text-white font-semibold shadow-lg shadow-glow-emerald text-lg transition-all duration-300 hover:shadow-glow-emerald/70"
            >
              <MessageCircle className="mr-3 h-6 w-6" />
              Aplicar no Meu Projeto
            </a>
        </motion.div>
      </div>
    </section>
  )
}

// Prêmios e reconhecimentos
function AwardsSection() {
  const awards = [
    { title: 'Melhor Projeto Paisagístico', year: '2024', desc: 'Prêmio de Excelência em Arquitetura' },
    { title: 'Parceiro Vertigarden', year: '2023', desc: 'Certificação de Qualidade' },
    { title: 'Inovação em Sustentabilidade', year: '2022', desc: 'Reconhecimento Nacional' }
  ]
  
  return (
    <section className="py-16 theme-bg-surface">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold theme-text-primary mb-4">Prêmios & Reconhecimentos</h2>
          <p className="theme-text-secondary max-w-2xl mx-auto">Excelência reconhecida pela indústria e clientes.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {awards.map((award, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="theme-bg-secondary rounded-2xl p-6 border theme-border">
              <div className="text-emerald-500 text-sm font-medium mb-2">{award.year}</div>
              <h3 className="text-xl font-semibold theme-text-primary mb-2">{award.title}</h3>
              <p className="theme-text-secondary">{award.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="sobre" className="py-20 theme-bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative">
            <img
              src="/images/gregorio.png"
              alt="Gregório Paisagista"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
            {/* Selo de prêmio sobreposto estilo HappyHome */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -top-6 -right-6 bg-gradient-to-br from-emerald-500 to-jade-600 rounded-2xl p-4 shadow-2xl border border-emerald-400/30"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-xs text-emerald-100 font-medium">Prêmios</div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="glass inline-flex items-center rounded-full px-4 py-2 text-sm text-emerald-400 font-medium">Exclusividade</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold theme-text-primary leading-tight">
              Por que Gregório é <span className="text-emerald-500">único</span>?
            </h2>
            
            <div className="space-y-4">
              <p className="theme-text-secondary leading-relaxed text-lg">
                <strong>Arquiteto paisagista</strong> com formação sólida, mas o que realmente o diferencia é sua <span className="text-emerald-400 font-medium">exclusividade no mercado</span>. 
                Como <strong>único franqueado Vertigarden do Vale do Aço</strong>, Gregório oferece o que ninguém mais na região consegue: 
                sistemas patenteados de jardins verticais com garantia de qualidade internacional.
              </p>
              <p className="theme-text-secondary leading-relaxed text-lg">
                Sua <span className="text-emerald-400 font-medium">expertise em solo e nutrição</span> não vem apenas de livros - é fruto de anos de experimentação 
                e projetos reais que transformaram espaços problemáticos em jardins exuberantes. 
                <strong>Gregório não segue tendências, ele as cria</strong>.
              </p>
            </div>

            {/* Lista de diferenciais com ícones */}
            <div className="grid gap-3 mt-6">
              {[
                'Sistema Vertigarden exclusivo na região',
                'Expertise comprovada em solo e nutrição',
                'Projetos que transformam espaços problemáticos',
                'Criador de tendências, não seguidor'
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="theme-text-secondary">{item}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex gap-4 flex-wrap pt-4">
              <a href={buildWhatsUrl('Quero falar com o Gregório sobre meu projeto.')} target="_blank" rel="noreferrer" className="hover-scale inline-flex items-center rounded-2xl bg-gradient-to-r from-emerald-500 to-jade-500 px-6 py-4 text-white font-semibold shadow-lg shadow-glow-emerald transition-all duration-300 hover:shadow-glow-emerald/70">
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar com o Gregório
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Produto base section (layout alternado)
function ProductSection({ id, label = 'Produto', title, description, bullets = [], image, imageAlt, reverse = false, primaryText, primaryMsg, secondaryText, secondaryHref }) {
  return (
    <section id={id} className="py-12">
      <div className={`container mx-auto px-4 grid gap-6 md:grid-cols-2 items-center ${reverse ? 'md:[&>div:first-child]:order-2' : ''}`}>
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
          <span className="glass inline-flex items-center rounded-full px-2 py-1 text-xs text-slate-200 mb-2">{label}</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">{title}</h2>
          <p className="mt-2 text-slate-300">{description}</p>
          {bullets.length > 0 && (
            <ul className="mt-3 space-y-1 text-slate-200">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-emerald-500">•</span><span>{b}</span></li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {primaryText && (
              <a href={buildWhatsUrl(primaryMsg)} target="_blank" rel="noreferrer" className="hover-scale btn-like bg-gradient-to-r from-emerald-500 to-jade-500 text-white shadow-glow-emerald">{primaryText}</a>
            )}
            {secondaryText && (
              <a href={secondaryHref || '#contato'} className="hover-scale btn-like border border-slate-700 text-white">{secondaryText}</a>
            )}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: 0.05 }}>
          <img src={image} alt={imageAlt} className="w-full h-full object-cover rounded-3xl shadow-xl hover-scale" />
        </motion.div>
      </div>
    </section>
  )
}

function VerticalGardensSection() {
  return (
    <ProductSection
      id="jardins-verticais"
      title="Jardins Verticais (Vertigarden)"
      description="Sistema certificado, sustentável e de alta durabilidade. Integra drenagem e irrigação, com acabamento impecável para áreas internas e externas."
      bullets={[
        'Sistema patenteado com alta durabilidade',
        'Drenagem e irrigação integradas',
        'Estética premium para áreas internas e externas',
      ]}
      image="https://images.unsplash.com/photo-1496483648148-47c686dc86a8?q=80&w=1776&auto=format&fit=crop"
      imageAlt="Parede verde exuberante com folhagens"
      primaryText="Quero meu jardim vertical"
      primaryMsg="Quero um Jardim Vertical Vertigarden."
      secondaryText="Ver galeria"
      secondaryHref="#galeria-verticais"
    />
  )
}

function ProjectsSection() {
  return (
    <ProductSection
      id="projetos"
      reverse
      title="Projetos Paisagísticos"
      description="Concepção técnica, estética e sustentável. Projetos autorais alinhados à arquitetura, clima e solo, com especificações precisas."
      bullets={[
        'Conceito, anteprojeto e executivo',
        'Estudos de insolação, clima e espécies',
        'Entrega técnica e autoral',
      ]}
      image="https://images.unsplash.com/photo-1523419409543-a5e549c1d29f?q=80&w=1776&auto=format&fit=crop"
      imageAlt="Jardim frontal de residência contemporânea"
      primaryText="Quero um projeto sob medida"
      primaryMsg="Tenho um projeto para discutir."
    />
  )
}

function IrrigationSection() {
  return (
    <ProductSection
      id="irrigacao"
      title="Irrigação"
      description="Automação com consumo inteligente, cobertura homogênea e precisão. Plantas saudáveis o ano todo com manutenção simples."
      bullets={[
        'Automação com programação por zonas',
        'Consumo otimizado e monitoramento',
        'Manutenção facilitada',
      ]}
      image="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1776&auto=format&fit=crop"
      imageAlt="Close de irrigador automático em gramado"
      primaryText="Quero irrigação automatizada"
      primaryMsg="Gostaria de irrigação automatizada."
      reverse
    />
  )
}

function ImplementationSection() {
  return (
    <ProductSection
      id="implantacao"
      title="Implantação de Jardins"
      description="Execução de alto padrão com curadoria de espécies e substratos, drenagem, preparo de solo e acabamentos impecáveis."
      bullets={[
        'Curadoria de espécies e substratos',
        'Drenagem, preparo de solo e acabamentos',
        'Execução rápida e impecável',
      ]}
      image="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1776&auto=format&fit=crop"
      imageAlt="Equipe implantando jardim com pedras e plantas"
      primaryText="Quero implantar meu jardim"
      primaryMsg="Quero implantar meu jardim."
    />
  )
}

function Gallery() {
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [currentProject, setCurrentProject] = React.useState(null)
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
  
  const projects = [
    {
      title: 'Jardim Vertical Vertigarden',
      category: 'Jardins Verticais',
      location: 'Belo Horizonte, MG',
      images: [
        '/images/vertigarden.png',
        '/images/vertigarden2.png',
        '/images/paisagismo.jpg'
      ]
    },
    {
      title: 'Projeto Paisagístico Residencial',
      category: 'Paisagismo',
      location: 'Vale do Aço, MG',
      images: [
        '/images/paisagismo2.jpg',
        '/images/paisagismo.jpg',
        '/images/vertigarden.png'
      ]
    },
    {
      title: 'Jardim de Inverno',
      category: 'Interiores',
      location: 'São Paulo, SP',
      images: [
        '/images/paisagismo.jpg',
        '/images/vertigarden2.png',
        '/images/paisagismo2.jpg'
      ]
    },
    {
      title: 'Paisagismo Sustentável',
      category: 'Sustentabilidade',
      location: 'Rio de Janeiro, RJ',
      images: [
        '/images/vertigarden.png',
        '/images/paisagismo.jpg',
        '/images/vertigarden2.png'
      ]
    },
    {
      title: 'Sistema de Irrigação',
      category: 'Tecnologia',
        location: 'Minas Gerais',
        images: [
                  '/images/paisagismo2.jpg',
        '/images/vertigarden.png',
        '/images/paisagismo.jpg'
        ]
      },
      {
        title: 'Jardim Contemporâneo',
        category: 'Design',
        location: 'Brasil',
        images: [
                  '/images/vertigarden2.png',
        '/images/paisagismo2.jpg',
        '/images/vertigarden.png'
        ]
      }
    ]

  const openLightbox = (project, imageIndex = 0) => {
    setCurrentProject(project)
    setCurrentImageIndex(imageIndex)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setCurrentProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (currentProject) {
      setCurrentImageIndex((prev) => 
        prev === currentProject.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (currentProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentProject.images.length - 1 : prev - 1
      )
    }
  }
  
  return (
         <section id="projetos" className="py-20 theme-bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.6 }} 
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold theme-text-primary mb-6">
            Projetos <span className="text-emerald-500">Recentes</span> que Inspiram
          </h2>
          <p className="theme-text-secondary max-w-3xl mx-auto text-lg leading-relaxed">
            Descubra nossa galeria de projetos que transformaram espaços comuns em obras de arte vivas. 
            Cada imagem conta uma história de excelência e inovação.
          </p>
        </motion.div>

                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
           {projects.map((project, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
               className="group relative overflow-hidden rounded-3xl theme-bg-surface-light border theme-border shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer"
               onClick={() => openLightbox(project)}
             >
               <div className="relative aspect-[4/3] overflow-hidden">
                 <img 
                   src={project.images[0]} 
                   alt={project.title}
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 
                 {/* Informações sobrepostas no hover */}
                 <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                   <div className="space-y-2">
                     <span className="inline-block bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                       {project.category}
                     </span>
                     <h3 className="text-lg font-bold text-white">{project.title}</h3>
                     <p className="text-slate-200 text-sm">{project.location}</p>
                   </div>
                 </div>

                 {/* Indicador de galeria */}
                 <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-500/90 backdrop-blur-sm text-white rounded-full">
                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                     </svg>
                   </div>
                 </div>

                 {/* Contador de imagens */}
                 <div className="absolute top-4 left-4">
                   <span className="inline-block bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                     {project.images.length} fotos
                   </span>
                 </div>
               </div>
             </motion.div>
           ))}
         </div>

                 {/* CTA centralizado */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }} 
           whileInView={{ opacity: 1, y: 0 }} 
           viewport={{ once: true }} 
           transition={{ duration: 0.6, delay: 0.3 }} 
           className="text-center mt-12"
         >
           <a 
             href={buildWhatsUrl('Quero ver mais projetos e inspirar meu espaço.')} 
             target="_blank" 
             rel="noreferrer" 
             className="hover-scale inline-flex items-center rounded-2xl bg-gradient-to-r from-emerald-500 to-jade-500 px-8 py-4 text-white font-semibold shadow-lg shadow-glow-emerald text-lg transition-all duration-300 hover:shadow-glow-emerald/70"
           >
             <MessageCircle className="mr-3 h-6 w-6" />
             Quero Inspirar Meu Espaço
           </a>
         </motion.div>
       </div>

       {/* Lightbox de Galeria */}
       <AnimatePresence>
         {lightboxOpen && currentProject && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
             onClick={closeLightbox}
           >
             <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="relative max-w-6xl w-full mx-4 bg-black rounded-2xl overflow-hidden shadow-2xl"
               onClick={(e) => e.stopPropagation()}
             >
               {/* Header do Lightbox */}
               <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6">
                 <div className="flex items-center justify-between">
                   <div>
                     <h3 className="text-2xl font-bold text-white">{currentProject.title}</h3>
                     <p className="text-slate-300">{currentProject.category} • {currentProject.location}</p>
                   </div>
                   <button
                     onClick={closeLightbox}
                     className="w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors duration-200 flex items-center justify-center"
                     aria-label="Fechar galeria"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   </button>
                 </div>
               </div>

               {/* Imagem Principal */}
               <div className="relative aspect-[16/9] overflow-hidden">
                 <img
                   src={currentProject.images[currentImageIndex]}
                   alt={`${currentProject.title} - Imagem ${currentImageIndex + 1}`}
                   className="w-full h-full object-cover"
                 />
                 
                 {/* Navegação de Imagens */}
                 <button
                   onClick={prevImage}
                   className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors duration-200 flex items-center justify-center"
                   aria-label="Imagem anterior"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                   </svg>
                 </button>
                 
                 <button
                   onClick={nextImage}
                   className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors duration-200 flex items-center justify-center"
                   aria-label="Próxima imagem"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </button>

                 {/* Indicador de Imagem */}
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                   <span className="inline-block bg-black/50 backdrop-blur-sm text-white text-sm font-medium px-3 py-1 rounded-full">
                     {currentImageIndex + 1} de {currentProject.images.length}
                   </span>
                 </div>
               </div>

               {/* Miniaturas */}
               <div className="p-6 bg-surface-800">
                 <div className="flex gap-3 overflow-x-auto pb-2">
                   {currentProject.images.map((image, index) => (
                     <button
                       key={index}
                       onClick={() => setCurrentImageIndex(index)}
                       className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                         index === currentImageIndex 
                           ? 'border-emerald-500 scale-110' 
                           : 'border-slate-600 hover:border-slate-400'
                       }`}
                     >
                       <img
                         src={image}
                         alt={`Miniatura ${index + 1}`}
                         className="w-full h-full object-cover"
                       />
                     </button>
                   ))}
                 </div>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
     </section>
  )
}

function Testimonials() {
  const items = [
    { q: 'Resultado impecável. O jardim elevou o projeto a outro nível.', a: 'Cliente Residencial, BH', rating: 5 },
    { q: 'Execução precisa e manutenção simples. Viramos fãs dos jardins verticais.', a: 'Escritório Corporativo, Vale do Aço', rating: 5 },
    { q: 'Equipe cuidadosa, projeto autoral e sustentável. Recomendo.', a: 'Arquiteta Parceira', rating: 5 }
  ]
  return (
    <section id="depoimentos" className="py-14">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold theme-text-primary mb-4">Depoimentos dos Clientes</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl font-bold text-emerald-500">5.0</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <span key={i} className="text-accent-gold">★</span>)}
            </div>
          </div>
          <p className="theme-text-secondary">100+ Clientes Avaliaram</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.blockquote
              key={i}
              className="rounded-2xl border theme-border theme-bg-surface p-6 shadow-sm theme-text-secondary"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, i) => <span key={i} className="text-accent-gold">★</span>)}
            </div>
              <p className="text-lg theme-text-primary">"{t.q}"</p>
              <footer className="theme-text-muted mt-2">— {t.a}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const msg = 'Por favor, preencha nome, e-mail e mensagem.'
    if (!data.nome || !data.email || !data.mensagem) {
      alert(msg)
      return
    }
    if (config.formEndpoint) {
      try {
        const res = await fetch(config.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, page: window.location.href }) })
        if (!res.ok) throw new Error('Erro no envio')
        alert('Mensagem enviada com sucesso!')
        form.reset()
      } catch (err) {
        alert('Não foi possível enviar agora. Tente novamente ou use o WhatsApp.')
      }
    } else {
      const subject = encodeURIComponent('Contato pelo site - Gregório Paisagista')
      const body = encodeURIComponent(`Nome: ${data.nome}\nE-mail: ${data.email}\nTelefone: ${data.telefone || ''}\n\nMensagem:\n${data.mensagem}`)
      window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`
    }
  }

  return (
    <section id="contato" className="py-20 theme-bg-primary relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-jade-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-sage-500 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header da seção */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
                               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <MessageCircle className="w-4 h-4" />
            Vamos Conversar
          </div>
          <h2 className="text-4xl md:text-5xl font-bold theme-text-primary mb-6">
            Transforme seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-jade-400">Espaço</span> com o Gregório
          </h2>
          <p className="text-xl theme-text-secondary max-w-3xl mx-auto leading-relaxed">
            Conecte-se diretamente com a autoridade em paisagismo. Cada projeto é único e merece atenção personalizada.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Card de informações de contato */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="rounded-3xl bg-surface-700/50 backdrop-blur-sm border border-slate-600/50 p-8 shadow-2xl hover:shadow-glow-emerald/20 transition-all duration-500 hover:scale-[1.02]">
              <div className="text-center mb-8">
                                                 <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-jade-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Canais de Atendimento</h3>
                <p className="text-slate-400">Escolha a forma mais conveniente para você</p>
              </div>

              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300">
                  <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">WhatsApp</h4>
                    <p className="text-sm text-slate-400">Resposta em até 5 minutos</p>
                  </div>
                  <a 
                    href={buildWhatsUrl('Olá! Gostaria de um orçamento para meu projeto.')}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-[#25D366] text-white rounded-xl text-sm font-medium hover:bg-[#20ba5a] transition-colors duration-300"
                  >
                    Conversar
                  </a>
                </div>

                {/* Telefone */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-700/30 border border-slate-600/30 hover:bg-slate-700/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">Telefone</h4>
                    <p className="text-sm text-slate-400">Atendimento direto</p>
                  </div>
                  <a 
                    href={`tel:${config.phone.replace(/\D/g, '')}`}
                    className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors duration-300"
                  >
                    Ligar
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-700/30 border border-slate-600/30 hover:bg-slate-700/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-jade-500 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">E-mail</h4>
                    <p className="text-sm text-slate-400">Resposta em até 24h</p>
                  </div>
                  <a 
                    href={`mailto:${config.email}`}
                    className="px-4 py-2 bg-jade-500 text-white rounded-xl text-sm font-medium hover:bg-jade-600 transition-colors duration-300"
                  >
                    Enviar
                  </a>
                </div>
              </div>

              {/* CTA principal */}
              <div className="mt-8 text-center">
                                 <a 
                   href={buildWhatsUrl('Quero que o Gregório transforme meu espaço!')}
                   target="_blank"
                   rel="noreferrer"
                   className="hover-scale inline-flex items-center justify-center w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-jade-500 px-6 py-4 text-white font-semibold shadow-lg shadow-glow-emerald text-lg transition-all duration-300 hover:shadow-glow-emerald/70"
                 >
                                     <MessageCircle className="mr-3 h-6 w-6" />
                  Quero o Gregório no Meu Projeto
                 </a>
              </div>
            </div>
          </motion.div>

          {/* Formulário de contato */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="rounded-3xl bg-surface-700/50 backdrop-blur-sm border border-slate-600/50 p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Envie sua Mensagem</h3>
                <p className="text-slate-400">Conte sobre seu projeto e receba um orçamento personalizado</p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="nome" className="block text-sm font-semibold text-white">
                      Nome Completo *
                    </label>
                    <input 
                      id="nome" 
                      name="nome" 
                      type="text" 
                      placeholder="Seu nome completo" 
                      className="w-full px-4 py-3 rounded-2xl bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-white">
                      E-mail *
                    </label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="voce@email.com" 
                      className="w-full px-4 py-3 rounded-2xl bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300" 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="telefone" className="block text-sm font-semibold text-white">
                    Telefone
                  </label>
                  <input 
                    id="telefone" 
                    name="telefone" 
                    type="tel" 
                    placeholder="(DDD) 00000-0000" 
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300" 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="mensagem" className="block text-sm font-semibold text-white">
                    Mensagem *
                  </label>
                  <textarea 
                    id="mensagem" 
                    name="mensagem" 
                    rows="5" 
                    placeholder="Conte sobre seu projeto, espaço disponível, estilo desejado e qualquer detalhe importante..." 
                    className="w-full px-4 py-3 rounded-2xl bg-slate-800/50 border border-slate-600/50 text-white placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 resize-none" 
                    required 
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-slate-400">
                    * Campos obrigatórios
                  </p>
                                     <button 
                     type="submit" 
                     className="hover-scale inline-flex items-center rounded-2xl bg-gradient-to-r from-emerald-500 to-jade-500 px-8 py-4 text-white font-semibold shadow-lg shadow-glow-emerald text-lg transition-all duration-300 hover:shadow-glow-emerald/70"
                   >
                                         <MessageCircle className="mr-3 h-5 w-5" />
                    Enviar Mensagem
                   </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Seção de garantias */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Resposta Garantida</h4>
              <p className="text-slate-400">Sempre retornamos em até 24 horas</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-jade-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-jade-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Orçamento Gratuito</h4>
              <p className="text-slate-400">Avaliação inicial sem compromisso</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sage-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Execução Rápida</h4>
              <p className="text-slate-400">Projetos entregues no prazo</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t theme-border theme-bg-secondary/80">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between theme-text-secondary">
        <p>© {new Date().getFullYear()} Gregório Paisagista. Todos os direitos reservados.</p>
        <a href="#contato" className="text-emerald-500 hover:underline">Contato</a>
      </div>
    </footer>
  )
}

function WhatsFab() {
  return (
    <a
      href={buildWhatsUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir conversa no WhatsApp"
      className="fixed right-4 bottom-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl hover:brightness-105"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </a>
  )
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <div className="min-h-full flex flex-col">
          <Helmet>
            <title>Gregório Paisagista — Jardins Verticais, Projetos Paisagísticos, Irrigação e Implantação</title>
            <meta name="description" content="Autoridade nacional em Jardins Verticais (Vertigarden), Projetos Paisagísticos, Irrigação e Implantação. Excelência técnica e estética." />
            <link rel="canonical" href="https://gregoriopaisagista.com.br/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Gregório Paisagista — Autoridade em Paisagismo" />
            <meta property="og:description" content="Jardins Verticais (Vertigarden), Projetos Paisagísticos, Irrigação e Implantação. Atendimento nacional." />
            <meta property="og:image" content="https://images.unsplash.com/photo-1523419409543-a5e549c1d29f?w=1200&q=80&auto=format&fit=crop" />
          </Helmet>
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Gregório",
            "jobTitle": "Arquiteto Paisagista",
            "url": "https://gregoriopaisagista.com.br/",
            "worksFor": { "@type": "Organization", "name": "Gregório Paisagista" }
          })}</script>

          <Header />
          <main className="flex-1">
            <Hero />
            <AuthoritySection />
            <About />
            <ServicesSection />
            <Gallery />
            <SkillsSection />
            <AwardsSection />
            <Testimonials />
            <Contact />
          </main>
                  <Footer />
        <WhatsFab />
        <ThemePreview />
      </div>
    </ThemeProvider>
  </HelmetProvider>
  )
}

export default App

// utilitários agora estão em src/styles.css via @apply


