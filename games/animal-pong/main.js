class PrivacyPolicyTranslator {
  constructor() {
    this.currentLanguage = 'pt';
    this.translateBtn = document.getElementById('translate-btn');
    this.translateText = this.translateBtn.querySelector('.translate-text');
    this.flag = this.translateBtn.querySelector('.flag');
    
    this.init();
  }

  init() {
    this.translateBtn.addEventListener('click', () => this.toggleLanguage());
    this.updateButtonText();
    this.addKeyboardShortcut();
    this.addSmoothScrolling();
    this.addScrollEffects();
  }

  addSmoothScrolling() {
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  addScrollEffects() {
    // Add scroll-based navbar effects
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
      }
      
      lastScrollY = currentScrollY;
    });
  }

  addKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        this.toggleLanguage();
      }
    });
  }

  toggleLanguage() {
    // Add translating effect
    document.body.classList.add('translating');
    
    setTimeout(() => {
      this.currentLanguage = this.currentLanguage === 'pt' ? 'en' : 'pt';
      this.translateContent();
      this.updateButtonText();
      this.updateDocumentLanguage();
      
      // Remove translating effect
      document.body.classList.remove('translating');
    }, 200);
  }

  updateSearchPlaceholder() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      const placeholder = this.currentLanguage === 'pt' 
        ? searchInput.getAttribute('data-pt-placeholder')
        : searchInput.getAttribute('data-en-placeholder');
      searchInput.placeholder = placeholder;
    }
  }

  translateContent() {
    const elementsToTranslate = document.querySelectorAll('[data-pt][data-en]');
    
    elementsToTranslate.forEach(element => {
      const text = this.currentLanguage === 'pt' 
        ? element.getAttribute('data-pt')
        : element.getAttribute('data-en');
      
      element.textContent = text;
    });
    
    this.updateSearchPlaceholder();
  }

  updateButtonText() {
    if (this.currentLanguage === 'pt') {
      this.translateText.textContent = 'English';
      this.flag.textContent = '🇺🇸';
    } else {
      this.translateText.textContent = 'Português';
      this.flag.textContent = '🇧🇷';
    }
  }

  updateDocumentLanguage() {
    document.documentElement.lang = this.currentLanguage === 'pt' ? 'pt-BR' : 'en';
    
    // Update page title
    const title = this.currentLanguage === 'pt' 
      ? 'Animal Pong - Indie Game Studio'
      : 'Animal Pong - Indie Game Studio';
    document.title = title;
  }
}

// Enhanced loading animation with staggered effects
class LoadingManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.addHeroAnimations();
  }

  setupIntersectionObserver() {
    const sections = document.querySelectorAll('.about-card, .reward-card, .game-card, .team-member, .news-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  }

  addHeroAnimations() {
    // Add staggered animations for hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions');
    heroElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }
}

// Enhanced interaction manager
class InteractionManager {
  constructor() {
    this.init();
  }

  init() {
    this.addHoverEffects();
    this.addClickEffects();
    this.addCTAInteractions();
    this.addParallaxEffects();
  }

  addHoverEffects() {
    const cards = document.querySelectorAll('.about-card, .reward-card, .game-card, .news-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }

  addClickEffects() {
    const buttons = document.querySelectorAll('.translate-btn, .cta-btn, .btn-primary, .btn-secondary, .btn-outline');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = '';
        }, 150);
      });
    });
  }

  addCTAInteractions() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .cta-btn');
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  addParallaxEffects() {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroVisual.style.transform = `translateY(${rate}px)`;
      });
    }
  }
}

// Performance manager for smooth animations
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeAnimations();
    this.handleReducedMotion();
  }

  optimizeAnimations() {
    // Use transform instead of changing layout properties
    const style = document.createElement('style');
    style.textContent = `
      .policy-section {
        will-change: transform;
      }
      .translate-btn {
        will-change: transform;
      }
    `;
    document.head.appendChild(style);
  }

  handleReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.body.classList.add('reduced-motion');
    }
  }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core functionality
  new PrivacyPolicyTranslator();
  new LoadingManager();
  new InteractionManager();
  new PerformanceManager();

  console.log('🎮 Animal Pong Indie Game Studio loaded successfully!');
  console.log('💡 Press Ctrl+L to toggle language');
  console.log('✨ Modern indie game studio website with enhanced interactions');
});

// Add some Easter eggs for gamers
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.code === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      // Easter egg activated!
      document.body.style.filter = 'hue-rotate(0deg)';
      document.body.style.animation = 'rainbow 3s infinite';
      setTimeout(() => {
        document.body.style.animation = '';
        document.body.style.filter = '';
      }, 6000);
      konamiIndex = 0;
      
      // Add rainbow animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes rainbow {
          0% { filter: hue-rotate(0deg); }
          25% { filter: hue-rotate(90deg); }
          50% { filter: hue-rotate(180deg); }
          75% { filter: hue-rotate(270deg); }
          100% { filter: hue-rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
      
      // Show easter egg message
      const message = document.createElement('div');
      message.textContent = '🎮 Animal Pong Easter Egg! 🌈';
      message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 1rem;
        font-weight: bold;
        z-index: 9999;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
      `;
      document.body.appendChild(message);
      
      setTimeout(() => {
        if (message.parentNode) {
          message.remove();
        }
      }, 3000);
    }
  } else {
    konamiIndex = 0;
  }
});