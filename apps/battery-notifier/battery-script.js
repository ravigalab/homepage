class BatteryNotifierTranslator {
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
    this.addBatteryAnimation();
  }

  addSmoothScrolling() {
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"], .privacy-toc a[href^="#"]');
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
          
          // Update active state in TOC
          document.querySelectorAll('.privacy-toc a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
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
      
      // Update active section in TOC
      this.updateActiveTocItem();
      
      lastScrollY = currentScrollY;
    });
  }

  updateActiveTocItem() {
    const sections = document.querySelectorAll('.policy-section');
    const tocLinks = document.querySelectorAll('.privacy-toc a');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom >= 150) {
        currentSection = section.id;
      }
    });
    
    tocLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  addBatteryAnimation() {
    // Add battery level animation to app icons
    const appIcons = document.querySelectorAll('.app-icon');
    
    appIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        icon.style.animation = 'batteryPulse 0.6s ease-in-out';
      });
      
      icon.addEventListener('animationend', () => {
        icon.style.animation = 'batteryPulse 2s ease-in-out infinite';
      });
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

  translateContent() {
    const elementsToTranslate = document.querySelectorAll('[data-pt][data-en]');
    
    elementsToTranslate.forEach(element => {
      const text = this.currentLanguage === 'pt' 
        ? element.getAttribute('data-pt')
        : element.getAttribute('data-en');
      
      element.textContent = text;
    });
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
      ? 'Política de Privacidade - Battery Notifier'
      : 'Privacy Policy - Battery Notifier';
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
    this.addHeaderAnimations();
  }

  setupIntersectionObserver() {
    const sections = document.querySelectorAll('.policy-section, .permission-card, .download-btn');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(section);
    });
  }

  addHeaderAnimations() {
    // Add staggered animations for header elements
    const headerElements = document.querySelectorAll('.privacy-badge, .privacy-title, .privacy-subtitle, .privacy-meta');
    headerElements.forEach((element, index) => {
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
    this.addDownloadInteractions();
  }

  addHoverEffects() {
    const cards = document.querySelectorAll('.permission-card, .policy-section');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('policy-section')) {
          card.style.transform = 'translateY(-4px)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('policy-section')) {
          card.style.transform = 'translateY(0)';
        }
      });
    });
  }

  addClickEffects() {
    const buttons = document.querySelectorAll('.translate-btn, .cta-btn, .download-btn');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = '';
        }, 150);
      });
    });
  }

  addDownloadInteractions() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
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
        
        // Show download message
        this.showDownloadMessage(button);
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
      
      .translating {
        opacity: 0.7;
        transition: opacity 0.2s ease;
      }
    `;
    document.head.appendChild(style);
  }

  showDownloadMessage(button) {
    const isAndroid = button.classList.contains('android');
    const message = document.createElement('div');
    message.textContent = isAndroid 
      ? '🤖 Redirecionando para Google Play...' 
      : '🍎 Redirecionando para App Store...';
    
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${isAndroid ? '#34A853' : '#000000'};
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
    }, 2000);
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
      .policy-section,
      .permission-card,
      .download-btn {
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
  new BatteryNotifierTranslator();
  new LoadingManager();
  new InteractionManager();
  new PerformanceManager();

  console.log('🔋 Battery Notifier Privacy Policy loaded successfully!');
  console.log('💡 Press Ctrl+L to toggle language');
  console.log('📱 Mobile app privacy policy with enhanced interactions');
});

// Add battery-themed Easter egg
const batterySequence = ['KeyB', 'KeyA', 'KeyT', 'KeyT', 'KeyE', 'KeyR', 'KeyY'];
let batteryIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.code === batterySequence[batteryIndex]) {
    batteryIndex++;
    if (batteryIndex === batterySequence.length) {
      // Battery Easter egg activated!
      document.body.style.filter = 'hue-rotate(0deg)';
      document.body.style.animation = 'batteryCharge 3s infinite';
      setTimeout(() => {
        document.body.style.animation = '';
        document.body.style.filter = '';
      }, 6000);
      batteryIndex = 0;
      
      // Add battery charge animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes batteryCharge {
          0% { filter: hue-rotate(0deg) brightness(1); }
          25% { filter: hue-rotate(90deg) brightness(1.2); }
          50% { filter: hue-rotate(180deg) brightness(1.4); }
          75% { filter: hue-rotate(270deg) brightness(1.2); }
          100% { filter: hue-rotate(360deg) brightness(1); }
        }
      `;
      document.head.appendChild(style);
      
      // Show battery easter egg message
      const message = document.createElement('div');
      message.textContent = '🔋 Battery Notifier Easter Egg! ⚡';
      message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #22C55E 0%, #3B82F6 100%);
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
    batteryIndex = 0;
  }
});