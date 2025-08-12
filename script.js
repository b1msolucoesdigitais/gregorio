(function () {
  'use strict';

  const root = document.body;
  const whatsappNumber = root.getAttribute('data-whatsapp') || '';
  const formEndpoint = root.getAttribute('data-form-endpoint') || '';
  const publicEmail = root.getAttribute('data-email') || '';
  const publicPhone = root.getAttribute('data-phone') || '';

  // Update contact text
  const phoneSpans = document.querySelectorAll('.contact-phone');
  phoneSpans.forEach((el) => (el.textContent = publicPhone));
  const emailLinks = document.querySelectorAll('.contact-email');
  emailLinks.forEach((el) => (el.href = `mailto:${publicEmail}`));

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll for anchor links to #contato
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Build WhatsApp URL with optional UTM parameters
  function buildWhatsAppUrl(message) {
    const base = `https://wa.me/${whatsappNumber}`;
    const params = new URLSearchParams();
    const defaultMsg = message || 'Olá, gostaria de falar com a equipe do Gregório Paisagista.';
    params.set('text', defaultMsg);
    // propagate UTM if present
    const url = new URL(window.location.href);
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((k) => {
      const v = url.searchParams.get(k);
      if (v) params.set(k, v);
    });
    return `${base}?${params.toString()}`;
  }

  // Attach WhatsApp handlers
  document.querySelectorAll('[data-cta="whatsapp"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nome = document.getElementById('nome')?.value?.trim();
      const msg = nome ? `Olá, sou ${nome} e gostaria de um orçamento.` : undefined;
      window.open(buildWhatsAppUrl(msg), '_blank');
    });
  });

  // Form handling
  const form = document.getElementById('form-contato');
  const feedback = form?.querySelector('.form-feedback');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!feedback) return;
      feedback.textContent = '';

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const data = {
        nome: form.nome?.value?.trim() || '',
        email: form.email?.value?.trim() || '',
        telefone: form.telefone?.value?.trim() || '',
        mensagem: form.mensagem?.value?.trim() || '',
        page: window.location.href,
      };

      // Basic validation
      if (!data.nome || !data.email || !data.mensagem) {
        feedback.textContent = 'Por favor, preencha nome, e-mail e mensagem.';
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      try {
        if (formEndpoint) {
          // Send as JSON
          const res = await fetch(formEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          if (!res.ok) throw new Error('Erro no envio');
          feedback.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
          form.reset();
        } else {
          // Fallback to mailto
          const subject = encodeURIComponent('Contato pelo site - Gregório Paisagista');
          const body = encodeURIComponent(`Nome: ${data.nome}\nE-mail: ${data.email}\nTelefone: ${data.telefone}\n\nMensagem:\n${data.mensagem}`);
          window.location.href = `mailto:${publicEmail}?subject=${subject}&body=${body}`;
          feedback.textContent = 'Abrimos seu cliente de e-mail para finalizar o envio.';
        }
      } catch (err) {
        feedback.textContent = 'Não foi possível enviar agora. Tente pelo WhatsApp ou mais tarde.';
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  // Simple reveal on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll('[data-reveal], .pillar, .testimonial, .gallery-grid img').forEach((el) => observer.observe(el));
})();


