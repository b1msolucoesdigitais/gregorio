# Gregório Paisagista – Landing Page (React + Vite + Tailwind)

Landing page moderna, responsiva e otimizada para conversão com React, Vite e Tailwind.

## Rodar localmente
1. Instale dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Abra `http://localhost:5173` no navegador.

## Build
```bash
npm run build && npm run preview
```

## Configuração de contato
Edite `src/App.jsx` no objeto `config`:
- `whatsapp`: número em dígitos com DDI+DDD (ex.: `5531999999999`).
- `email` e `phone`: contatos exibidos no site.
- `formEndpoint`: URL (ex.: Formspree). Se vazio, usa `mailto:` como fallback.

## Seções
- Hero com foto masculina placeholder, glassmorphism e CTAs.
- Sobre, Pilares (destaque Jardins Verticais e Projetos), Galeria, Depoimentos e Contato.
- Botão flutuante de WhatsApp.

## Imagens
As imagens usam Unsplash como placeholders. Substitua pelas fotos reais conforme necessário.