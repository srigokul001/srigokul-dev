/**
 * Srigokul V - Developer Portfolio Interactive Logic
 * Features: Typewriter, Theme Toggle, Skill Filter, Architecture Modals,
 * Clipboard Copy, Contact Form Handling, Smooth Navigation & Toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Set copyright year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ==========================================================================
     1. Typewriter Effect
     ========================================================================== */
  const typingTextEl = document.getElementById('typingText');
  const words = [
    'B.Tech IT Student',
    'Aspiring Software Developer',
    'Full-Stack Web Builder',
    'AI & Risk Systems Enthusiast',
    'IoT & Embedded Creator',
    'Passionate Problem Solver'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function typeEffect() {
    if (!typingTextEl) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingTextEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 45;
    } else {
      typingTextEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 95;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause before deleting
      typingDelay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingDelay = 400;
    }

    setTimeout(typeEffect, typingDelay);
  }

  typeEffect();

  /* ==========================================================================
     2. Theme Toggle (Dark / Light)
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;
  const savedTheme = localStorage.getItem('sg_theme') || 'dark';

  htmlEl.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', newTheme);
      localStorage.setItem('sg_theme', newTheme);
      showToast(newTheme === 'dark' ? 'Switched to Dark Theme 🌙' : 'Switched to Light Theme ☀️');
    });
  }

  /* ==========================================================================
     3. Navigation & Mobile Menu
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking outside or clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Active Link on Scroll (ScrollSpy)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });

    // Scroll to Top visibility
    const scrollTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  const scrollTopBtn = document.getElementById('scrollToTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     4. Skills Category Filtering
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  /* ==========================================================================
     5. Project Architecture Deep Dive Modals
     ========================================================================== */
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');
  const openModalBtns = document.querySelectorAll('.open-project-modal');

  const projectDetails = {
    trustscan: {
      title: 'TrustScan AI – Product Authenticity Verification System',
      subtitle: 'Comprehensive Architecture & Risk Analysis Workflow',
      badge: 'React.js • Node.js • Python • AI Engine • Barcode / QR',
      content: `
        <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem; color: var(--text-primary); font-family: var(--font-heading);">
          <i class="fa-solid fa-shield-halved" style="color: var(--accent-cyan); margin-right: 0.5rem;"></i>
          System Architecture & Workflow
        </h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.2rem; font-size: 0.95rem;">
          TrustScan AI targets global counterfeit proliferation by uniting cryptographic serial tracking, hardware scans, and statistical risk algorithms.
        </p>

        <div class="modal-architecture-flow">
          <div style="color: var(--accent-cyan); font-weight: bold; margin-bottom: 0.5rem;">⚡ Data Pipeline Flow:</div>
          <div>1. [User / Retailer Scan] ➔ Reads QR Code / Barcode / Serial Number</div>
          <div>2. [React Client] ➔ Captures device GPS, timestamp & cryptographic payload</div>
          <div>3. [Node.js / Express API] ➔ Validates format, requests token authenticity</div>
          <div>4. [Python Risk Engine] ➔ Analyzes velocity, geographical leap anomalies & duplicate flags</div>
          <div>5. [Verdict Dispatch] ➔ Returns: 🟢 <strong>ORIGINAL</strong> | 🟡 <strong>SUSPICIOUS</strong> | 🔴 <strong>FAKE</strong></div>
        </div>

        <h4 class="modal-section-title"><i class="fa-solid fa-magnifying-glass-chart"></i> Multi-Factor Risk Assessment Factors</h4>
        <ul style="color: var(--text-secondary); font-size: 0.92rem; padding-left: 1.2rem; line-height: 1.7; margin-bottom: 1.2rem;">
          <li><strong>Scan History Frequency:</strong> Detects if a unique single-consumer QR code has been scanned from 20+ distinct locations in 1 hour.</li>
          <li><strong>Geographical Impossibility:</strong> Flags impossible travel speeds between consecutive check-ins (e.g., Chennai and London in 10 minutes).</li>
          <li><strong>Serial & Checksum Verification:</strong> Mathematical validation preventing arbitrary string generation.</li>
          <li><strong>Supply-Chain State Machine:</strong> Identifies if a product was marked as "In-Transit" or "Sold" prior to verification.</li>
        </ul>

        <h4 class="modal-section-title"><i class="fa-solid fa-code"></i> Technology Stack</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
          <span class="tech-tag">React.js</span>
          <span class="tech-tag">Node.js</span>
          <span class="tech-tag">Express.js</span>
          <span class="tech-tag">Python</span>
          <span class="tech-tag">RESTful APIs</span>
          <span class="tech-tag">MongoDB</span>
        </div>
      `
    },
    toy: {
      title: 'Smart Translation Toy',
      subtitle: 'IoT-Based Real-Time Multilingual Educational Assistant',
      badge: 'ESP32 • Microphone • Speaker • Wi-Fi • Translation Engine',
      content: `
        <h3 style="font-size: 1.4rem; margin-bottom: 0.5rem; color: var(--text-primary); font-family: var(--font-heading);">
          <i class="fa-solid fa-language" style="color: #fbbf24; margin-right: 0.5rem;"></i>
          IoT Hardware & Cloud Service Architecture
        </h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.2rem; font-size: 0.95rem;">
          Designed to make multilingual language acquisition playful, tactile, and natural for young learners without screen addiction.
        </p>

        <div class="modal-architecture-flow">
          <div style="color: #fbbf24; font-weight: bold; margin-bottom: 0.5rem;">⚡ End-to-End Pipeline:</div>
          <div>🎙️ [Child Speaks] ➔ Sound digitized via I2S / Analog Microphone Module</div>
          <div>⚙️ [ESP32 Microcontroller] ➔ Audio framing, Wi-Fi packaging, HTTP/Websocket transmission</div>
          <div>☁️ [Cloud Translation Pipeline] ➔ Speech-to-Text ➔ Neural Translation ➔ Text-to-Speech</div>
          <div>🔊 [Audio Output] ➔ DAC / I2S Amplifier drives toy speaker with native audio response</div>
        </div>

        <h4 class="modal-section-title"><i class="fa-solid fa-microchip"></i> Hardware & Implementation Highlights</h4>
        <ul style="color: var(--text-secondary); font-size: 0.92rem; padding-left: 1.2rem; line-height: 1.7; margin-bottom: 1.2rem;">
          <li><strong>ESP32 Microcontroller:</strong> Dual-core 240MHz processor handling concurrent audio streaming and Wi-Fi handshakes.</li>
          <li><strong>Low-Latency Audio Streaming:</strong> Streamlined buffers to deliver translations within ~1.2 seconds for natural child engagement.</li>
          <li><strong>Interactive Gamification:</strong> Visual LED cues (Listening, Translating, Speaking) to guide child interaction.</li>
          <li><strong>Educational Relevance:</strong> Supports phrase learning, phonetics, and dual-language vocabulary reinforcement.</li>
        </ul>

        <h4 class="modal-section-title"><i class="fa-solid fa-screwdriver-wrench"></i> Core Components</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
          <span class="tech-tag">ESP32 SoC</span>
          <span class="tech-tag">C / C++ (Embedded)</span>
          <span class="tech-tag">Wi-Fi Protocols</span>
          <span class="tech-tag">Speech & Audio APIs</span>
          <span class="tech-tag">REST APIs</span>
        </div>
      `
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      const details = projectDetails[projectKey];
      if (details && modalBody && projectModal) {
        modalBody.innerHTML = details.content;
        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ==========================================================================
     6. Copy-To-Clipboard & Share Actions
     ========================================================================== */
  const emailVal = 'sri08032008@gmail.com';
  const phoneVal = '+919342557667';

  function copyToClipboard(text, message) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message || 'Copied to clipboard!');
    }).catch(() => {
      // Fallback
      const tempInput = document.createElement('input');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showToast(message || 'Copied to clipboard!');
    });
  }

  const copyEmailHero = document.getElementById('copyEmailHero');
  if (copyEmailHero) {
    copyEmailHero.addEventListener('click', () => {
      copyToClipboard(emailVal, 'Email copied: sri08032008@gmail.com 📋');
    });
  }

  const copyEmailContact = document.getElementById('copyEmailContact');
  if (copyEmailContact) {
    copyEmailContact.addEventListener('click', () => {
      copyToClipboard(emailVal, 'Email copied: sri08032008@gmail.com 📋');
    });
  }

  const copyPhoneContact = document.getElementById('copyPhoneContact');
  if (copyPhoneContact) {
    copyPhoneContact.addEventListener('click', () => {
      copyToClipboard(phoneVal, 'Phone copied: +91 9342557667 📱');
    });
  }

  const sharePortfolioBtn = document.getElementById('sharePortfolioBtn');
  if (sharePortfolioBtn) {
    sharePortfolioBtn.addEventListener('click', () => {
      const url = window.location.href;
      copyToClipboard(url, 'Portfolio link copied to clipboard! 🔗');
    });
  }

  /* ==========================================================================
     7. Contact Form Direct Email Launcher
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const subject = document.getElementById('senderSubject').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Generate mailto link
      const emailRecipient = 'sri08032008@gmail.com';
      const mailtoSubject = encodeURIComponent(`[Portfolio Contact] ${subject || 'New Message from ' + name}`);
      const mailtoBody = encodeURIComponent(
        `Hi Srigokul,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}`
      );

      showToast('Opening your email client to send message to Srigokul... ✉️');

      setTimeout(() => {
        window.location.href = `mailto:${emailRecipient}?subject=${mailtoSubject}&body=${mailtoBody}`;
        contactForm.reset();
      }, 700);
    });
  }

  /* ==========================================================================
     8. Toast Notification Helper
     ========================================================================== */
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check toast-icon"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-fadeout');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3200);
  }
});
