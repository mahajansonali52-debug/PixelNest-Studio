// script.js – PixelNest Studio

// ==========================================
// 1. PAGE LOADER
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 600);
  }
});

// ==========================================
// 2. TYPING ANIMATION
// ==========================================
const typingElement = document.getElementById('typingText');
if (typingElement) {
  const words = [
    'Websites',
    'Brands',
    'Experiences',
    'Growth',
    'Success'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 120;

  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      // Removing characters
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 60;
    } else {
      // Adding characters
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 120;
    }

    // If word is complete
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000; // pause before deleting
    }

    // If word is fully deleted
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // pause before typing next
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();
}

// ==========================================
// 3. SCROLL PROGRESS BAR
// ==========================================
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  });
}

// ==========================================
// 4. COUNTER ANIMATION (with Intersection Observer)
// ==========================================
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;

  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    
    let current = 0;
    const increment = Math.ceil(target / 60);
    const duration = 2000;
    const stepTime = Math.floor(duration / 60);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = current;
      }
    }, stepTime);
  });
}

// Intersection Observer for stats
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersAnimated) {
        animateCounters();
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
}

// ==========================================
// 5. SCROLL REVEAL (Intersection Observer)
// ==========================================
const revealElements = document.querySelectorAll(
  '.about-card, .service-card, .portfolio-card, .pricing-card, .testimonial-card, .faq-item'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  revealObserver.observe(el);
});

// Also reveal section headers
document.querySelectorAll('.section-header').forEach((header) => {
  header.style.opacity = '0';
  header.style.transform = 'translateY(20px)';
  header.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  revealObserver.observe(header);
});

// ==========================================
// 6. FAQ ACCORDION
// ==========================================
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question) => {
  question.addEventListener('click', () => {
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    const answer = question.nextElementSibling;

    // Close all other FAQs
    faqQuestions.forEach((q) => {
      if (q !== question) {
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.classList.remove('open');
      }
    });

    // Toggle current
    question.setAttribute('aria-expanded', !isExpanded);
    if (!isExpanded) {
      answer.classList.add('open');
    } else {
      answer.classList.remove('open');
    }
  });
});

// ==========================================
// 7. MOBILE NAV TOGGLE
// ==========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isActive = navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  // Close menu on link click
  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ==========================================
// 8. BACK TO TOP BUTTON
// ==========================================
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================
// 9. CONTACT FORM HANDLING (basic)
// ==========================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // Simulate sending
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      btn.style.background = 'linear-gradient(135deg, #00c853, #00e676)';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.style.background = '';
        contactForm.reset();
      }, 2000);
    }, 1500);
  });
}

// ==========================================
// 10. NEWSLETTER SUBSCRIPTION
// ==========================================
const newsletterBtn = document.querySelector('.newsletter-wrap button');
const newsletterInput = document.getElementById('newsletterInput');

if (newsletterBtn && newsletterInput) {
  newsletterBtn.addEventListener('click', () => {
    const email = newsletterInput.value.trim();
    if (email && email.includes('@')) {
      newsletterBtn.innerHTML = '<i class="fas fa-check"></i>';
      newsletterBtn.style.background = 'linear-gradient(135deg, #00c853, #00e676)';
      newsletterInput.value = '';
      setTimeout(() => {
        newsletterBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
        newsletterBtn.style.background = '';
      }, 2000);
    } else {
      newsletterInput.style.borderColor = '#ff1744';
      setTimeout(() => {
        newsletterInput.style.borderColor = '';
      }, 1500);
    }
  });

  newsletterInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      newsletterBtn.click();
    }
  });
}

// ==========================================
// 11. LAZY LOADING (native, fallback)
// ==========================================
// All images already use loading="lazy" in HTML.
// Additional check for any img without lazy
document.querySelectorAll('img:not([loading])').forEach((img) => {
  img.setAttribute('loading', 'lazy');
});

// ==========================================
// 12. SMOOTH ANCHOR SCROLL (prevent jump)
// ==========================================
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const offsetTop = targetEl.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ==========================================
// 13. KEYBOARD ACCESSIBILITY (nav toggle)
// ==========================================
navToggle?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    navToggle.click();
  }
});

// ==========================================
// 14. REDUCE MOTION PREFERENCE
// ==========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.querySelectorAll('.service-card, .portfolio-card, .pricing-card, .testimonial-card').forEach((el) => {
    el.style.transition = 'none';
  });
}

console.log('🪹 PixelNest Studio · Built with ❤️ by Vyankatesh Mahajan');
console.log('📧 vyankateshmahajan26@gmail.com');
console.log('📸 @pixelneststudio26');