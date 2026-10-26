/**
 * SENTINELCORE TECHNOLOGIES - MAIN SCRIPT
 * Version: 1.0.0
 * Pure Vanilla JavaScript (No jQuery / No external dependencies)
 * Hostinger Static Hosting Compatible
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. DATA: SERVICE DETAILS FOR INTERACTIVE MODALS
  // =========================================================================
  const SERVICE_DETAILS = {
    consulting: {
      tag: 'Strategic Advisory',
      title: 'Cybersecurity Consulting',
      description: 'Our consulting engagements provide structured, actionable evaluations of your digital posture, helping leadership understand actual risks and allocate resources pragmatically.',
      scope: [
        'Comprehensive review of current digital assets, workflows, and third-party integrations.',
        'Objective gap analysis against recognized security baselines without fearmongering.',
        'Prioritized, staged remediation roadmap tailored to your operational scale.',
        'Practical security policy templates covering access control, remote work, and incident response.'
      ],
      deliverable: 'Executive Summary Briefing, Technical Remediation Matrix, and Staged Implementation Roadmap.',
      serviceValue: 'Cybersecurity Consulting'
    },
    web_assessment: {
      tag: 'Web Perimeter Protection',
      title: 'Website Security Assessments',
      description: 'Authorized, structured reviews of your web applications and digital endpoints to identify configuration flaws, unpatched software, and common vulnerabilities.',
      scope: [
        'Inspection against OWASP Top 10 vulnerabilities (Injection, Broken Access, Security Misconfigurations).',
        'HTTP security header validation (Content Security Policy, HSTS, X-Content-Type-Options).',
        'TLS/SSL cryptographic evaluation and certificate lifecycle verification.',
        'Form input hygiene, credential handling, and exposure of sensitive debug assets.'
      ],
      deliverable: 'Confidential Vulnerability Findings Report with line-by-line developer remediation guidelines.',
      serviceValue: 'Website Security Assessments'
    },
    network: {
      tag: 'Infrastructure Resilience',
      title: 'Network Security',
      description: 'Strengthen internal networks, remote access pathways, and firewall configurations to isolate critical assets and mitigate unauthorized lateral movement.',
      scope: [
        'Firewall rule review and elimination of obsolete inbound ports and protocols.',
        'Zero-trust access policy design, role-based segmentation, and guest network isolation.',
        'Secure VPN / encrypted tunnel configuration for hybrid and distributed teams.',
        'Wi-Fi encryption hardening (WPA3 Enterprise / Protected Management Frames).'
      ],
      deliverable: 'Network Hardening Documentation, Topology Review, and Access Control Matrix.',
      serviceValue: 'Network Security'
    },
    it_support: {
      tag: 'Operational Dependability',
      title: 'Managed IT Support',
      description: 'Responsive, proactive IT assistance to keep day-to-day operations stable, resolve employee technical bottlenecks, and maintain software hygiene.',
      scope: [
        'Operating system and third-party application patch management cycles.',
        'Endpoint hardware health monitoring, diagnostics, and routine system hygiene.',
        'Cloud productivity suite administration (email routing, identity permissions, multi-factor setup).',
        'Automated local and offsite backup verification with regular restoration drill tests.'
      ],
      deliverable: 'Service Level Agreement (SLA) support desk, monthly maintenance reports, and backup health logs.',
      serviceValue: 'Managed IT Support'
    },
    awareness: {
      tag: 'Human Defense Layer',
      title: 'Security Awareness Training',
      description: 'Equip your workforce with practical, non-punitive training to spot deceptive emails, malicious attachments, and social engineering attempts.',
      scope: [
        'Simulated phishing exercises with real-world, context-appropriate templates.',
        'Micro-learning modules focused on credential security, password managers, and multi-factor authentication.',
        'Safe browsing protocols, public Wi-Fi precautions, and mobile device best practices.',
        'Clear, friction-free reporting procedures for suspicious communications.'
      ],
      deliverable: 'Quarterly Organizational Awareness Reports, Phishing Resilience Metrics, and Employee Training Deck.',
      serviceValue: 'Security Awareness Training'
    },
    web_dev: {
      tag: 'Secure Online Presence',
      title: 'Website Development & Maintenance',
      description: 'Custom, modern business websites engineered with built-in security hygiene, fast load performance, responsive layouts, and continuous upkeep.',
      scope: [
        'Clean, modern responsive UI built with pure semantic HTML5, CSS3, and JavaScript.',
        'Content Management System (CMS) hardening and vulnerability patching.',
        'Automated database and static asset backups with scheduled integrity checks.',
        'Hostinger and shared hosting performance optimization, DNS configuration, and SSL provisioning.'
      ],
      deliverable: 'Production-ready website source code, complete deployment documentation, and ongoing maintenance retainers.',
      serviceValue: 'Website Development & Maintenance'
    }
  };

  // =========================================================================
  // 2. HEADER: SCROLL EFFECTS & ACTIVE NAVIGATION
  // =========================================================================
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleHeaderScroll = () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // Active Link Highlight on Scroll
  const highlightActiveNav = () => {
    const scrollY = window.pageYOffset;
    const headerOffset = 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerOffset;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // =========================================================================
  // 3. MOBILE MENU TOGGLE
  // =========================================================================
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  const toggleMobileMenu = (forceClose = false) => {
    const isOpen = forceClose ? true : mobileToggle?.classList.contains('open');
    if (isOpen) {
      mobileToggle?.classList.remove('open');
      mobileDrawer?.classList.remove('open');
      mobileToggle?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileToggle?.classList.add('open');
      mobileDrawer?.classList.add('open');
      mobileToggle?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  mobileToggle?.addEventListener('click', () => toggleMobileMenu());

  // Close mobile drawer when clicking any link inside it
  const mobileLinks = mobileDrawer?.querySelectorAll('a');
  mobileLinks?.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(true));
  });

  // =========================================================================
  // 4. HERO SECTION: INTERACTIVE CYBER CANVAS ANIMATION
  // =========================================================================
  const canvas = document.getElementById('heroCyberCanvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth || 380);
    let height = (canvas.height = canvas.parentElement.clientHeight || 380);
    let animationFrameId;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', resizeCanvas);

    // Particle nodes definition
    const nodeCount = 28;
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1.5,
        pulse: Math.random() * Math.PI
      });
    }

    let angle = 0;

    const drawHeroScene = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle orbital rings
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(37, 99, 235, 0.15)';
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 135, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating radar scanner
      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
      ctx.lineWidth = 1.5;
      const scanX = centerX + Math.cos(angle) * 135;
      const scanY = centerY + Math.sin(angle) * 135;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(scanX, scanY);
      ctx.stroke();
      ctx.restore();

      angle += 0.012;

      // Draw and connect particles
      for (let i = 0; i < nodeCount; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;

        // Bounce at boundaries
        if (n.x < 10 || n.x > width - 10) n.vx *= -1;
        if (n.y < 10 || n.y > height - 10) n.vy *= -1;

        // Connect nearby nodes
        for (let j = i + 1; j < nodeCount; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist < 85) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.25 * (1 - dist / 85)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw particle dot
        const glow = Math.sin(n.pulse) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.fillStyle = `rgba(0, 229, 255, ${glow})`;
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(drawHeroScene);
    };

    // Only run animation if user prefers motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      drawHeroScene();
    }
  }

  // =========================================================================
  // 5. PROMOTIONAL VIDEO: DETECTION & GRACEFUL FALLBACK
  // =========================================================================
  const promoVideo = document.getElementById('promoVideo');
  const videoFallbackUI = document.getElementById('videoFallbackUI');
  const fallbackPlayBtn = document.getElementById('fallbackPlayBtn');

  if (promoVideo) {
    // Check if the video is accessible
    const videoSource = promoVideo.querySelector('source');
    
    // Test if video loads properly or fails (e.g. 404 in static hosting without file)
    promoVideo.addEventListener('error', () => {
      console.info('SentinelCore: Video file assets/video/sentinelcore-promo.mp4 not found. Displaying fallback showcase.');
      videoFallbackUI?.classList.remove('hidden');
      promoVideo.style.display = 'none';
    }, true);

    promoVideo.addEventListener('canplay', () => {
      videoFallbackUI?.classList.add('hidden');
      promoVideo.style.display = 'block';
    });

    // Fallback Play Simulation Button
    fallbackPlayBtn?.addEventListener('click', () => {
      alert(
        'Video Player Notification:\n\n' +
        'The promotional video slot is active and configured for "sentinelcore-promo.mp4".\n\n' +
        'To display your finalized video:\n' +
        '1. Generate your promo video with Google Flow / Higgsfield AI using the prompt in AI_VIDEO_PROMPT.md.\n' +
        '2. Save it as "sentinelcore-promo.mp4" inside "assets/video/".\n' +
        '3. Refresh this page to watch your video directly in the integrated HTML5 player!'
      );
    });
  }

  // =========================================================================
  // 6. SERVICE DETAILS MODAL
  // =========================================================================
  const modalOverlay = document.getElementById('serviceModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const modalScopeList = document.getElementById('modalScopeList');
  const modalDeliverable = document.getElementById('modalDeliverable');
  const modalInquireBtn = document.getElementById('modalInquireBtn');

  let currentSelectedService = '';

  const openServiceModal = (serviceKey) => {
    const data = SERVICE_DETAILS[serviceKey];
    if (!data) return;

    currentSelectedService = data.serviceValue;

    if (modalTag) modalTag.textContent = data.tag;
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalDescription) modalDescription.textContent = data.description;

    if (modalScopeList) {
      modalScopeList.innerHTML = '';
      data.scope.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        modalScopeList.appendChild(li);
      });
    }

    if (modalDeliverable) {
      modalDeliverable.innerHTML = `<strong>Primary Deliverables:</strong> ${data.deliverable}`;
    }

    modalOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeServiceModal = () => {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Attach event listeners to all "Learn More" buttons
  const learnMoreBtns = document.querySelectorAll('[data-service]');
  learnMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service');
      if (serviceKey) openServiceModal(serviceKey);
    });
  });

  modalCloseBtn?.addEventListener('click', closeServiceModal);

  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeServiceModal();
  });

  // "Inquire About This Service" button inside modal
  modalInquireBtn?.addEventListener('click', () => {
    closeServiceModal();
    const serviceSelect = document.getElementById('serviceSelect');
    if (serviceSelect && currentSelectedService) {
      serviceSelect.value = currentSelectedService;
    }
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const nameField = document.getElementById('fullName');
      nameField?.focus();
    }, 450);
  });

  // =========================================================================
  // 7. PRIVACY POLICY MODAL
  // =========================================================================
  const privacyModal = document.getElementById('privacyModal');
  const privacyCloseBtn = document.getElementById('privacyCloseBtn');
  const privacyLinks = document.querySelectorAll('.privacy-link-trigger');

  const openPrivacyModal = (e) => {
    if (e) e.preventDefault();
    privacyModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closePrivacyModal = () => {
    privacyModal?.classList.remove('active');
    document.body.style.overflow = '';
  };

  privacyLinks.forEach(trigger => {
    trigger.addEventListener('click', openPrivacyModal);
  });

  privacyCloseBtn?.addEventListener('click', closePrivacyModal);

  privacyModal?.addEventListener('click', (e) => {
    if (e.target === privacyModal) closePrivacyModal();
  });

  // Global ESC key listener to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeServiceModal();
      closePrivacyModal();
      toggleMobileMenu(true);
    }
  });

  // =========================================================================
  // 8. CONTACT FORM CLIENT-SIDE VALIDATION & HANDLING
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('businessEmail');
  const serviceSelect = document.getElementById('serviceSelect');
  const messageInput = document.getElementById('message');
  const honeypotInput = document.getElementById('website_url');
  const submitBtn = document.getElementById('submitBtn');
  const formResponse = document.getElementById('formResponse');

  // Regex validation for professional email
  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    return re.test(String(email).toLowerCase());
  };

  const setFieldError = (inputElement, errorElementId, message) => {
    inputElement.classList.add('error');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.textContent = message;
      errEl.classList.add('visible');
    }
  };

  const clearFieldError = (inputElement, errorElementId) => {
    inputElement.classList.remove('error');
    const errEl = document.getElementById(errorElementId);
    if (errEl) {
      errEl.classList.remove('visible');
    }
  };

  // Live validation listeners on typing/change
  fullNameInput?.addEventListener('input', () => {
    if (fullNameInput.value.trim().length >= 2) {
      clearFieldError(fullNameInput, 'nameError');
    }
  });

  emailInput?.addEventListener('input', () => {
    if (isValidEmail(emailInput.value.trim())) {
      clearFieldError(emailInput, 'emailError');
    }
  });

  serviceSelect?.addEventListener('change', () => {
    if (serviceSelect.value !== '') {
      clearFieldError(serviceSelect, 'serviceError');
    }
  });

  messageInput?.addEventListener('input', () => {
    if (messageInput.value.trim().length >= 15) {
      clearFieldError(messageInput, 'messageError');
    }
  });

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    // Check honeypot field (anti-spam)
    if (honeypotInput && honeypotInput.value !== '') {
      console.warn('Spam submission suppressed via honeypot field.');
      return;
    }

    // Full Name check
    if (!fullNameInput || fullNameInput.value.trim().length < 2) {
      setFieldError(fullNameInput, 'nameError', 'Please enter your full name (at least 2 characters).');
      hasError = true;
    } else {
      clearFieldError(fullNameInput, 'nameError');
    }

    // Business Email check
    if (!emailInput || !isValidEmail(emailInput.value.trim())) {
      setFieldError(emailInput, 'emailError', 'Please provide a valid business email address (e.g. name@company.com).');
      hasError = true;
    } else {
      clearFieldError(emailInput, 'emailError');
    }

    // Service dropdown check
    if (!serviceSelect || serviceSelect.value === '') {
      setFieldError(serviceSelect, 'serviceError', 'Please choose the service of interest.');
      hasError = true;
    } else {
      clearFieldError(serviceSelect, 'serviceError');
    }

    // Message check
    if (!messageInput || messageInput.value.trim().length < 15) {
      setFieldError(messageInput, 'messageError', 'Please provide a brief message outlining your needs (minimum 15 characters).');
      hasError = true;
    } else {
      clearFieldError(messageInput, 'messageError');
    }

    if (hasError) {
      // Focus on first invalid input
      const firstError = contactForm.querySelector('.form-input.error, .form-select.error, .form-textarea.error');
      firstError?.focus();
      return;
    }

    // Valid submission processing state
    submitBtn?.classList.add('loading');
    submitBtn?.setAttribute('disabled', 'true');

    // Simulate realistic asynchronous processing
    setTimeout(() => {
      submitBtn?.classList.remove('loading');
      submitBtn?.removeAttribute('disabled');

      if (formResponse) {
        formResponse.className = 'form-response-banner success';
        formResponse.innerHTML = `
          <strong>Client-Side Validation Succeeded (Static Hosting Preview)</strong><br>
          Thank you, <strong>${escapeHtml(fullNameInput.value.trim())}</strong>. Your inquiry for 
          <em>"${escapeHtml(serviceSelect.value)}"</em> is properly formatted.<br>
          <span style="font-size: 0.85rem; color: var(--text-secondary); display: block; margin-top: 6px;">
            ℹ️ <strong>Note on Production Email Delivery:</strong> In this static environment, submissions require a backend endpoint 
            (such as a simple Hostinger PHP mailer script or Formspree). Complete plug-and-play PHP and API integration code 
            is included in the project <code>README.md</code>.
          </span>
        `;
        formResponse.style.display = 'block';
        formResponse.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      contactForm.reset();
    }, 700);
  });

  // Helper function to prevent XSS in simulated notification
  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }
});
