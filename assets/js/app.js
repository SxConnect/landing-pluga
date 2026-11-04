/**
 * Pluga Flow - Landing Page Controller
 * Subdomínio: pluga.xpanel.com.br
 */

document.addEventListener('DOMContentLoaded', () => {
  // Configurações globais - SxConnect Oficial
  const CONFIG = {
    whatsappNumber: '5521987000079', // WhatsApp oficial da SxConnect (desenvolvedora do Pluga Flow)
    subdomain: 'pluga.xpanel.com.br',
    companyName: 'Pluga Flow • SXConnect'
  };

  /* ==========================================
     1. MENU MOBILE & OVERLAY
     ========================================== */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    mobileMenu.classList.remove('-translate-x-full');
    mobileOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.add('-translate-x-full');
    mobileOverlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', openMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ==========================================
     2. NAVEGAÇÃO SUAVE E SCROLL SPY
     ========================================== */
  const navLinks = document.querySelectorAll('header nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-[#00e676]', 'font-bold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-[#00e676]', 'font-bold');
      }
    });
  });

  /* ==========================================
     3. ACCORDION FAQ
     ========================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Fecha outros itens
      faqItems.forEach(other => other.classList.remove('active'));
      // Abre o atual se não estava ativo
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ==========================================
     4. MODAL DE DEMONSTRAÇÃO INTERATIVA
     ========================================== */
  const demoModal = document.getElementById('demoModal');
  const openDemoBtns = document.querySelectorAll('.btn-open-demo');
  const closeDemoBtn = document.getElementById('closeDemoModal');
  const demoOverlay = document.getElementById('demoOverlay');

  function openDemo() {
    if (!demoModal) return;
    demoModal.classList.remove('hidden');
    demoModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeDemo() {
    if (!demoModal) return;
    demoModal.classList.add('hidden');
    demoModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  openDemoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDemo();
    });
  });

  if (closeDemoBtn) closeDemoBtn.addEventListener('click', closeDemo);
  if (demoOverlay) demoOverlay.addEventListener('click', closeDemo);

  // Esc para fechar modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDemo();
      closeContactModal();
    }
  });

  /* Tabs de Demonstração (Cardápio vs Painel) */
  const tabCustomer = document.getElementById('tabDemoCustomer');
  const tabAdmin = document.getElementById('tabDemoAdmin');
  const viewCustomer = document.getElementById('demoViewCustomer');
  const viewAdmin = document.getElementById('demoViewAdmin');

  if (tabCustomer && tabAdmin && viewCustomer && viewAdmin) {
    tabCustomer.addEventListener('click', () => {
      tabCustomer.classList.add('bg-[#00e676]', 'text-slate-900', 'font-bold');
      tabCustomer.classList.remove('text-slate-400');
      tabAdmin.classList.remove('bg-[#00e676]', 'text-slate-900', 'font-bold');
      tabAdmin.classList.add('text-slate-400');

      viewCustomer.classList.remove('hidden');
      viewAdmin.classList.add('hidden');
    });

    tabAdmin.addEventListener('click', () => {
      tabAdmin.classList.add('bg-[#00e676]', 'text-slate-900', 'font-bold');
      tabAdmin.classList.remove('text-slate-400');
      tabCustomer.classList.remove('bg-[#00e676]', 'text-slate-900', 'font-bold');
      tabCustomer.classList.add('text-slate-400');

      viewAdmin.classList.remove('hidden');
      viewCustomer.classList.add('hidden');
    });
  }

  // Interatividade de adicionar item simulado na demo
  let simulatedCartCount = 1;
  const demoAddBtn = document.getElementById('demoAddToCart');
  const demoCartBadge = document.getElementById('demoCartBadge');

  if (demoAddBtn && demoCartBadge) {
    demoAddBtn.addEventListener('click', () => {
      simulatedCartCount++;
      demoCartBadge.textContent = simulatedCartCount;
      demoAddBtn.textContent = '✓ Adicionado!';
      demoAddBtn.classList.add('bg-emerald-600');
      setTimeout(() => {
        demoAddBtn.textContent = 'Adicionar +';
        demoAddBtn.classList.remove('bg-emerald-600');
      }, 1500);
    });
  }

  /* ==========================================
     5. PESQUISADOR DE DISPONIBILIDADE DE DOMÍNIO PRÓPRIO
     ========================================== */
  const domainForm = document.getElementById('domainSearchForm');
  const domainInput = document.getElementById('domainSearchInput');
  const domainTldSelect = document.getElementById('domainTldSelect');
  const domainLoading = document.getElementById('domainLoading');
  const domainResultAvailable = document.getElementById('domainResultAvailable');
  const domainResultTaken = document.getElementById('domainResultTaken');
  const availableDomainName = document.getElementById('availableDomainName');
  const takenDomainName = document.getElementById('takenDomainName');
  const domainRegisterCta = document.getElementById('domainRegisterCta');
  const domainSuggestions = document.getElementById('domainSuggestions');

  function sanitizeDomainTerm(val) {
    return val
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\.\-]/g, '')
      .replace(/^\.+|\.+$/g, '');
  }

  async function checkDomainAvailability(targetDomain) {
    if (!targetDomain) return;

    // Reset visual
    if (domainResultAvailable) domainResultAvailable.classList.add('hidden');
    if (domainResultTaken) domainResultTaken.classList.add('hidden');
    if (domainLoading) domainLoading.classList.remove('hidden');

    try {
      // 1. Tenta API local do servidor
      let response = await fetch(`/api/check-domain?domain=${encodeURIComponent(targetDomain)}`);
      let data;

      if (response.ok) {
        data = await response.json();
      } else {
        // 2. Fallback direto para o Registro.br se for .com.br
        if (targetDomain.endsWith('.br')) {
          const rdapRes = await fetch(`https://rdap.registro.br/domain/${targetDomain}`);
          data = { domain: targetDomain, available: rdapRes.status === 404 };
        } else {
          data = { domain: targetDomain, available: true };
        }
      }

      if (domainLoading) domainLoading.classList.add('hidden');

      if (data.available) {
        // DOMÍNIO DISPONÍVEL
        if (availableDomainName) availableDomainName.textContent = data.domain;
        if (domainRegisterCta) {
          const msg = encodeURIComponent(`Olá! Pesquisei no site do Pluga Flow e vi que o domínio *${data.domain}* está DISPONÍVEL! Gostaria de registrar e implantar minha loja no Pluga Flow!`);
          domainRegisterCta.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;
        }
        if (domainResultAvailable) domainResultAvailable.classList.remove('hidden');
      } else {
        // DOMÍNIO JÁ REGISTRADO
        if (takenDomainName) takenDomainName.textContent = data.domain;

        // Gera 3 sugestões inteligentes
        if (domainSuggestions) {
          domainSuggestions.innerHTML = '';
          const baseName = data.domain.split('.')[0];
          const ext = data.domain.substring(baseName.length);
          const alts = [
            `${baseName}delivery${ext}`,
            `${baseName}oficial${ext}`,
            `use${baseName}${ext}`
          ];

          alts.forEach(alt => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-xs font-bold text-slate-800 hover:bg-amber-100 hover:border-amber-400 transition-colors shadow-sm';
            btn.innerHTML = `<span>+ ${alt}</span>`;
            btn.addEventListener('click', () => {
              if (domainInput) domainInput.value = alt.replace(ext, '');
              checkDomainAvailability(alt);
            });
            domainSuggestions.appendChild(btn);
          });
        }

        if (domainResultTaken) domainResultTaken.classList.remove('hidden');
      }
    } catch (err) {
      console.warn('Erro na consulta, tentando fallback:', err);
      if (domainLoading) domainLoading.classList.add('hidden');
      // Em caso de offline, mostra o box de disponível para não travar o cliente
      if (availableDomainName) availableDomainName.textContent = targetDomain;
      if (domainResultAvailable) domainResultAvailable.classList.remove('hidden');
    }
  }

  if (domainForm && domainInput) {
    domainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let term = sanitizeDomainTerm(domainInput.value);
      if (!term) return;

      const tld = domainTldSelect ? domainTldSelect.value : '.com.br';
      let fullDomain = term;

      if (!term.includes('.')) {
        fullDomain = `${term}${tld}`;
      }

      checkDomainAvailability(fullDomain);
    });
  }

  /* ==========================================
     6. MODAL DE CONTATO / WHATSAPP
     ========================================== */
  const contactModal = document.getElementById('contactModal');
  const openContactBtns = document.querySelectorAll('.btn-open-contact');
  const closeContactBtn = document.getElementById('closeContactModal');
  const contactOverlay = document.getElementById('contactOverlay');
  const contactForm = document.getElementById('contactForm');

  function openContactModal(initialMsg = '') {
    if (!contactModal) return;
    if (initialMsg && document.getElementById('contactMsg')) {
      document.getElementById('contactMsg').value = initialMsg;
    }
    contactModal.classList.remove('hidden');
    contactModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.classList.add('hidden');
    contactModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  openContactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const customTopic = btn.getAttribute('data-topic') || '';
      openContactModal(customTopic);
    });
  });

  if (closeContactBtn) closeContactBtn.addEventListener('click', closeContactModal);
  if (contactOverlay) contactOverlay.addEventListener('click', closeContactModal);

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim() || 'Cliente';
      const store = document.getElementById('contactStore')?.value.trim() || 'Minha Loja';
      const segment = document.getElementById('contactSegment')?.value || 'Geral';
      const customNotes = document.getElementById('contactMsg')?.value.trim() || '';

      const msg = `*Solicitação de Implantação - Pluga Flow (SxConnect)*\n\n` +
                  `👤 *Nome:* ${name}\n` +
                  `🏪 *Loja / Marca:* ${store}\n` +
                  `📦 *Segmento:* ${segment}\n` +
                  (customNotes ? `💬 *Observações:* ${customNotes}\n\n` : '\n') +
                  `Olá SxConnect! Gostaria de iniciar a implantação da minha loja no Pluga Flow (R$ 300 setup + R$ 99,90/mês)!`;

      const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
      closeContactModal();
    });
  }

  console.log(`[Pluga Flow] Website initialized successfully on ${CONFIG.subdomain}`);
});
