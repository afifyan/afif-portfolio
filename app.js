/* Meet Afif (Muhammad Afif Azian) Executive Portfolio Interactive Engine */

(function () {
  'use strict';

  // Application State
  var state = {
    theme: 'light',
    activeTab: 'overview',
    carouselIndex: 0,
    carouselPlaying: true,
    carouselTimer: null,
    activeFitRole: 'programme',
    timelineFilter: 'all',
    galleryFilter: 'all',
    lightboxIndex: 0,
    lightboxRotation: 0,
    aiIsTyping: false,
    globeRadius: 190,
    globeYaw: (172.48 * Math.PI) / 180,
    globePitch: (-43.64 * Math.PI) / 180,
    globeTargetYaw: null,
    globeTargetPitch: null,
    globeSpinning: true,
    activeGlobeStop: 0
  };

  // Role fit data based on verified CV and brief requirements
  var ROLE_FIT_DATA = {
    programme: {
      title: 'Programme Management & Cohort Delivery',
      subtitle: 'End-to-end execution across Asian Banking School and Maybank FSTEP',
      points: [
        'End-to-end coordination of banking talent and leadership programmes including FSTEP and FORWARD.',
        'Seamless schedule management, materials preparation, attendance tracking, and trainer facilitation.',
        'On-site delivery support at AICB Centre of Excellence, managing trainer requirements and logistics.',
        'Compilation of pre- and post-tests, QR evaluations, and executive reports for leadership teams.'
      ],
      awards: 'FSTEP Best Group Project & Executive Presence awards (2024)',
      subject: 'Intro: Programme Management & Delivery Role',
      emailDraft: 'Hi Afif,\n\nI reviewed your portfolio and banking programme coordination track record at Asian Banking School. We have an opportunity in Programme Operations / Cohort Management that matches your experience with FSTEP and leadership programmes. Let’s connect for an intro conversation.\n\nBest regards,'
    },
    talent: {
      title: 'Talent Operations & Candidate Matching',
      subtitle: 'Candidate consolidation, stakeholder liaison, and employer matching',
      points: [
        'FORWARD candidate management: CV consolidation, submission tracking, and candidate-to-employer matching.',
        'Coordination across member financial institutions, commercial employers, and leadership candidates.',
        'Managing feedback loops with trainers, employers, and participants using structured Microsoft Forms surveys.',
        'Maintaining time-sensitive candidate pipelines and follow-up reporting for talent programmes.'
      ],
      awards: 'Communication with Impact Award & GRADUAN Ambassador (Lincoln NZ)',
      subject: 'Intro: Talent Operations & Candidate Matching Opportunity',
      emailDraft: 'Hi Afif,\n\nI came across your experience managing candidate pipelines and employer matching for FORWARD at Asian Banking School. We have an opening in Talent Operations / People Development and would love to discuss your background.\n\nBest regards,'
    },
    banking: {
      title: 'Banking Client & Merchant Operations',
      subtitle: 'Client management at Maybank, regional merchant recruitment, and compliance',
      points: [
        'Client management and engagement with high-profile corporate merchants including Focus Point and HomePro.',
        'Regional Merchant Cards operations: recruitment, site visits, documentation, and terminal onboarding.',
        'Deep grounding in banking operations, regulatory compliance, and cross-functional branch coordination.',
        'Finance and pilgrimage operations rotation at Lembaga Tabung Haji Negeri Pahang.'
      ],
      awards: 'Maybank FSTEP Management Trainee & PROTEGE Programme Graduate',
      subject: 'Intro: Banking Operations & Merchant Solutions Role',
      emailDraft: 'Hi Afif,\n\nI saw your operational background with Maybank Client Management and Regional Merchant Cards. Your banking knowledge and stakeholder coordination skills are a great fit for our team. Would you be open to an exploratory chat?\n\nBest regards,'
    },
    analytics: {
      title: 'Digital Innovation & Analytics',
      subtitle: 'Pivot 2026 AI showcase, TravWizz pitch at AICB 500 Global, and TalentCorp MyMahir',
      points: [
        'Building structured Excel-based trackers, finance sheets, and executive dashboards for banking programmes.',
        'Pitched signature innovation project TravWizz live on stage at AICB Centre of Excellence / 500 Global demo.',
        'Selected participant in the TalentCorp-sponsored MyMahir four-month Data Analytics Programme (2026).',
        'Active champion for AI and modern tools at Pivot 2026 Build with AI forum.'
      ],
      awards: 'Future Ready Award & TalentCorp MyMahir Analytics Cohort (2026)',
      subject: 'Intro: Digital Innovation & Analytics Opportunity',
      emailDraft: 'Hi Afif,\n\nYour combination of banking programme operations and digital innovation capabilities (TravWizz 500 Global pitch / Pivot 2026 AI / TalentCorp MyMahir analytics) stands out. We’d like to speak with you about an opportunity.\n\nBest regards,'
    }
  };

  // Full Gallery Data Array (15 photos) with verified locations, dates, and milestone descriptions
  var GALLERY_DATA = [
    {
      id: 'fstep-valedictorian',
      src: 'assets/fstep-rising-together-stage.svg',
      width: 1200,
      height: 1600,
      alt: 'Afif Azian delivering Rising Together keynote on stage at Azman Hashim Auditorium',
      title: 'Valedictorian Address: "Rising Together"',
      venue: 'FSTEP Batch 26 · Valedictorian Address',
      date: '2024 / 2025',
      location: 'Azman Hashim Auditorium',
      categories: ['keynotes'],
      desc: 'Wide auditorium view of Afif speaking into the microphone with the massive screen displaying "RISING TOGETHER: A JOURNEY OF INSPIRATION, PASSION AND CONFIDENCE - FSTEP Batch 26", flanked by FSTEP awards and Asian Banking School banner. Selected as the voice of the graduating cohort before banking leaders.',
      rotatedLandscape: false
    },
    {
      id: 'fstep-4-trophies',
      src: 'assets/fstep-quadruple-trophies.svg',
      width: 1066,
      height: 1600,
      alt: 'Afif in black suit and striped tie proudly holding tray with 4 FSTEP Batch 26 excellence and Best Participant trophies',
      title: 'FSTEP Quadruple Honours & Best Participant Award',
      venue: 'FSTEP Batch 26 · Honours & Awards',
      date: '2024 / 2025',
      location: 'Azman Hashim Auditorium · Asian Banking School',
      categories: ['keynotes', 'talent'],
      desc: 'Afif in his suit and striped tie proudly holding his tray of 4 FSTEP Batch 26 excellence trophies. Conferred at the Azman Hashim Auditorium, Asian Banking School, celebrating quadruple honours including Best Participant, Best Presenter, Best Group Project (1st Place), and Executive Presence.',
      rotatedLandscape: false
    },
    {
      id: 'fstep-graduation-conferral',
      src: 'assets/fstep-graduation-conferral.svg',
      width: 1600,
      height: 1067,
      alt: 'Afif receiving official FSTEP graduation certificate on stage from Bank Negara Malaysia and Asian Banking School leadership',
      title: 'FSTEP Batch 26 Official Graduation Conferral',
      venue: 'FSTEP Batch 26 Graduation Ceremony',
      date: '2 July 2024',
      location: 'Azman Hashim Auditorium, Level G, Bangunan AICB',
      categories: ['keynotes', 'talent'],
      desc: 'Official certificate conferral on stage at the FSTEP Batch 26 Graduation Ceremony (2 July 2024) at the Azman Hashim Auditorium, Level G, Bangunan AICB. Afif receives his framed graduation credentials from Bank Negara Malaysia and Asian Banking School leadership, commemorating premier honours and executive accomplishment.',
      rotatedLandscape: false
    },
    {
      id: 'fstep-graduation-cohort',
      src: 'assets/fstep-graduation-cohort.svg',
      width: 1600,
      height: 1200,
      alt: 'Afif seated center in suit and yellow tie surrounded by graduating FSTEP Batch 26 cohort in Azman Hashim Auditorium',
      title: 'FSTEP Batch 26 Graduation Cohort Assembly',
      venue: 'FSTEP Batch 26 Graduation Ceremony',
      date: '2 July 2024',
      location: 'Azman Hashim Auditorium, Level G, Bangunan AICB',
      categories: ['talent', 'culture'],
      desc: 'FSTEP Batch 26 Graduation Ceremony cohort assembly inside the Azman Hashim Auditorium, Level G, Bangunan AICB. Afif is seated center in business suit and yellow tie, surrounded by his graduating cohort of banking peers and management trainees celebrating shared professional transformation across Malaysia\'s financial ecosystem.',
      rotatedLandscape: false
    },
    {
      id: 'abs-inspiration-keynote',
      src: 'assets/abs-inspiration-keynote-wide.svg',
      width: 1600,
      height: 1067,
      alt: 'Wide-angle keynote perspective of Afif on Azman Hashim Auditorium stage under INSPIRATION / Muhammad Afif Azian projection screen',
      title: 'Stage Keynote: "Inspiration" Address',
      venue: 'Azman Hashim Auditorium Stage',
      date: '2024 / 2026',
      location: 'Azman Hashim Auditorium, Level G, Bangunan AICB',
      categories: ['keynotes'],
      desc: 'Wide-angle perspective of Afif delivering his keynote from the stage of the Azman Hashim Auditorium, Level G, Bangunan AICB. The monumental auditorium screen projects "INSPIRATION / Muhammad Afif Azian" with production broadcast camera equipment in the foreground and Asian Banking School banners flanking the stage.',
      rotatedLandscape: false
    },
    {
      id: 'abs-keynote',
      src: 'assets/abs-keynote-stage.svg',
      width: 1600,
      height: 1067,
      alt: 'Afif in black suit with yellow striped tie presenting on stage at Asian Banking School',
      title: 'Keynote & Opening Delivery at Asian Banking School',
      venue: 'Asian Banking School (ABS)',
      date: '2026',
      location: 'Azman Hashim Auditorium',
      categories: ['keynotes'],
      desc: 'Afif in black suit with yellow striped tie presenting on stage at the Azman Hashim Auditorium in front of a slide reading "Muhammad Afif Azian" alongside the blue Asian Banking School banner. Delivering executive briefings and milestone openings for banking delegates.',
      rotatedLandscape: false
    },
    {
      id: 'fstep-community-csr',
      src: 'assets/fstep-community-csr.svg',
      width: 1200,
      height: 1600,
      alt: 'Afif in business suit and tie smiling with local youth flashing peace signs during FSTEP CSR initiative',
      title: 'FSTEP Community Outreach & Youth CSR',
      venue: 'FSTEP Batch 26 CSR Initiative',
      date: '2024',
      location: 'FSTEP CSR Community Center',
      categories: ['culture', 'talent'],
      desc: 'Afif posing warmly in formal suit and tie with a local youth flashing peace signs during the FSTEP Batch 26 Community Outreach and CSR initiative. Highlighting social responsibility, community empathy, and collaborative spirit that complement financial sector operations.',
      rotatedLandscape: false
    },
    {
      id: 'aicb-batik',
      src: 'assets/aicb-cohort-batik.svg',
      width: 1200,
      height: 1600,
      alt: 'Cohort group in traditional batik on wooden stairs at AICB Centre of Excellence',
      title: 'Cohort & Team Culture in Traditional Batik',
      venue: 'AICB Centre of Excellence · Culture',
      date: '2024 / 2025',
      location: 'AICB Grand Stairs',
      categories: ['culture', 'talent'],
      desc: 'Group photo of seven young professionals smiling on the grand architectural wooden staircase inside AICB Centre of Excellence, proudly wearing traditional Malaysian batik patterns in front of the acrylic red AICB Centre of Excellence emblem.',
      rotatedLandscape: false
    },
    {
      id: 'reception-networking',
      src: 'assets/reception-networking.svg',
      width: 1600,
      height: 1200,
      alt: 'Afif smiling in suit holding teacup at networking reception at Sasana Kijang',
      title: 'Executive Networking & Industry Relations',
      venue: 'Executive Networking Foyer',
      date: '2025 / 2026',
      location: 'Sasana Kijang / AICB',
      categories: ['culture', 'talent'],
      desc: 'Afif in black suit with navy tie smiling warmly while holding up a teacup during an executive networking reception at Sasana Kijang / AICB. Highlighting industry relations with central bankers, commercial banking HR heads, and cohort delegates.',
      rotatedLandscape: false
    },
    {
      id: 'auditorium-colleagues',
      src: 'assets/auditorium-colleagues.svg',
      width: 1080,
      height: 810,
      alt: 'Afif posing with colleague in formal business attire in Azman Hashim Auditorium',
      title: 'Banking Leadership Cohort Network',
      venue: 'Banking Leadership Cohort',
      date: '2024 / 2025',
      location: 'Azman Hashim Auditorium',
      categories: ['talent'],
      desc: 'Afif standing side-by-side with a fellow banking management trainee inside the Azman Hashim Auditorium in formal business attire, exemplifying cohort teamwork, mutual respect, and the lifelong professional network forged in banking talent programmes.',
      rotatedLandscape: false
    },
    {
      id: 'outdoor-resilience',
      src: 'assets/outdoor-adventure-resilience.svg',
      width: 1600,
      height: 1067,
      alt: 'Afif in blue Dodgers shirt sitting upright on elevated bamboo viewing platform high above lush green pine forest in horizontal landscape view',
      title: 'Outdoor Adventure, Dynamic Resilience & Grit',
      venue: 'Outdoor Leadership Camp',
      date: '2024',
      location: 'High Forest Ridge',
      categories: ['culture'],
      desc: 'Outdoor team building high above a lush green pine forest on an elevated bamboo viewing platform, demonstrating dynamic energy, physical endurance, and mental toughness. Displayed in horizontal landscape orientation with level bamboo deck and upright pine forest.',
      rotatedLandscape: true
    },
    {
      id: 'pivot-2026',
      src: 'assets/profile-portrait.svg',
      width: 1200,
      height: 1600,
      alt: 'Muhammad Afif Azian at Pivot 2026 Build with AI showcase',
      title: 'Pivot 2026: Build with AI Forum',
      venue: 'Pivot 2026 Innovation Showcase',
      date: '2026',
      location: 'Pivot Innovation Forum',
      categories: ['innovation'],
      desc: 'Championing the convergence of AI tools, automated prompt workflows, and data analytics into banking talent operations, candidate matching, and modern learning design at the Pivot 2026 "Build with AI: Explore · Experience · Apply" forum.',
      rotatedLandscape: false
    },
    {
      id: 'travwizz-pitch',
      src: 'assets/travwizz-demo.svg',
      width: 750,
      height: 1000,
      alt: 'Afif pitching TravWizz with 500 Global illuminated sign and AICB banner',
      title: 'TravWizz Innovation Demo Pitch',
      venue: 'AICB Centre of Excellence · 500 Global',
      date: '2024 / 2025',
      location: '500 Global Stage',
      categories: ['innovation'],
      desc: 'Pitching the signature travel-tech SaaS solution before international 500 Global mentors and senior financial sector adjudicators, demonstrating full-stack product thinking, intuitive UX, and clean architectural clarity.',
      rotatedLandscape: false
    },
    {
      id: 'graduation-rostrum',
      src: 'assets/speaking-suit-podium.svg',
      width: 750,
      height: 1000,
      alt: 'Afif delivering official address at FSTEP graduation rostrum',
      title: 'FSTEP Graduation Ceremony Speaker',
      venue: 'Official FSTEP Ceremony',
      date: '2024 / 2025',
      location: 'AICB Auditorium Rostrum',
      categories: ['keynotes'],
      desc: 'Selected speaker addressing banking sponsors, Bank Negara Malaysia representatives, and management trainee peers from the official ceremony rostrum at the AICB Centre of Excellence.',
      rotatedLandscape: false
    },
    {
      id: 'classroom-facilitation',
      src: 'assets/speaking-conference-room.svg',
      width: 1000,
      height: 750,
      alt: 'Afif facilitating a banking programme session in conference room',
      title: 'Classroom Facilitation & Logistics Execution',
      venue: 'Classroom Operations',
      date: '2026',
      location: 'Asian Banking School Suites',
      categories: ['talent'],
      desc: 'Managing live classroom operations across FORWARD and FSTEP at Asian Banking School: briefing external trainers, handling attendance, administering QR evaluation surveys, and resolving operational logistics in real-time.',
      rotatedLandscape: false
    }
  ];

  // ==========================================
  // 1. THEME MANAGEMENT
  // ==========================================
  function initTheme() {
    var storedTheme = null;
    try {
      storedTheme = localStorage.getItem('afif_theme');
    } catch (e) {
      storedTheme = null;
    }

    if (!storedTheme) {
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      storedTheme = prefersDark ? 'dark' : 'light';
    }

    setTheme(storedTheme);

    var toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var nextTheme = state.theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
      });
    }
  }

  function setTheme(theme) {
    state.theme = theme;
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    try {
      localStorage.setItem('afif_theme', theme);
    } catch (e) {}

    var toggleBtn = document.getElementById('theme-toggle-btn');
    var labelEl = document.getElementById('theme-mode-label');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      if (labelEl) {
        labelEl.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
      }
    }
  }

  // ==========================================
  // 2. TAB NAVIGATION
  // ==========================================
  function switchTab(targetId, updateHash) {
    var sanitized = targetId.replace('#', '');
    // Support alias: 'speaking' -> 'journey', 'globe' -> 'journey'
    if (sanitized === 'speaking' || sanitized === 'globe' || sanitized === 'career-globe') {
      sanitized = 'journey';
    }

    var targetPanel = document.getElementById(sanitized);
    var tabButtons = document.querySelectorAll('.tab-btn');
    var panels = document.querySelectorAll('.tab-panel');

    if (!targetPanel) return;

    tabButtons.forEach(function (btn) {
      var ctrl = btn.getAttribute('aria-controls');
      var isTarget = (ctrl === sanitized) || (ctrl === 'journey' && (sanitized === 'speaking' || sanitized === 'globe'));
      btn.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      btn.setAttribute('tabindex', isTarget ? '0' : '-1');
    });

    panels.forEach(function (panel) {
      if (panel.id === sanitized) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    state.activeTab = sanitized;

    if (updateHash && window.location.hash !== '#' + sanitized) {
      history.replaceState(null, '', '#' + sanitized);
    }

    if (sanitized === 'journey' && typeof window.onJourneyTabActive === 'function') {
      window.onJourneyTabActive();
    }
  }

  function initTabs() {
    var tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(function (btn, index) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = btn.getAttribute('aria-controls');
        switchTab(targetId, true);
      });

      btn.addEventListener('keydown', function (e) {
        var nextIndex = -1;
        if (e.key === 'ArrowRight') {
          nextIndex = (index + 1) % tabButtons.length;
        } else if (e.key === 'ArrowLeft') {
          nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
        } else if (e.key === 'Home') {
          nextIndex = 0;
        } else if (e.key === 'End') {
          nextIndex = tabButtons.length - 1;
        }

        if (nextIndex !== -1) {
          e.preventDefault();
          tabButtons[nextIndex].focus();
          var targetId = tabButtons[nextIndex].getAttribute('aria-controls');
          switchTab(targetId, true);
        }
      });
    });

    // Check initial hash
    var currentHash = window.location.hash ? window.location.hash.substring(1) : 'overview';
    if (currentHash === 'speaking') currentHash = 'journey';

    if (document.getElementById(currentHash)) {
      switchTab(currentHash, false);
    } else {
      switchTab('overview', false);
    }

    // Direct in-page tab switches
    var directTabLinks = document.querySelectorAll('[data-target-tab]');
    directTabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetTab = link.getAttribute('data-target-tab');
        switchTab(targetTab, true);
        var targetEl = document.getElementById(targetTab);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ==========================================
  // 3. WIDE EXPANSIVE HERO CAROUSEL (11 SLIDES)
  // ==========================================
  function initCarousel() {
    var track = document.getElementById('carousel-track');
    var slides = document.querySelectorAll('.carousel-slide');
    var prevBtn = document.getElementById('carousel-prev-btn');
    var nextBtn = document.getElementById('carousel-next-btn');
    var playToggleBtn = document.getElementById('carousel-play-toggle');
    var playPauseSvg = document.getElementById('play-pause-svg');
    var dots = document.querySelectorAll('.dot-btn');
    var statusText = document.getElementById('carousel-status-text');
    var liveRegion = document.getElementById('carousel-live-region');
    var container = document.getElementById('carousel-container');

    if (!track || slides.length === 0) return;

    var totalSlides = slides.length;

    function renderSlide(index, announce) {
      state.carouselIndex = index;
      var offset = -index * 100;
      track.style.transform = 'translateX(' + offset + '%)';

      dots.forEach(function (dot, i) {
        dot.setAttribute('aria-current', i === index ? 'true' : 'false');
      });

      if (statusText) {
        statusText.textContent = (index + 1) + ' of ' + totalSlides;
      }

      if (announce && liveRegion) {
        var currentTitle = slides[index].querySelector('.carousel-caption-title');
        var titleText = currentTitle ? currentTitle.textContent : ('Slide ' + (index + 1));
        liveRegion.textContent = 'Slide ' + (index + 1) + ' of ' + totalSlides + ': ' + titleText;
      }
    }

    function nextSlide(userInitiated) {
      var next = (state.carouselIndex + 1) % totalSlides;
      renderSlide(next, userInitiated);
    }

    function prevSlide(userInitiated) {
      var prev = (state.carouselIndex - 1 + totalSlides) % totalSlides;
      renderSlide(prev, userInitiated);
    }

    function startTimer() {
      stopTimer();
      var motionReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (motionReduced) {
        state.carouselPlaying = false;
        updatePlayToggleUi();
        return;
      }

      if (state.carouselPlaying) {
        state.carouselTimer = setInterval(function () {
          nextSlide(false);
        }, 5500);
      }
    }

    function stopTimer() {
      if (state.carouselTimer) {
        clearInterval(state.carouselTimer);
        state.carouselTimer = null;
      }
    }

    function updatePlayToggleUi() {
      if (!playToggleBtn) return;
      var textEl = playToggleBtn.querySelector('.play-toggle-text');
      if (state.carouselPlaying) {
        playToggleBtn.setAttribute('aria-label', 'Pause photo carousel');
        if (textEl) textEl.textContent = 'Pause';
        if (playPauseSvg) {
          playPauseSvg.innerHTML = '<rect x="6" y="4" width="4" height="16" fill="currentColor"></rect><rect x="14" y="4" width="4" height="16" fill="currentColor"></rect>';
        }
      } else {
        playToggleBtn.setAttribute('aria-label', 'Play photo carousel');
        if (textEl) textEl.textContent = 'Play';
        if (playPauseSvg) {
          playPauseSvg.innerHTML = '<polygon points="5,3 19,12 5,21" fill="currentColor"></polygon>';
        }
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        nextSlide(true);
        if (state.carouselPlaying) startTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        prevSlide(true);
        if (state.carouselPlaying) startTimer();
      });
    }

    if (playToggleBtn) {
      playToggleBtn.addEventListener('click', function () {
        state.carouselPlaying = !state.carouselPlaying;
        updatePlayToggleUi();
        if (state.carouselPlaying) {
          startTimer();
        } else {
          stopTimer();
        }
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        renderSlide(i, true);
        if (state.carouselPlaying) startTimer();
      });
    });

    if (container) {
      container.addEventListener('mouseenter', function () {
        if (state.carouselPlaying) stopTimer();
      });
      container.addEventListener('mouseleave', function () {
        if (state.carouselPlaying) startTimer();
      });
      container.addEventListener('focusin', function () {
        if (state.carouselPlaying) stopTimer();
      });
      container.addEventListener('focusout', function () {
        if (state.carouselPlaying) startTimer();
      });

      container.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide(true);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide(true);
        }
      });
    }

    renderSlide(0, false);
    updatePlayToggleUi();
    startTimer();

    // Outdoor 360-degree rotation in carousel
    var carouselOutdoorRotateBtn = document.getElementById('carousel-outdoor-rotate-btn');
    var carouselOutdoorImg = document.getElementById('carousel-outdoor-img');
    var carouselRotAngleText = document.getElementById('carousel-rot-angle');
    var carouselOutdoorRotation = 0;

    if (carouselOutdoorRotateBtn && carouselOutdoorImg) {
      carouselOutdoorRotateBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        stopTimer();
        state.carouselPlaying = false;
        updatePlayToggleUi();

        carouselOutdoorRotation = (carouselOutdoorRotation + 90) % 360;
        var totalDeg = 90 + carouselOutdoorRotation;
        carouselOutdoorImg.style.transform = 'translate(-50%, -50%) rotate(' + totalDeg + 'deg)';
        if (carouselRotAngleText) {
          carouselRotAngleText.textContent = carouselOutdoorRotation + '°';
        }
      });
    }
  }

  // ==========================================
  // 4. INTERACTIVE PHOTO GALLERY & LIGHTBOX
  // ==========================================
  function initGallery() {
    var grid = document.getElementById('main-gallery-grid');
    var filterBtns = document.querySelectorAll('[data-gallery-filter]');
    var countEl = document.getElementById('gallery-visible-count');
    var lightbox = document.getElementById('gallery-lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxTitle = document.getElementById('lightbox-photo-title');
    var lightboxDesc = document.getElementById('lightbox-desc');
    var lightboxVenue = document.getElementById('lightbox-venue-tag');
    var lightboxDate = document.getElementById('lightbox-date-badge');
    var lightboxCounter = document.getElementById('lightbox-counter');
    var lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    var lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
    var lightboxNextBtn = document.getElementById('lightbox-next-btn');
    var lightboxRotateBtn = document.getElementById('lightbox-rotate-btn');
    var lightboxRotAngle = document.getElementById('lightbox-rot-angle');

    if (!grid) return;

    // Render gallery items
    function renderGalleryCards(activeCategory) {
      grid.innerHTML = '';
      var visibleCount = 0;

      GALLERY_DATA.forEach(function (item, index) {
        var isMatch = activeCategory === 'all' || item.categories.indexOf(activeCategory) !== -1;
        if (!isMatch) return;

        visibleCount++;

        var card = document.createElement('article');
        card.className = 'gallery-card';
        card.setAttribute('data-category', item.categories.join(' '));
        card.setAttribute('data-item-index', index);

        var mediaDiv = document.createElement('div');
        mediaDiv.className = 'gallery-media';
        mediaDiv.setAttribute('data-lightbox-trigger', index);
        mediaDiv.style.cursor = 'pointer';

        var locationBadge = document.createElement('span');
        locationBadge.className = 'gallery-location-badge';
        locationBadge.textContent = item.location;

        if (item.rotatedLandscape) {
          var containerDiv = document.createElement('div');
          containerDiv.className = 'landscape-rotated-container';

          var img = document.createElement('img');
          img.src = item.src;
          img.alt = item.alt;
          img.className = 'gallery-img rotated-photo-img';
          img.width = item.width;
          img.height = item.height;

          containerDiv.appendChild(img);
          mediaDiv.appendChild(containerDiv);
        } else {
          var img = document.createElement('img');
          img.src = item.src;
          img.alt = item.alt;
          img.className = 'gallery-img';
          img.width = item.width;
          img.height = item.height;

          mediaDiv.appendChild(img);
        }

        var zoomTrigger = document.createElement('span');
        zoomTrigger.className = 'gallery-zoom-trigger';
        zoomTrigger.textContent = '🔍 Zoom';

        mediaDiv.appendChild(locationBadge);
        mediaDiv.appendChild(zoomTrigger);

        if (item.id === 'outdoor-resilience') {
          var cardRotateBtn = document.createElement('button');
          cardRotateBtn.type = 'button';
          cardRotateBtn.className = 'rotate-control-btn gallery-card-rotate-btn';
          cardRotateBtn.setAttribute('aria-label', 'Rotate outdoor photo 360 degrees');
          var cardAngleSpan = document.createElement('span');
          cardAngleSpan.className = 'rot-angle-text';
          cardAngleSpan.textContent = '0°';
          cardRotateBtn.innerHTML = '<svg class="rotate-icon-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg><span>⟳ Rotate / 360° View</span> ';
          cardRotateBtn.appendChild(cardAngleSpan);

          var cardAngle = 0;
          var targetImg = img;
          cardRotateBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            cardAngle = (cardAngle + 90) % 360;
            var totalDeg = 90 + cardAngle;
            targetImg.style.transform = 'translate(-50%, -50%) rotate(' + totalDeg + 'deg)';
            cardAngleSpan.textContent = cardAngle + '°';
          });
          mediaDiv.appendChild(cardRotateBtn);
        }

        var contentDiv = document.createElement('div');
        contentDiv.className = 'gallery-content';

        var metaRow = document.createElement('div');
        metaRow.className = 'gallery-meta-row';

        var venueTag = document.createElement('span');
        venueTag.className = 'gallery-venue';
        venueTag.textContent = item.venue;

        var dateTag = document.createElement('span');
        dateTag.className = 'gallery-date-tag';
        dateTag.textContent = item.date;

        metaRow.appendChild(venueTag);
        metaRow.appendChild(dateTag);

        var title = document.createElement('h4');
        title.className = 'gallery-title';
        title.textContent = item.title;

        var desc = document.createElement('p');
        desc.className = 'gallery-desc';
        desc.textContent = item.desc;

        var zoomBtn = document.createElement('button');
        zoomBtn.type = 'button';
        zoomBtn.className = 'gallery-zoom-btn';
        zoomBtn.setAttribute('data-lightbox-trigger', index);
        zoomBtn.textContent = 'View High-Resolution & Milestone Story';

        contentDiv.appendChild(metaRow);
        contentDiv.appendChild(title);
        contentDiv.appendChild(desc);
        contentDiv.appendChild(zoomBtn);

        card.appendChild(mediaDiv);
        card.appendChild(contentDiv);

        grid.appendChild(card);
      });

      if (countEl) {
        countEl.textContent = 'Showing ' + visibleCount + ' of ' + GALLERY_DATA.length + ' items';
      }

      // Attach click events on new cards
      var triggers = grid.querySelectorAll('[data-lightbox-trigger]');
      triggers.forEach(function (trig) {
        trig.addEventListener('click', function () {
          var idx = parseInt(trig.getAttribute('data-lightbox-trigger'), 10);
          openLightbox(idx);
        });
      });
    }

    // Filter Buttons
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = btn.getAttribute('data-gallery-filter');
        state.galleryFilter = category;

        filterBtns.forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });

        renderGalleryCards(category);
      });
    });

    // Jump buttons from Journey Map chapters
    var jumpButtons = document.querySelectorAll('[data-filter-jump]');
    jumpButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetCat = btn.getAttribute('data-filter-jump');
        var matchingFilterBtn = document.querySelector('[data-gallery-filter="' + targetCat + '"]');
        if (matchingFilterBtn) {
          matchingFilterBtn.click();
        }
        var showcaseEl = document.getElementById('gallery-interactive-showcase');
        if (showcaseEl) {
          showcaseEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Chapter direct thumbnail buttons (supports both data-lightbox-id and data-lightbox-index)
    var chapterThumbBtns = document.querySelectorAll('[data-lightbox-id], [data-lightbox-index]');
    chapterThumbBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-lightbox-id');
        if (targetId) {
          for (var i = 0; i < GALLERY_DATA.length; i++) {
            if (GALLERY_DATA[i].id === targetId) {
              openLightbox(i);
              return;
            }
          }
        }
        var idx = parseInt(btn.getAttribute('data-lightbox-index'), 10);
        if (!isNaN(idx)) {
          openLightbox(idx);
        }
      });
    });

    // Chapter 6 Outdoor 360-degree rotation button
    var journeyOutdoorRotateBtn = document.getElementById('journey-outdoor-rotate-btn');
    var journeyOutdoorImg = document.getElementById('journey-outdoor-img');
    var journeyRotAngleText = document.getElementById('journey-rot-angle');
    var journeyOutdoorRotation = 0;

    if (journeyOutdoorRotateBtn && journeyOutdoorImg) {
      journeyOutdoorRotateBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        journeyOutdoorRotation = (journeyOutdoorRotation + 90) % 360;
        var totalDeg = 90 + journeyOutdoorRotation;
        journeyOutdoorImg.style.transform = 'translate(-50%, -50%) rotate(' + totalDeg + 'deg)';
        if (journeyRotAngleText) {
          journeyRotAngleText.textContent = journeyOutdoorRotation + '°';
        }
      });
    }

    // Lightbox functions
    function openLightbox(indexOrId) {
      if (!lightbox) return;
      var index = 0;
      if (typeof indexOrId === 'string') {
        for (var i = 0; i < GALLERY_DATA.length; i++) {
          if (GALLERY_DATA[i].id === indexOrId || GALLERY_DATA[i].src === indexOrId) {
            index = i;
            break;
          }
        }
      } else if (typeof indexOrId === 'number' && !isNaN(indexOrId)) {
        index = Math.max(0, Math.min(GALLERY_DATA.length - 1, indexOrId));
      }
      state.lightboxIndex = index;
      var item = GALLERY_DATA[index];
      if (!item) return;

      state.lightboxRotation = 0;
      if (lightboxRotAngle) lightboxRotAngle.textContent = '0°';

      updateLightboxDisplay();
      lightbox.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';

      if (lightboxCloseBtn) {
        lightboxCloseBtn.focus();
      }
    }

    function updateLightboxDisplay() {
      var item = GALLERY_DATA[state.lightboxIndex];
      var stageEl = document.getElementById('lightbox-stage');
      if (!item || !lightbox) return;

      if (stageEl) {
        if (item.rotatedLandscape) {
          stageEl.classList.add('lightbox-stage-rotated');
        } else {
          stageEl.classList.remove('lightbox-stage-rotated');
        }
      }

      if (lightboxImg) {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.alt;
        if (item.rotatedLandscape) {
          lightboxImg.className = 'lightbox-img rotated-photo-img';
          lightboxImg.style.transform = 'translate(-50%, -50%) rotate(' + (90 + state.lightboxRotation) + 'deg)';
        } else {
          lightboxImg.className = 'lightbox-img';
          lightboxImg.style.transform = state.lightboxRotation ? ('rotate(' + state.lightboxRotation + 'deg)') : 'none';
        }
      }

      if (lightboxTitle) lightboxTitle.textContent = item.title;
      if (lightboxDesc) lightboxDesc.textContent = item.desc;
      if (lightboxVenue) lightboxVenue.textContent = item.venue + ' · ' + item.location;
      if (lightboxDate) lightboxDate.textContent = item.date;
      if (lightboxCounter) lightboxCounter.textContent = 'Photo ' + (state.lightboxIndex + 1) + ' of ' + GALLERY_DATA.length;
      if (lightboxRotAngle) lightboxRotAngle.textContent = state.lightboxRotation + '°';
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.setAttribute('hidden', '');
      document.body.style.overflow = '';
      state.lightboxRotation = 0;
      if (lightboxRotAngle) lightboxRotAngle.textContent = '0°';
      if (lightboxImg) {
        lightboxImg.style.transform = 'none';
        lightboxImg.className = 'lightbox-img';
      }
      var stageEl = document.getElementById('lightbox-stage');
      if (stageEl) {
        stageEl.classList.remove('lightbox-stage-rotated');
      }
    }

    function nextLightboxPhoto() {
      state.lightboxIndex = (state.lightboxIndex + 1) % GALLERY_DATA.length;
      state.lightboxRotation = 0;
      if (lightboxRotAngle) lightboxRotAngle.textContent = '0°';
      updateLightboxDisplay();
    }

    function prevLightboxPhoto() {
      state.lightboxIndex = (state.lightboxIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
      state.lightboxRotation = 0;
      if (lightboxRotAngle) lightboxRotAngle.textContent = '0°';
      updateLightboxDisplay();
    }

    function rotateLightboxPhoto() {
      state.lightboxRotation = (state.lightboxRotation + 90) % 360;
      var item = GALLERY_DATA[state.lightboxIndex];
      if (lightboxImg) {
        if (item && item.rotatedLandscape) {
          lightboxImg.style.transform = 'translate(-50%, -50%) rotate(' + (90 + state.lightboxRotation) + 'deg)';
        } else {
          lightboxImg.style.transform = 'rotate(' + state.lightboxRotation + 'deg)';
        }
      }
      if (lightboxRotAngle) {
        lightboxRotAngle.textContent = state.lightboxRotation + '°';
      }
    }

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightboxPhoto);
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightboxPhoto);
    if (lightboxRotateBtn) lightboxRotateBtn.addEventListener('click', rotateLightboxPhoto);

    // Backdrop click
    if (lightbox) {
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
    }

    // Keyboard controls for modal
    window.addEventListener('keydown', function (e) {
      if (lightbox && !lightbox.hasAttribute('hidden')) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextLightboxPhoto();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevLightboxPhoto();
        }
      }
    });

    // Initial render
    renderGalleryCards('all');
    window.openAfifLightbox = openLightbox;
  }

  // ==========================================
  // 5. BUILT-IN AI ASSISTANT ("ASK AFIF AI")
  // ==========================================
  var AI_KNOWLEDGE_BASE = [
    {
      keywords: ['photo', 'photos', 'gallery', 'stage', 'keynote', 'azman hashim', 'rising together', 'batik', 'teacup', 'pine', 'outdoor', 'bamboo', 'trophy', 'trophies', 'graduation', 'conferral', 'cohort', 'csr', 'outreach', 'inspiration'],
      lead: "Afif has comprehensive verified photo documentation across his career milestones (15 high-impact photos):",
      bullets: [
        "FSTEP Batch 26 Official Graduation Conferral (2 July 2024): Receiving his certificate on stage from Bank Negara Malaysia and Asian Banking School leadership at the Azman Hashim Auditorium, Level G, Bangunan AICB.",
        "FSTEP Batch 26 Graduation Cohort: Seated center in business suit and yellow tie surrounded by his graduating cohort of banking peers.",
        "Stage Keynote 'Inspiration' Address: Wide-angle stage perspective beneath the monumental 'INSPIRATION / Muhammad Afif Azian' screen with broadcast cameras.",
        "FSTEP Batch 26 Valedictorian Address: Speaking on stage delivering 'Rising Together: A Journey of Inspiration, Passion and Confidence'.",
        "FSTEP Quadruple Honours & Best Participant: In his suit proudly holding 4 excellence trophies (Best Participant, Best Presenter, Best Group Project, Executive Presence).",
        "FSTEP Community Outreach & CSR: Connecting with local youth flashing peace signs, highlighting social responsibility and community empathy.",
        "Asian Banking School Keynote: Presenting before the Asian Banking School auditorium stage banner.",
        "AICB Centre of Excellence Cohort: Cultural celebration in traditional Malaysian batik attire on the iconic wooden stairs.",
        "Executive Networking: Reception at Sasana Kijang / AICB holding teacup engaging central banking delegates.",
        "Outdoor Leadership Resilience: High-altitude endurance and grit on an elevated bamboo viewing platform in pine forest (horizontal landscape view).",
        "TravWizz & Pivot 2026: Live stage pitch before 500 Global mentors and 'Build with AI' presentation."
      ],
      actions: [
        { label: "Explore Journey & Gallery", tab: "journey" },
        { label: "Inspect Stage Pitch Photos", tab: "journey" }
      ]
    },
    {
      keywords: ['journey', 'journey map', 'chapters', 'career map', 'timeline'],
      lead: "Afif's career journey spans 6 pivotal chapters:",
      bullets: [
        "Chapter 1: Early Foundations & Academic Distinction (KPM 3.88 CGPA & Lincoln University NZ BCom).",
        "Chapter 2: Banking Operations & Merchant Solutions (Maybank Regional Cards & Lembaga Tabung Haji).",
        "Chapter 3: FSTEP Batch 26 Valedictory, Graduation & Best Participant (Holding 4 Honours Trophies, BNM Stage Conferral & Valedictorian Address).",
        "Chapter 4: Asian Banking School Programme Delivery & AICB (FSTEP, FORWARD & Executive Cohort Ops).",
        "Chapter 5: AI & Innovation Pivots (Pivot 2026 AI, 500 Global TravWizz Demo, TalentCorp MyMahir).",
        "Chapter 6: Outdoor, Resilience, Culture & Community (CSR youth outreach, Batik celebrations, Sasana Kijang networking, forest leadership)."
      ],
      actions: [
        { label: "Open Career Journey Map", tab: "journey" },
        { label: "View Detailed Experience", tab: "experience" }
      ]
    },
    {
      keywords: ['programme', 'banking programme', 'abs', 'asian banking school', 'fstep delivery', 'forward delivery', 'cohort', 'facilitation', 'aicb'],
      lead: "At Asian Banking School (ABS) as Executive in Digital Banking & Leadership (Mar 2026 – Present), Afif leads end-to-end cohort operations and delivery:",
      bullets: [
        "Coordinates administrative operations across FSTEP, FORWARD, and executive banking programmes.",
        "Manages session scheduling, training materials, participant communications, and trainer logistics.",
        "Maintains operational and finance trackers, monitoring time-sensitive milestone deliverables and budget lines.",
        "Facilitates on-site sessions at the prestigious AICB Centre of Excellence auditorium and classroom suites.",
        "Oversees QR survey evaluations, pre- and post-tests, and prepares Excel reporting dashboards for banking leadership."
      ],
      actions: [
        { label: "View Journey & Gallery", tab: "journey" },
        { label: "View Experience Timeline", tab: "experience" }
      ]
    },
    {
      keywords: ['award', 'awards', 'fstep award', 'fstep honours', 'honours', 'trophies', 'trophy', 'best participant', 'best presenter', 'best group project', 'executive presence', 'communication with impact', 'future ready', 'graduation speaker', 'graduation ceremony', 'conferral'],
      lead: "Afif earned 4 prestigious FSTEP awards and was officially conferred on stage during graduation:",
      bullets: [
        "Official Stage Conferral (2 July 2024): Received official certificate on stage from Bank Negara Malaysia and Asian Banking School leadership at Azman Hashim Auditorium, Level G, Bangunan AICB.",
        "Best Participant Award: Conferred for overall outstanding commitment, leadership and exemplary programme participation.",
        "Best Presenter / Communication with Impact Award: Recognized for rhetorical clarity, persuasive structure, and auditorium delivery at Azman Hashim Auditorium.",
        "1st Place Best Group Project Award: Led the winning team across all participating financial sector divisions.",
        "Executive Presence Award: Conferred by senior evaluators for professional composure, stakeholder poise, and leadership demeanour.",
        "Future Ready Award: Conferred for tech adaptability, proactive problem-solving, and digital banking mindset.",
        "Official Valedictorian & Graduation Speaker: Handpicked to address banking leaders, sponsors, and peers from the main stage."
      ],
      actions: [
        { label: "View Awards & Honours", tab: "education" },
        { label: "Inspect Valedictorian Photos", tab: "journey" }
      ]
    },
    {
      keywords: ['candidate', 'matching', 'talent', 'talent operations', 'cv', 'forward candidate', 'employer', 'liaison'],
      lead: "For candidate matching and talent operations under the FORWARD initiative at Asian Banking School, Afif manages:",
      bullets: [
        "CV Consolidation & Pipeline: Structured intake and tracking of banking talent candidates.",
        "Precision Candidate-to-Employer Matching: Aligning candidate competencies with commercial banking sponsor requirements.",
        "Liaison with Financial Institutions: Coordinating with HR partners across commercial banks, trainers, and candidates.",
        "Structured Assessment & Feedback Loops: Designing Microsoft Forms surveys, attendance verification, and performance compilation."
      ],
      actions: [
        { label: "Check Operational Capabilities", tab: "overview" },
        { label: "Schedule an Intro Call", tab: "contact" }
      ]
    },
    {
      keywords: ['digital', 'ai', 'ai innovator', 'travwizz', '500 global', 'pivot 2026', 'analytics', 'mymahir', 'tech'],
      lead: "Afif bridges banking operations with practical digital innovation and AI applications:",
      bullets: [
        "Pivot 2026 'Build with AI' Forum: Active champion for integrating AI workflows and data automation into learning operations.",
        "TravWizz Demo Pitch at 500 Global: Pitched his signature travel-tech platform live on stage at AICB Centre of Excellence.",
        "TalentCorp MyMahir Data Analytics (2026): Selected participant in an intensive four-month data analytics programme.",
        "Data-Driven Dashboards: Builds Excel analytical models and automated trackers to streamline programme monitoring."
      ],
      actions: [
        { label: "Read TravWizz Showcase", tab: "overview" },
        { label: "View Stage Pitch Gallery", tab: "journey" }
      ]
    },
    {
      keywords: ['education', 'degree', 'lincoln', 'new zealand', 'kpm', 'mara', 'cgpa', 'university', 'bcom', 'diploma'],
      lead: "Afif has strong formal training in Economics, Finance, and Islamic Banking across New Zealand and Malaysia:",
      bullets: [
        "Lincoln University (New Zealand): Bachelor of Commerce in Economics & Finance (Jul 2019 – May 2021).",
        "GRADUAN Ambassador (2020): Official representative for Malaysian students at Lincoln University, NZ.",
        "Kolej Profesional MARA Bandar Melaka: Diploma of Islamic Banking and Finance (Jul 2016 – Feb 2019) with a stellar 3.88 CGPA.",
        "Anugerah Pelajar Cemerlang: Maintained top academic distinction across all semesters at KPM Melaka."
      ],
      actions: [
        { label: "View Education Details", tab: "education" },
        { label: "Download Resume", tab: "contact" }
      ]
    },
    {
      keywords: ['maybank', 'merchant', 'cards', 'client management', 'focus point', 'homepro', 'protege'],
      lead: "Afif spent two impactful stints with Malayan Banking Berhad (Maybank):",
      bullets: [
        "Maybank FSTEP Management Trainee (Apr 2024 – Mar 2025): Client Management & Merchant Business, engaging national corporate merchants including Focus Point and HomePro.",
        "Maybank PROTEGE Programme (Nov 2022 – Nov 2023): Regional Merchant Cards operations in Kuantan, Pahang.",
        "Hands-on execution: Merchant recruitment, site visits, terminal onboarding, KYC compliance, and branch coordination."
      ],
      actions: [
        { label: "View Maybank Experience", tab: "experience" },
        { label: "Send Intro on WhatsApp", tab: "contact" }
      ]
    },
    {
      keywords: ['tabung haji', 'intern', 'pahang', 'pilgrimage', 'semi-gov', 'public'],
      lead: "Afif completed a foundational Finance Internship at Lembaga Tabung Haji Negeri Pahang (Oct 2018 – Feb 2019):",
      bullets: [
        "Rotated across departments, including finance and pilgrimage operations, gaining exposure to branch processes and cross-functional collaboration.",
        "Supported the Staff Evaluation Team by collecting data from Lembaga Tabung Haji branches across Pahang and participated in branch meetings and brainstorming sessions.",
      ],
      actions: [
        { label: "View Tabung Haji Record", tab: "experience" }
      ]
    },
    {
      keywords: ['skill', 'skills', 'tools', 'excel', 'powerpoint', 'software', 'language', 'ielts', 'muet', 'english'],
      lead: "Afif's technical toolkit and global communication credentials include:",
      bullets: [
        "Technical Tools: Microsoft Excel (complex models, trackers & dashboards), PowerPoint, Forms, Word, Outlook, Canva, Google Workspace, Bloomberg (Basic).",
        "English: Highly Proficient — IELTS 7.0 & MUET Band 4 (educated in New Zealand).",
        "Malay: Native fluency.",
        "Arabic: Basic knowledge (grounded in Islamic banking jurisprudence)."
      ],
      actions: [
        { label: "Inspect Skills Matrix", tab: "education" },
        { label: "Download Complete CV", tab: "contact" }
      ]
    },
    {
      keywords: ['contact', 'email', 'phone', 'whatsapp', 'location', 'available', 'availability', 'hire', 'recruit', 'salary', 'notice'],
      lead: "Afif is based in Kuala Lumpur, Malaysia, and open to discussions for Banking Programme Operations, Talent Management, and Digital Delivery roles:",
      bullets: [
        "Email: afifazian19@gmail.com",
        "Phone / WhatsApp: +60 11-3617 2324",
        "LinkedIn: linkedin.com/in/afifazian",
        "Location: Kuala Lumpur, Malaysia (open to high-impact opportunities in banking, fintech, and talent operations)."
      ],
      actions: [
        { label: "Open Intro Composer", tab: "contact" },
        { label: "Download Resume (PDF)", tab: "contact" }
      ]
    }
  ];

  function queryAiKnowledgeBase(userText) {
    var query = userText.toLowerCase().trim();

    var bestMatch = null;
    var maxScore = 0;

    for (var i = 0; i < AI_KNOWLEDGE_BASE.length; i++) {
      var entry = AI_KNOWLEDGE_BASE[i];
      var score = 0;
      for (var k = 0; k < entry.keywords.length; k++) {
        var kw = entry.keywords[k];
        if (query.indexOf(kw) !== -1) {
          score += kw.length;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && maxScore > 2) {
      return bestMatch;
    }

    // Default verified executive summary
    return {
      lead: "Here is an executive summary of Muhammad Afif Azian's verified credentials:",
      bullets: [
        "Asian Banking School (ABS): Executive in Digital Banking & Leadership managing FSTEP, FORWARD, and leadership cohort delivery.",
        "Malayan Banking Berhad (Maybank): Management Trainee (Client Management & Focus Point/HomePro) & PROTEGE (Merchant Cards).",
        "4 FSTEP Honours: Best Participant, Best Presenter, Best Group Project (1st Place), and Executive Presence.",
        "FSTEP Batch 26 Graduation Ceremony (2 July 2024): Stage conferral with Bank Negara Malaysia and ABS leadership at Azman Hashim Auditorium.",
        "Education: BCom in Economics & Finance (Lincoln University NZ) + Diploma in Islamic Banking (KPM, 3.88 CGPA).",
        "Digital & AI: Presenter at Pivot 2026 'Build with AI', TravWizz live stage pitch at AICB 500 Global, and TalentCorp MyMahir Analytics."
      ],
      actions: [
        { label: "Explore Overview", tab: "overview" },
        { label: "View Journey & Gallery", tab: "journey" },
        { label: "Contact Afif Directly", tab: "contact" }
      ]
    };
  }

  function initAiAssistant() {
    var chatWindow = document.getElementById('ai-chat-window');
    var inputForm = document.getElementById('ai-input-form');
    var queryInput = document.getElementById('ai-query-input');
    var resetBtn = document.getElementById('ai-reset-btn');
    var chips = document.querySelectorAll('.ai-chip-btn');

    if (!chatWindow || !inputForm || !queryInput) return;

    function appendMessage(sender, htmlContent) {
      var row = document.createElement('div');
      row.className = 'ai-message-row ' + (sender === 'user' ? 'ai-message-user' : 'ai-message-bot');

      var avatar = document.createElement('div');
      avatar.className = 'ai-bubble-avatar';
      avatar.textContent = sender === 'user' ? 'You' : 'AI';

      var content = document.createElement('div');
      content.className = 'ai-bubble-content';
      content.innerHTML = htmlContent;

      var actionLinks = content.querySelectorAll('[data-target-tab]');
      actionLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          var targetTab = link.getAttribute('data-target-tab');
          switchTab(targetTab, true);
          var targetEl = document.getElementById(targetTab);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });

      row.appendChild(avatar);
      row.appendChild(content);
      chatWindow.appendChild(row);

      chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function handleQuestion(userText) {
      if (!userText || !userText.trim()) return;
      var cleanText = userText.trim();

      var userHtml = '<p>' + escapeHtml(cleanText) + '</p>';
      appendMessage('user', userHtml);
      queryInput.value = '';

      var typingRow = document.createElement('div');
      typingRow.className = 'ai-message-row ai-message-bot';
      typingRow.id = 'ai-typing-indicator';
      typingRow.innerHTML = '<div class="ai-bubble-avatar">AI</div><div class="ai-bubble-content"><p><em>Reviewing verified credentials...</em></p></div>';
      chatWindow.appendChild(typingRow);
      chatWindow.scrollTop = chatWindow.scrollHeight;

      setTimeout(function () {
        var indicator = document.getElementById('ai-typing-indicator');
        if (indicator && indicator.parentNode) indicator.parentNode.removeChild(indicator);

        var answer = queryAiKnowledgeBase(cleanText);

        var responseHtml = '<p><strong>' + escapeHtml(answer.lead) + '</strong></p>';
        if (answer.bullets && answer.bullets.length > 0) {
          responseHtml += '<ul class="ai-bubble-bullets">';
          answer.bullets.forEach(function (b) {
            responseHtml += '<li>' + escapeHtml(b) + '</li>';
          });
          responseHtml += '</ul>';
        }

        if (answer.actions && answer.actions.length > 0) {
          responseHtml += '<div class="ai-bubble-actions">';
          answer.actions.forEach(function (act) {
            responseHtml += '<a href="#' + act.tab + '" class="ai-bubble-link" data-target-tab="' + act.tab + '">' + escapeHtml(act.label) + ' &rarr;</a>';
          });
          responseHtml += '</div>';
        }

        appendMessage('bot', responseHtml);
      }, 350);
    }

    function escapeHtml(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    inputForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleQuestion(queryInput.value);
    });

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var query = chip.getAttribute('data-query');
        handleQuestion(query);
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        chatWindow.innerHTML = [
          '<div class="ai-message-row ai-message-bot">',
          '  <div class="ai-bubble-avatar">AI</div>',
          '  <div class="ai-bubble-content">',
          '    <p><strong>Hi! I am Afif\'s AI Career Assistant.</strong></p>',
          '    <p>I have verified knowledge of Afif\'s background across Asian Banking School, Maybank Client Management, Lincoln University (New Zealand), KPM Melaka (3.88 CGPA), and his 4 FSTEP leadership awards.</p>',
          '    <p>Select any suggested prompt above or type your question below!</p>',
          '  </div>',
          '</div>'
        ].join('');
      });
    }
  }

  // ==========================================
  // 6. INTERACTIVE ROLE FIT TOOL
  // ==========================================
  function initRoleFitTool() {
    var buttons = document.querySelectorAll('.role-selector-btn');
    var titleEl = document.getElementById('fit-title');
    var subtitleEl = document.getElementById('fit-subtitle');
    var listEl = document.getElementById('fit-list');
    var awardsEl = document.getElementById('fit-awards');
    var previewEl = document.getElementById('fit-draft-preview');
    var emailBtn = document.getElementById('fit-email-btn');
    var waBtn = document.getElementById('fit-wa-btn');

    function updateRole(roleKey) {
      var data = ROLE_FIT_DATA[roleKey];
      if (!data) return;

      state.activeFitRole = roleKey;

      buttons.forEach(function (b) {
        if (b.getAttribute('data-role') === roleKey) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });

      if (titleEl) titleEl.textContent = data.title;
      if (subtitleEl) subtitleEl.textContent = data.subtitle;

      if (listEl) {
        listEl.innerHTML = '';
        data.points.forEach(function (pt) {
          var li = document.createElement('li');
          li.className = 'fit-item';
          li.textContent = pt;
          listEl.appendChild(li);
        });
      }

      if (awardsEl) awardsEl.textContent = data.awards;
      if (previewEl) previewEl.textContent = data.emailDraft;

      if (emailBtn) {
        var mailtoUrl = 'mailto:afifazian19@gmail.com?subject=' + encodeURIComponent(data.subject) + '&body=' + encodeURIComponent(data.emailDraft);
        emailBtn.setAttribute('href', mailtoUrl);
      }

      if (waBtn) {
        var waMsg = 'Hi Afif, I would like to discuss an opportunity regarding ' + data.title + '.';
        waBtn.setAttribute('href', 'https://wa.me/601136172324?text=' + encodeURIComponent(waMsg));
      }
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var roleKey = btn.getAttribute('data-role');
        updateRole(roleKey);
      });
    });

    updateRole('programme');
  }

  // ==========================================
  // 7. TIMELINE FILTERS
  // ==========================================
  function initTimeline() {
    var filterButtons = document.querySelectorAll('.filter-btn');
    var entries = document.querySelectorAll('.timeline-entry');

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        state.timelineFilter = filter;

        filterButtons.forEach(function (b) {
          b.classList.toggle('active', b === btn);
        });

        entries.forEach(function (entry) {
          var category = entry.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            entry.style.display = 'flex';
          } else {
            entry.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================
  // 8. DIRECT CONTACT & INTRO COMPOSER
  // ==========================================
  function initContactComposer() {
    var roleInput = document.getElementById('composer-role');
    var companyInput = document.getElementById('composer-company');
    var typeInput = document.getElementById('composer-type');
    var notesInput = document.getElementById('composer-notes');
    var sendMailBtn = document.getElementById('composer-mail-btn');
    var sendWaBtn = document.getElementById('composer-wa-btn');

    function updateComposerLinks() {
      var role = (roleInput && roleInput.value) ? roleInput.value.trim() : 'Programme Operations Role';
      var company = (companyInput && companyInput.value) ? companyInput.value.trim() : 'Our Organization';
      var type = (typeInput && typeInput.value) ? typeInput.value : 'Introductory Call';
      var notes = (notesInput && notesInput.value) ? notesInput.value.trim() : 'We would like to discuss your experience at Asian Banking School and Maybank.';

      var subject = 'Opportunity / Intro: ' + role + ' at ' + company;
      var body = 'Hi Afif,\n\nI am contacting you from ' + company + ' regarding a potential opportunity (' + role + ').\n\nDiscussion Type: ' + type + '\n\nNote / Context:\n' + notes + '\n\nPlease let me know your availability for a brief introductory conversation.\n\nBest regards,';

      if (sendMailBtn) {
        sendMailBtn.href = 'mailto:afifazian19@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      }

      if (sendWaBtn) {
        var waText = 'Hi Afif, contacting you from ' + company + ' regarding ' + role + ' (' + type + '). ' + notes;
        sendWaBtn.href = 'https://wa.me/601136172324?text=' + encodeURIComponent(waText);
      }
    }

    [roleInput, companyInput, typeInput, notesInput].forEach(function (input) {
      if (input) {
        input.addEventListener('input', updateComposerLinks);
        input.addEventListener('change', updateComposerLinks);
      }
    });

    updateComposerLinks();
  }

  // ==========================================
  // 9. RESUME PRINT & CLEAN TEXT DOWNLOAD
  // ==========================================
  function initResumeTools() {
    var printBtn = document.getElementById('resume-print-btn');
    var downloadTxtBtn = document.getElementById('resume-txt-btn');

    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }

    if (downloadTxtBtn) {
      downloadTxtBtn.addEventListener('click', function () {
        var textContent = [
          'MUHAMMAD AFIF BIN AZIAN',
          'Programme & Banking Professional | Project Coordination | Stakeholder Management | Data & Reporting',
          '+60 11-3617 2324 | afifazian19@gmail.com | Kuala Lumpur, Malaysia | linkedin.com/in/afifazian',
          '',
          'PROFESSIONAL SUMMARY',
          'Programme and banking professional with experience across Asian Banking School (ABS) and Maybank, spanning programme coordination, financial services operations, stakeholder management, talent development and data-driven reporting. Currently supports the end-to-end delivery of banking talent and leadership programmes, with hands-on responsibility for programme administration, trainer and participant coordination, evaluations, finance tracking, candidate management and operational reporting. Bachelor of Commerce graduate in Economics and Finance, recognised with four FSTEP awards and currently strengthening data analytics capabilities through the TalentCorp-sponsored MyMahir programme.',
          '',
          'CORE COMPETENCIES',
          'Programme & Project Coordination | Stakeholder Management | Banking & Financial Services | Learning & Talent Development | Data Analysis & Reporting | Microsoft Excel & PowerPoint | Survey & Evaluation Management | Candidate & CV Management | Finance & Administration Tracking | Process Improvement | On-site Programme Delivery',
          '',
          'PROFESSIONAL EXPERIENCE',
          'Asian Banking School (ABS) | Kuala Lumpur, Malaysia',
          'Executive, Digital Banking & Leadership | Mar 2026 - Present',
          '- Coordinate programme administration and delivery across FSTEP, FORWARD and leadership development programmes, supporting schedules, materials, participant communications, attendance, surveys, evaluations and post-programme follow-up.',
          '- Liaise with internal teams, external trainers and facilitators, participants, financial institutions and employers to coordinate programme requirements, documentation and time-sensitive deliverables.',
          '- Maintain operational and finance trackers, monitor outstanding actions, compile evaluation results and prepare structured Excel-based reports and dashboards to support programme monitoring and decision-making.',
          '- Support FORWARD candidate management activities, including CV consolidation, submission tracking, employer coordination, candidate-to-employer matching and follow-up.',
          '- Coordinate assessment and feedback processes, including Microsoft Forms surveys, pre- and post-tests, QR evaluations and evaluation compilation for trainers and programme teams.',
          '- Provide on-site and class delivery support, including trainer assistance, participant and logistics coordination, programme photo/video documentation, FSTEP project deliverables and ad hoc operational requirements.',
          '',
          'Malayan Banking Berhad (Maybank) | Kuala Lumpur, Malaysia',
          'FSTEP Management Trainee | Apr 2024 - Mar 2025',
          '- Selected to represent Maybank in the Financial Sector Talent Enrichment Programme (FSTEP), combining project-based development with on-the-job exposure in Client Management and Merchant Business.',
          '- Supported client and merchant management activities, including engagement with corporate merchants such as Focus Point and HomePro, while strengthening knowledge of banking operations, customer engagement and compliance.',
          '- Led a team that received the Best Group Project award and was individually recognised with Future Ready, Communication with Impact and Executive Presence awards.',
          '- Invited to speak during the programme graduation ceremony, reflecting strong presentation and communication capabilities.',
          '',
          'Malayan Banking Berhad (Maybank) | Kuantan, Pahang, Malaysia',
          'PROTEGE Programme | Nov 2022 - Nov 2023',
          '- Gained hands-on exposure to Regional Merchant Cards operations, including merchant recruitment, site visits, document collection, application processing and card-terminal onboarding.',
          '- Coordinated with merchants and internal stakeholders throughout the application process while developing practical knowledge of banking operations, compliance, stakeholder management and teamwork.',
          '',
          'Lembaga Tabung Haji Negeri Pahang | Kuantan, Pahang, Malaysia',
          'Finance Intern | Oct 2018 - Feb 2019',
          '- Rotated across departments, including finance and pilgrimage operations, gaining exposure to branch processes and cross-functional collaboration.',
          '- Supported the Staff Evaluation Team by collecting data from Lembaga Tabung Haji branches across Pahang and participated in branch meetings and brainstorming sessions.',
          '',
          'EDUCATION',
          'Bachelor of Commerce (Economics and Finance) | Lincoln University, New Zealand | Jul 2019 - May 2021',
          'Diploma of Islamic Banking and Finance | Kolej Profesional MARA Bandar Melaka | Jul 2016 - Feb 2019 | CGPA: 3.88',
          '',
          'PROFESSIONAL DEVELOPMENT & SELECTED ACHIEVEMENTS',
          '- MyMahir Data Analytics Programme - TalentCorp-sponsored | 2026',
          '- FSTEP Awards - Future Ready, Communication with Impact, Executive Presence and Best Group Project | 2024',
          '- GRADUAN Ambassador - Represented Malaysian students at Lincoln University, New Zealand | 2020',
          '- Anugerah Pelajar Cemerlang (All Semesters) - Kolej Profesional MARA Bandar Melaka | 2019',
          '',
          'TECHNICAL SKILLS & LANGUAGES',
          'Technical: Microsoft Excel, PowerPoint, Word, Microsoft Forms, Outlook, Google Workspace, Canva, Bloomberg (Basic)',
          'Languages: Malay (Native) | English (Highly Proficient; IELTS 7.0, MUET Band 4) | Arabic (Basic)',
          '',
          'REFERENCES: References available upon request.'
        ].join('\n');

        var blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'Muhammad-Afif-Azian-Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    }
  }

  // Initialize all components on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initTabs();
    initCarousel();
    initGallery();
    initAiAssistant();
    initRoleFitTool();
    initTimeline();
    initContactComposer();
    initResumeTools();
    initCredentialsDrawer();
  });

  // 3D Career Globe is mounted and rendered via globe.js

  // ==========================================
  // 11. INTERACTIVE CREDENTIALS VERIFICATION DRAWER
  // ==========================================
  function openCredentialsDrawer() {
    var drawer = document.getElementById('credentials-drawer');
    if (!drawer) return;
    drawer.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    var closeBtn = document.getElementById('drawer-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeCredentialsDrawer() {
    var drawer = document.getElementById('credentials-drawer');
    if (!drawer) return;
    drawer.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  function initCredentialsDrawer() {
    var drawer = document.getElementById('credentials-drawer');
    var panelContent = document.getElementById('drawer-panel-content');
    var headerOpenBtn = document.getElementById('open-credentials-btn');
    var heroOpenBtn = document.getElementById('hero-verify-btn');
    var fasttrackOpenBtn = document.getElementById('fasttrack-verify-btn');

    if (!drawer || !panelContent) return;

    window.openAfifCredentials = openCredentialsDrawer;

    // Populate drawer content
    panelContent.innerHTML = [
      '<div class="drawer-header">',
      '  <div class="drawer-title-group">',
      '    <h3 id="drawer-heading">Verified Credentials &amp; Records</h3>',
      '    <p>Muhammad Afif Bin Azian &middot; Official Institutional File</p>',
      '  </div>',
      '  <button type="button" class="drawer-close-btn" id="drawer-close-btn" aria-label="Close credentials verification drawer">✕</button>',
      '</div>',
      '<div class="drawer-body">',
      '  <article class="credential-card">',
      '    <div class="credential-badge-row">',
      '      <div class="credential-header-with-logo">',
      '        <div class="credential-logo-box"><img src="assets/badge-lincoln.svg" alt="Lincoln University" class="role-logo-img" width="38" height="38"></div>',
      '        <span class="credential-institution">Lincoln University, New Zealand</span>',
      '      </div>',
      '      <span class="credential-badge-verified">✓ Verified Degree</span>',
      '    </div>',
      '    <h4 class="credential-name">Bachelor of Commerce (Economics &amp; Finance)</h4>',
      '    <p class="credential-details">Jul 2019 – May 2021 &middot; Canterbury, New Zealand</p>',
      '    <ul class="credential-records-list">',
      '      <li>Dual major in Economics and Finance with quantitative analytical emphasis.</li>',
      '      <li>Appointed official GRADUAN Ambassador representing Malaysian scholars abroad (2020).</li>',
      '      <li>International coursework: macroeconomic analysis, capital markets &amp; business forecasting.</li>',
      '    </ul>',
      '  </article>',
      '  <article class="credential-card">',
      '    <div class="credential-badge-row">',
      '      <div class="credential-header-with-logo">',
      '        <div class="credential-logo-box"><img src="assets/badge-kpm.svg" alt="Kolej Profesional MARA" class="role-logo-img" width="38" height="38"></div>',
      '        <span class="credential-institution">Kolej Profesional MARA Bandar Melaka</span>',
      '      </div>',
      '      <span class="credential-badge-verified">✓ CGPA 3.88 Verified</span>',
      '    </div>',
      '    <h4 class="credential-name">Diploma of Islamic Banking and Finance</h4>',
      '    <p class="credential-details">Jul 2016 – Feb 2019 &middot; Melaka, Malaysia</p>',
      '    <ul class="credential-records-list">',
      '      <li>Cumulative Grade Point Average (CGPA): 3.88 (First Class Honours equivalent).</li>',
      '      <li>Conferred Anugerah Pelajar Cemerlang across all academic semesters.</li>',
      '      <li>Islamic financial jurisprudence, financial mathematics, and banking compliance.</li>',
      '    </ul>',
      '  </article>',
      '  <article class="credential-card">',
      '    <div class="credential-badge-row">',
      '      <div class="credential-header-with-logo">',
      '        <div class="credential-logo-box"><img src="assets/badge-abs.svg" alt="Asian Banking School" class="role-logo-img" width="38" height="38"></div>',
      '        <span class="credential-institution">Bank Negara Malaysia &amp; Asian Banking School</span>',
      '      </div>',
      '      <span class="credential-badge-verified">✓ Quadruple Honours</span>',
      '    </div>',
      '    <h4 class="credential-name">FSTEP Batch 26 Valedictorian &amp; Best Participant</h4>',
      '    <p class="credential-details">Conferred: 2 July 2024 &middot; Azman Hashim Auditorium, Level G, Bangunan AICB</p>',
      '    <ul class="credential-records-list">',
      '      <li>Conferred Best Participant Award across all participating banking divisions nationwide.</li>',
      '      <li>Best Presenter &middot; Communication with Impact &middot; Executive Presence.</li>',
      '      <li>Led 1st Place Best Group Project team across commercial banking streams.</li>',
      '      <li>Delivered official Valedictorian keynote address "Rising Together".</li>',
      '    </ul>',
      '  </article>',
      '  <article class="credential-card">',
      '    <div class="credential-badge-row">',
      '      <span class="credential-institution">TalentCorp Sponsored Development</span>',
      '      <span class="credential-badge-verified">✓ Active Cohort</span>',
      '    </div>',
      '    <h4 class="credential-name">MyMahir Data Analytics Programme</h4>',
      '    <p class="credential-details">2026 &middot; Four-Month Advanced Analytics Development</p>',
      '    <ul class="credential-records-list">',
      '      <li>Focused on data analytics, quantitative reporting models, and predictive dashboards.</li>',
      '    </ul>',
      '  </article>',
      '  <article class="credential-card">',
      '    <div class="credential-badge-row">',
      '      <div class="credential-header-with-logo">',
      '        <div class="credential-logo-box"><img src="assets/badge-maybank.svg" alt="Maybank" class="role-logo-img" width="38" height="38"></div>',
      '        <span class="credential-institution">Malayan Banking Berhad (Maybank)</span>',
      '      </div>',
      '      <span class="credential-badge-verified">✓ Verified Experience</span>',
      '    </div>',
      '    <h4 class="credential-name">Management Trainee &amp; Regional Merchant Cards</h4>',
      '    <p class="credential-details">Nov 2022 – Mar 2025 &middot; Menara Maybank HQ &amp; Kuantan</p>',
      '    <ul class="credential-records-list">',
      '      <li>Client Management &amp; Merchant Business (Focus Point, HomePro corporate accounts).</li>',
      '      <li>Regional Merchant Cards onboarding: terminal setups, site audits, and compliance.</li>',
      '      <li>Selected to represent Maybank in FSTEP, earning 4 excellence honours.</li>',
      '    </ul>',
      '  </article>',
      '  <div class="drawer-verification-note">',
      '    <strong>Notice for Corporate Recruiters:</strong> Official academic transcripts, diploma certificates, and verifiable employment references from Asian Banking School and Maybank are available immediately upon recruiter reachout.',
      '  </div>',
      '  <div class="drawer-actions">',
      '    <a href="mailto:afifazian19@gmail.com?subject=Verification%20Inquiry%3A%20Muhammad%20Afif%20Azian" class="btn-primary" style="text-align:center;">',
      '      Email for Direct Verification',
      '    </a>',
      '    <a href="https://wa.me/601136172324?text=Hi%20Afif%2C%20reaching%20out%20to%20verify%20credentials%20for%20an%20executive%20role." class="btn-secondary" style="text-align:center;">',
      '      WhatsApp Verification Inquiry',
      '    </a>',
      '  </div>',
      '</div>'
    ].join('\n');

    var closeBtn = document.getElementById('drawer-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeCredentialsDrawer);

    if (headerOpenBtn) headerOpenBtn.addEventListener('click', openCredentialsDrawer);
    if (heroOpenBtn) heroOpenBtn.addEventListener('click', openCredentialsDrawer);
    if (fasttrackOpenBtn) fasttrackOpenBtn.addEventListener('click', openCredentialsDrawer);

    // Backdrop click
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer) {
        closeCredentialsDrawer();
      }
    });

    // Escape key
    window.addEventListener('keydown', function (e) {
      if (!drawer.hasAttribute('hidden') && e.key === 'Escape') {
        e.preventDefault();
        closeCredentialsDrawer();
      }
    });
  }
})();
