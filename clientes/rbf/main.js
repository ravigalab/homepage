const WHATSAPP_URL = 'https://wa.me/5514998752669'

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      mobileMenu.classList.toggle('open', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', true);
      });
    });

    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden', true);
      }
    });
  }

  const tabs = document.querySelectorAll('.niches-tab');
  const panels = document.querySelectorAll('.niches-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const index = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.querySelector(`.niches-panel[data-panel="${index}"]`).classList.add('active');
    });
  });

  const primaryButtons = document.querySelectorAll('.btn-primary');
  primaryButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.open(WHATSAPP_URL, '_blank');
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('cta-whatsapp')) {
      const profession = e.target.textContent.trim();
      window.open(`${WHATSAPP_URL}?text=Olá! Tenho interesse em contabilidade para ${profession}.`, '_blank');
    }
  });

  const navLinks = document.querySelectorAll('.nav a, .footer-column a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const top = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  const scrollElements = document.querySelectorAll('.service-card, .process-card');

  const elementInView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / 1.25;
  };

  scrollElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
  });

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el)) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };

  window.addEventListener('scroll', handleScrollAnimation);
  handleScrollAnimation();

  // Blog "Ler mais"
  const readMoreBtn = document.getElementById('blogReadMore');
  const expandable = document.querySelector('.blog-expandable');
  if (readMoreBtn && expandable) {
    readMoreBtn.addEventListener('click', () => {
      expandable.classList.add('expanded');
      readMoreBtn.classList.add('open');
    });
  }
});
