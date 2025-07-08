// Theme Management
// class ThemeManager {
//   constructor() {
//     this.currentTheme = localStorage.getItem('theme') || 'system';
//     this.themeToggle = document.getElementById('theme-toggle');
//     this.themeIcon = document.getElementById('theme-icon');
//     this.themeOptions = document.querySelectorAll('.theme-option');

//     this.init();
//   }

//   init() {
//     this.applyTheme(this.currentTheme);
//     this.updateUI();
//     this.bindEvents();

//     // Listen for system theme changes
//     window
//       .matchMedia('(prefers-color-scheme: dark)')
//       .addEventListener('change', () => {
//         if (this.currentTheme === 'system') {
//           this.applySystemTheme();
//         }
//       });
//   }

//   bindEvents() {
//     this.themeOptions.forEach(option => {
//       option.addEventListener('click', e => {
//         const theme = e.currentTarget.dataset.theme;
//         this.setTheme(theme);
//       });
//     });
//   }

//   setTheme(theme) {
//     this.currentTheme = theme;
//     localStorage.setItem('theme', theme);
//     this.applyTheme(theme);
//     this.updateUI();
//   }

//   applyTheme(theme) {
//     const root = document.documentElement;

//     if (theme === 'system') {
//       root.removeAttribute('data-theme');
//       this.applySystemTheme();
//     } else {
//       root.setAttribute('data-theme', theme);
//     }
//   }

//   applySystemTheme() {
//     const prefersDark = window.matchMedia(
//       '(prefers-color-scheme: dark)'
//     ).matches;
//     const root = document.documentElement;

//     if (this.currentTheme === 'system') {
//       if (prefersDark) {
//         root.setAttribute('data-theme', 'dark');
//       } else {
//         root.setAttribute('data-theme', 'light');
//       }
//     }
//   }

//   updateUI() {
//     // Update active state
//     this.themeOptions.forEach(option => {
//       option.classList.toggle(
//         'active',
//         option.dataset.theme === this.currentTheme
//       );
//     });

//     // Update icon
//     const isDark = this.isDarkMode();
//     this.themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
//   }

//   isDarkMode() {
//     if (this.currentTheme === 'dark') return true;
//     if (this.currentTheme === 'light') return false;
//     return window.matchMedia('(prefers-color-scheme: dark)').matches;
//   }
// }

// Initialize theme manager
// const themeManager = new ThemeManager();

// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for navigation links
const scrollToSection = sectionId => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offsetTop = element.offsetTop - 70; // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
};

// Add click event listeners to navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    scrollToSection(targetId);
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll(
    '.service-card, .client-testimonial, .content-text, .tech-card'
  );

  elementsToAnimate.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Simple validation
  if (!name || !email || !message) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Por favor, ingresa un email válido.');
    return;
  }

  // Simulate form submission
  const submitButton = this.querySelector('.submit-button');
  const originalText = submitButton.textContent;

  submitButton.textContent = 'Enviando...';
  submitButton.disabled = true;

  setTimeout(() => {
    alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
    this.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
});

// Parallax effect for hero section
// window.addEventListener('scroll', () => {
//   const scrolled = window.scrollY;
//   const parallax = document.querySelector('.tech-grid');
//   if (parallax) {
//     const speed = scrolled * 0.5;
//     parallax.style.transform = `translate(${speed * 0.1}px, ${speed * 0.1}px)`;
//   }
// });

// Add hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add click animation to CTA button
document.querySelector('.cta-button').addEventListener('click', function () {
  this.style.transform = 'scale(0.95)';
  setTimeout(() => {
    this.style.transform = 'scale(1)';
  }, 150);
});

// Typing effect for hero subtitle (optional enhancement)
const typeWriter = (element, text, speed = 10) => {
  let i = 0;
  element.innerHTML = '';

  const type = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };

  type();
};

// Initialize typing effect when page loads
// window.addEventListener('load', () => {
//   const heroSubtitle = document.querySelector('.hero-subtitle');
//   const originalText = heroSubtitle.textContent;

//   // Add a small delay before starting the typing effect
//   setTimeout(() => {
//     heroSubtitle.style.visibility = 'visible';
//     typeWriter(heroSubtitle, originalText, 80);
//   }, 1000);
// });

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-blue) !important;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Close theme dropdown when clicking outside
document.addEventListener('click', e => {
  const themeSwitcher = document.querySelector('.theme-switcher');
  if (!themeSwitcher.contains(e.target)) {
    // Optional: Add logic to close dropdown if needed
  }
});

// Keyboard navigation for theme switcher
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    // Close any open dropdowns
    document.querySelector('.theme-dropdown').style.opacity = '0';
    document.querySelector('.theme-dropdown').style.visibility = 'hidden';
  }
});

// document.addEventListener('DOMContentLoaded', function () {
//   const toggleBtn = document.getElementById('theme-toggle');
//   const dropdown = document.getElementById('theme-dropdown');
//   const options = document.querySelectorAll('.theme-option');

//   toggleBtn.addEventListener('click', function (e) {
//     e.stopPropagation(); // evita que el click en el botón cierre el menú
//     dropdown.classList.toggle('open');
//   });

//   // Ocultar al hacer clic fuera
//   document.addEventListener('click', function () {
//     dropdown.classList.remove('open');
//   });

//   // Evitar que al hacer clic dentro del dropdown lo cierre
//   dropdown.addEventListener('click', function (e) {
//     e.stopPropagation();
//   });

//   // Cerrar menú al elegir una opción
//   options.forEach(option => {
//     option.addEventListener('click', function () {
//       dropdown.classList.remove('open');
//       // Aquí puedes añadir la lógica para cambiar el tema
//       const selectedTheme = this.dataset.theme;
//       document.documentElement.setAttribute('data-theme', selectedTheme);
//       localStorage.setItem('theme', selectedTheme);

//       // Actualiza clase activa visual
//       options.forEach(opt => opt.classList.remove('active'));
//       this.classList.add('active');

//       // Cambia el ícono si quieres
//       const icon = document.getElementById('theme-icon');
//       if (selectedTheme === 'light') {
//         icon.className = 'fas fa-sun';
//       } else if (selectedTheme === 'dark') {
//         icon.className = 'fas fa-moon';
//       } else {
//         icon.className = 'fas fa-desktop';
//       }
//     });
//   });
// });

// ... existing code ...

document.addEventListener('DOMContentLoaded', function () {
  var gif = document.getElementById('gif');
  if (gif) {
    gif.style.opacity = 0;
    setTimeout(function () {
      gif.style.transition = 'opacity 0.5s';
      gif.style.opacity = 1;
    }, 1000);
  }
});

window.addEventListener('load', () => {
  const heroSubtitle = document.querySelector('.hero-subtitle');
  setTimeout(() => {
    heroSubtitle.style.opacity = 1;
  }, 2000);
});
