/* Meet Afif (Muhammad Afif Azian) - Interactive 3D Career Globe Engine */

(function () {
  'use strict';

  var globeState = {
    radius: 190,
    yaw: (172.48 * Math.PI) / 180,
    pitch: (-43.64 * Math.PI) / 180,
    targetYaw: null,
    targetPitch: null,
    spinning: true,
    activeStop: 0
  };

  var GLOBE_STOPS = [
    {
      index: 1,
      title: 'Lincoln & Canterbury, New Zealand',
      dates: '2018–2020',
      role: 'International Scholar & GRADUAN Ambassador',
      institution: 'Lincoln University (Faculty of Agribusiness & Commerce)',
      coords: '43.64° S, 172.48° E · Canterbury, New Zealand',
      lat: -43.64,
      lon: 172.48,
      summary: 'BCom in Economics & Finance. Deep international academic grounding, cross-cultural adaptability, global perspective, and macroeconomic policy analysis.',
      highlights: [
        'Dual major in Economics and Finance at Lincoln University (Canterbury, New Zealand).',
        'Appointed official GRADUAN Ambassador representing Malaysian scholars across New Zealand.',
        'Built cross-cultural leadership, independent global perspective, and quantitative analytical skills.'
      ],
      chapterId: 'chapter-1'
    },
    {
      index: 2,
      title: 'Maybank Kuantan Main (Regional Office, Pahang)',
      dates: '2022–2023',
      role: 'PROTEGE Trainee · Regional Merchant Cards',
      institution: 'Maybank Kuantan Main (Regional Office - Pahang/Kelantan/Terengganu)',
      coords: '3.81° N, 103.32° E · Kuantan, Pahang, Malaysia',
      lat: 3.81,
      lon: 103.32,
      summary: 'Frontline banking operations, regional merchant operations, documentation hygiene, compliance checks, and terminal onboarding across east-coast commercial businesses.',
      highlights: [
        'Direct merchant recruitment, site assessments, and POS terminal activations for regional retail accounts.',
        'Deep grounding in banking regulations, central bank compliance hygiene, and merchant KYC documentation.',
        'Cross-functional branch coordination between branch managers, business merchants, and regional operations.'
      ],
      chapterId: 'chapter-2'
    },
    {
      index: 3,
      title: 'Menara Maybank HQ, Kuala Lumpur',
      dates: '2023–2025',
      role: 'FSTEP Trainee · Client Management & Merchant Business',
      institution: 'Maybank Group Headquarters (Menara Maybank, Kuala Lumpur)',
      coords: '3.15° N, 101.70° E · Menara Maybank, Kuala Lumpur',
      lat: 3.147,
      lon: 101.699,
      summary: 'Group talent matching, merchant operations, corporate client management (Focus Point, HomePro), and banking project delivery at Malayan Banking Berhad headquarters.',
      highlights: [
        'Selected by Maybank as management trainee representative in the prestigious FSTEP talent programme.',
        'Corporate merchant engagement managing national accounts including Focus Point and HomePro.',
        'Cross-functional alignment with group risk, merchant cards operations, and compliance departments.'
      ],
      chapterId: 'chapter-2'
    },
    {
      index: 4,
      title: 'AICB Centre of Excellence / Asian Banking School',
      dates: '2024–Present',
      role: 'Executive, Digital Banking & Leadership · FSTEP Valedictorian',
      institution: 'Asian Banking School (ABS) & FSTEP (Level G, Bangunan AICB)',
      coords: '3.16° N, 101.69° E · Bangunan AICB, Kuala Lumpur',
      lat: 3.155,
      lon: 101.692,
      summary: 'Nationwide banking accreditations, Bank Negara Malaysia talent initiatives, FinTech AI delivery, valedictorian keynote address, and quadruple FSTEP honours.',
      highlights: [
        'Executive in Digital Banking & Leadership driving end-to-end cohort operations across FSTEP and FORWARD.',
        'Conferred 4 premier FSTEP honours: Best Participant, Best Presenter, Best Group Project (1st Place), and Executive Presence.',
        'Official cohort Valedictorian delivering the keynote "Rising Together" at Azman Hashim Auditorium.',
        'Pitched signature travel-tech platform TravWizz live on stage before 500 Global mentors and central bank leadership.'
      ],
      chapterId: 'chapter-4'
    }
  ];

  // Continent Polygons [lat, lon]
  var CONTINENTS = [
    // New Zealand (South & North Islands)
    [[-41, 172.5], [-42.5, 171.5], [-44, 169], [-46.5, 166.5], [-46.8, 168.5], [-45.5, 170.5], [-43.8, 173], [-41.8, 174.2], [-41, 172.5]],
    [[-34.5, 172.7], [-35.5, 174.5], [-37.5, 178], [-39.5, 177], [-41.5, 175], [-41.2, 174.7], [-39, 174], [-38, 174.8], [-36.5, 174.2], [-34.5, 172.7]],
    // Australia
    [[-12, 131], [-11, 142], [-15, 145], [-23, 151], [-28, 153], [-37, 150], [-39, 146], [-38, 140], [-35, 136], [-32, 132], [-34, 122], [-34, 115], [-22, 114], [-16, 123], [-14, 129], [-12, 131]],
    // Malay Peninsula (Malaysia)
    [[14, 100], [10, 99], [7, 100], [4, 101], [1.3, 103.8], [2.5, 104.2], [4.5, 103.5], [6.2, 102.1], [8.5, 100], [14, 100]],
    // Borneo & Sumatra & Java
    [[7, 117], [5, 119], [1.5, 118], [-1, 117], [-3.5, 116], [-4, 114.5], [-3, 111], [1, 109.5], [2, 110], [4.5, 114], [7, 117]],
    [[5.5, 95.5], [3, 98.5], [0, 102], [-3, 104.5], [-5.8, 106], [-4.5, 103], [-1.5, 100.5], [2, 97], [5.5, 95.5]],
    [[-6, 106], [-6.8, 108.5], [-7.5, 111], [-8.5, 114], [-8, 113], [-7.5, 109], [-6.5, 106], [-6, 106]],
    // East Asia & Eurasia
    [[70, 30], [70, 170], [60, 160], [45, 140], [35, 120], [22, 114], [10, 105], [10, 75], [25, 60], [40, 50], [55, 30], [70, 30]],
    // Africa
    [[35, 10], [30, 32], [12, 43], [-10, 40], [-34, 18], [-18, 12], [5, 0], [15, -17], [35, -5], [35, 10]],
    // Europe
    [[55, -5], [60, 10], [70, 25], [60, 30], [45, 35], [36, -5], [44, -1], [55, -5]],
    // Americas (North & South)
    [[70, -160], [60, -65], [45, -60], [25, -80], [18, -105], [55, -130], [70, -160]],
    [[10, -75], [-5, -35], [-35, -55], [-55, -68], [-20, -70], [0, -80], [10, -75]]
  ];

  function drawRoundRect(c, x, y, w, h, r) {
    if (typeof c.roundRect === 'function') {
      c.roundRect(x, y, w, h, r);
    } else {
      c.moveTo(x + r, y);
      c.lineTo(x + w - r, y);
      c.arcTo(x + w, y, x + w, y + r, r);
      c.lineTo(x + w, y + h - r);
      c.arcTo(x + w, y + h, x + w - r, y + h, r);
      c.lineTo(x + r, y + h);
      c.arcTo(x, y + h, x, y + h - r, r);
      c.lineTo(x, y + r);
      c.arcTo(x, y, x + r, y, r);
      c.closePath();
    }
  }

  function projectCoord(lat, lon, R, yaw, pitch) {
    var phi = (lat * Math.PI) / 180;
    var lam = (lon * Math.PI) / 180;
    var dLam = lam - yaw;

    var x = R * Math.cos(phi) * Math.sin(dLam);
    var y = R * (Math.cos(pitch) * Math.sin(phi) - Math.sin(pitch) * Math.cos(phi) * Math.cos(dLam));
    var z = R * (Math.sin(pitch) * Math.sin(phi) + Math.cos(pitch) * Math.cos(phi) * Math.cos(dLam));

    return { x: x, y: y, z: z };
  }

  function initCareerGlobe() {
    var canvas = document.getElementById('career-globe-canvas');
    var wrapper = document.getElementById('globe-canvas-wrapper');
    var pillsRow = document.getElementById('globe-pills-row');
    var spinBtn = document.getElementById('globe-spin-btn');
    var spinText = document.getElementById('globe-spin-text');
    var zoomInBtn = document.getElementById('globe-zoom-in');
    var zoomOutBtn = document.getElementById('globe-zoom-out');
    var resetBtn = document.getElementById('globe-reset-btn');

    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var canvasBaseWidth = 500;
    var canvasBaseHeight = 500;

    function resizeCanvas() {
      var rect = wrapper ? wrapper.getBoundingClientRect() : canvas.getBoundingClientRect();
      var w = rect.width;
      var h = rect.height;

      if (!w || !h || w < 50 || h < 50) {
        w = 500;
        h = 500;
      }

      var dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      canvasBaseWidth = w;
      canvasBaseHeight = h;
      globeState.radius = Math.min(w, h) * 0.38;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.onJourneyTabActive = resizeCanvas;

    // Render Milestone Selector Pills
    if (pillsRow) {
      pillsRow.innerHTML = '';
      GLOBE_STOPS.forEach(function (stop, idx) {
        var pillBtn = document.createElement('button');
        pillBtn.type = 'button';
        pillBtn.className = 'globe-stop-btn' + (idx === globeState.activeStop ? ' active' : '');
        pillBtn.setAttribute('data-stop-index', idx);
        pillBtn.setAttribute('aria-label', 'Stop ' + stop.index + ': ' + stop.title);

        var badge = document.createElement('span');
        badge.className = 'globe-stop-badge';
        badge.textContent = 'STOP 0' + stop.index;

        var titleSpan = document.createElement('span');
        titleSpan.className = 'globe-stop-title';
        titleSpan.textContent = stop.title.split(' (')[0].split(',')[0];

        var yearSpan = document.createElement('span');
        yearSpan.className = 'globe-stop-year';
        yearSpan.textContent = stop.dates;

        pillBtn.appendChild(badge);
        pillBtn.appendChild(titleSpan);
        pillBtn.appendChild(yearSpan);

        pillBtn.addEventListener('click', function () {
          selectGlobeStop(idx, true);
        });

        pillsRow.appendChild(pillBtn);
      });
    }

    var pulseTime = 0;

    function renderGlobe() {
      if (wrapper && canvasBaseWidth !== wrapper.clientWidth && wrapper.clientWidth > 50) {
        resizeCanvas();
      }

      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var cx = canvasBaseWidth / 2;
      var cy = canvasBaseHeight / 2;
      var R = globeState.radius;

      // Smooth flying interpolation
      if (globeState.targetYaw !== null && globeState.targetPitch !== null) {
        var dy = ((globeState.targetYaw - globeState.yaw) % (Math.PI * 2));
        if (dy > Math.PI) dy -= Math.PI * 2;
        if (dy < -Math.PI) dy += Math.PI * 2;

        var dp = globeState.targetPitch - globeState.pitch;
        globeState.yaw += dy * 0.12;
        globeState.pitch += dp * 0.12;

        if (Math.abs(dy) < 0.003 && Math.abs(dp) < 0.003) {
          globeState.yaw = globeState.targetYaw;
          globeState.pitch = globeState.targetPitch;
          globeState.targetYaw = null;
          globeState.targetPitch = null;
        }
      } else if (globeState.spinning) {
        globeState.yaw += 0.0035;
      }

      pulseTime += 0.045;

      ctx.clearRect(0, 0, canvasBaseWidth, canvasBaseHeight);

      var oceanBg = isDark ? '#0b162c' : '#f1f5f9';
      var oceanGlow = isDark ? '#1a2e54' : '#e2e8f0';
      var landColor = isDark ? '#1f355c' : '#cbd5e1';
      var landBorder = isDark ? '#2e4c7d' : '#94a3b8';
      var graticuleColor = isDark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(71, 85, 105, 0.12)';
      var arcColor = isDark ? '#f59e0b' : '#b58110';
      var pinActive = isDark ? '#d99b26' : '#966708';
      var pinDefault = isDark ? '#818cf8' : '#4338ca';

      // 1. Globe Sphere Body & Ambient Atmosphere
      var grad = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.35, R * 0.08, cx, cy, R);
      grad.addColorStop(0, oceanGlow);
      grad.addColorStop(0.82, oceanBg);
      grad.addColorStop(1, isDark ? '#070d1a' : '#cbd5e1');

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.lineWidth = 2;
      ctx.strokeStyle = isDark ? '#2e4c7d' : '#94a3b8';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, R + 3, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(217, 155, 38, 0.12)' : 'rgba(181, 129, 16, 0.1)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 2. Graticules
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = graticuleColor;

      [-60, -30, 0, 30, 60].forEach(function (lat) {
        ctx.beginPath();
        var started = false;
        for (var deg = 0; deg <= 360; deg += 6) {
          var p = projectCoord(lat, deg, R, globeState.yaw, globeState.pitch);
          if (p.z > 0) {
            if (!started) {
              ctx.moveTo(cx + p.x, cy - p.y);
              started = true;
            } else {
              ctx.lineTo(cx + p.x, cy - p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      });

      for (var m = 0; m < 360; m += 45) {
        ctx.beginPath();
        var startedM = false;
        for (var latM = -80; latM <= 80; latM += 5) {
          var pm = projectCoord(latM, m, R, globeState.yaw, globeState.pitch);
          if (pm.z > 0) {
            if (!startedM) {
              ctx.moveTo(cx + pm.x, cy - pm.y);
              startedM = true;
            } else {
              ctx.lineTo(cx + pm.x, cy - pm.y);
            }
          } else {
            startedM = false;
          }
        }
        ctx.stroke();
      }

      // 3. Continents Landmass Polygons
      ctx.fillStyle = landColor;
      ctx.strokeStyle = landBorder;
      ctx.lineWidth = 1;

      CONTINENTS.forEach(function (poly) {
        ctx.beginPath();
        var visibleCount = 0;
        var first = true;
        poly.forEach(function (pt) {
          var p = projectCoord(pt[0], pt[1], R, globeState.yaw, globeState.pitch);
          if (p.z > -15) {
            visibleCount++;
            if (first) {
              ctx.moveTo(cx + p.x, cy - p.y);
              first = false;
            } else {
              ctx.lineTo(cx + p.x, cy - p.y);
            }
          }
        });
        if (visibleCount > 2) {
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      });

      // 4. Glowing Arcs (1 -> 2 -> 3 -> 4)
      for (var a = 0; a < GLOBE_STOPS.length - 1; a++) {
        var s1 = GLOBE_STOPS[a];
        var s2 = GLOBE_STOPS[a + 1];

        ctx.beginPath();
        var steps = 36;
        var arcVisible = false;

        for (var s = 0; s <= steps; s++) {
          var t = s / steps;
          var curLat = s1.lat + (s2.lat - s1.lat) * t;
          var curLon = s1.lon + (s2.lon - s1.lon) * t;
          var elevation = Math.sin(t * Math.PI) * (R * 0.16);
          var pArc = projectCoord(curLat, curLon, R + elevation, globeState.yaw, globeState.pitch);

          if (pArc.z > -10) {
            arcVisible = true;
            if (s === 0) {
              ctx.moveTo(cx + pArc.x, cy - pArc.y);
            } else {
              ctx.lineTo(cx + pArc.x, cy - pArc.y);
            }
          }
        }

        if (arcVisible) {
          ctx.save();
          ctx.strokeStyle = arcColor;
          ctx.lineWidth = 2.4;
          ctx.setLineDash([5, 4]);
          ctx.stroke();

          // Animated energy pulse along arc
          var pulseT = ((pulseTime * 0.4 + a * 0.25) % 1.0);
          var pLat = s1.lat + (s2.lat - s1.lat) * pulseT;
          var pLon = s1.lon + (s2.lon - s1.lon) * pulseT;
          var pElev = Math.sin(pulseT * Math.PI) * (R * 0.16);
          var pulsePoint = projectCoord(pLat, pLon, R + pElev, globeState.yaw, globeState.pitch);

          if (pulsePoint.z > 0) {
            ctx.beginPath();
            ctx.arc(cx + pulsePoint.x, cy - pulsePoint.y, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
          }
          ctx.restore();
        }
      }

      // 5. Milestone Stop Markers & Pulsing Halos
      GLOBE_STOPS.forEach(function (stop, idx) {
        var p = projectCoord(stop.lat, stop.lon, R, globeState.yaw, globeState.pitch);
        var isFront = p.z > 0;
        var isActive = idx === globeState.activeStop;
        var sx = cx + p.x;
        var sy = cy - p.y;

        ctx.save();
        if (isFront) {
          if (isActive) {
            var pulseRadius = 11 + Math.sin(pulseTime * 2) * 5;
            ctx.beginPath();
            ctx.arc(sx, sy, pulseRadius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? 'rgba(217, 155, 38, 0.3)' : 'rgba(181, 129, 16, 0.25)';
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(sx, sy, isActive ? 8 : 6, 0, Math.PI * 2);
          ctx.fillStyle = isActive ? pinActive : pinDefault;
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          ctx.font = 'bold 9px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(stop.index, sx, sy);

          // Stop name label chip
          var labelText = '0' + stop.index + ': ' + stop.title.split(' (')[0].split(',')[0];
          ctx.font = (isActive ? 'bold ' : '600 ') + '10px sans-serif';
          var textMetrics = ctx.measureText(labelText);
          var tagWidth = textMetrics.width + 12;
          var tagX = sx + 12;
          var tagY = sy - 10;

          if (idx === 3) {
            tagY -= 14;
          }

          ctx.fillStyle = isDark ? 'rgba(17, 29, 51, 0.88)' : 'rgba(255, 255, 255, 0.9)';
          ctx.strokeStyle = isActive ? (isDark ? '#d99b26' : '#b58110') : (isDark ? '#2e4c7d' : '#cbd5e1');
          ctx.lineWidth = 1;
          ctx.beginPath();
          drawRoundRect(ctx, tagX, tagY - 8, tagWidth, 18, 4);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = isActive ? (isDark ? '#d99b26' : '#b58110') : (isDark ? '#f8fafc' : '#0f172a');
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(labelText, tagX + 6, tagY + 1);
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, 3, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.25)' : 'rgba(71, 85, 105, 0.2)';
          ctx.fill();
        }
        ctx.restore();
      });

      requestAnimationFrame(renderGlobe);
    }

    function selectGlobeStop(stopIdx, userInitiated) {
      globeState.activeStop = stopIdx;
      var stop = GLOBE_STOPS[stopIdx];
      if (!stop) return;

      globeState.targetYaw = (stop.lon * Math.PI) / 180;
      globeState.targetPitch = (stop.lat * Math.PI) / 180;

      if (userInitiated) {
        globeState.spinning = false;
        if (spinText) spinText.textContent = '▶ Auto-Spin';
      }

      var pills = document.querySelectorAll('.globe-stop-btn');
      pills.forEach(function (pill, i) {
        pill.classList.toggle('active', i === stopIdx);
      });

      var badgeEl = document.getElementById('focus-step-badge');
      var datesEl = document.getElementById('focus-dates');
      var titleEl = document.getElementById('focus-title');
      var roleEl = document.getElementById('focus-role');
      var instEl = document.getElementById('focus-institution');
      var coordsEl = document.getElementById('focus-coords');
      var bodyEl = document.getElementById('focus-body');
      var highlightsEl = document.getElementById('focus-highlights');
      var actionsEl = document.getElementById('focus-card-actions');

      if (badgeEl) badgeEl.textContent = 'Stop 0' + stop.index + ' of 04';
      if (datesEl) datesEl.textContent = stop.dates;
      if (titleEl) titleEl.textContent = stop.title;
      if (roleEl) roleEl.textContent = stop.role;
      if (instEl) instEl.textContent = stop.institution;
      if (coordsEl) coordsEl.textContent = '📍 ' + stop.coords;
      if (bodyEl) bodyEl.textContent = stop.summary;

      if (highlightsEl) {
        highlightsEl.innerHTML = '';
        stop.highlights.forEach(function (hl) {
          var li = document.createElement('li');
          li.textContent = hl;
          highlightsEl.appendChild(li);
        });
      }

      if (actionsEl) {
        actionsEl.innerHTML = [
          '<button type="button" class="btn-primary" id="globe-card-verify-btn" aria-haspopup="dialog" aria-controls="credentials-drawer" style="padding:var(--space-2) var(--space-4);font-size:var(--font-size-xs);">Verify Credentials</button>',
          '<a href="#' + (stop.chapterId || 'chapter-1') + '" class="btn-secondary" style="padding:var(--space-2) var(--space-4);font-size:var(--font-size-xs);">Read Journey Chapter &darr;</a>',
          '<a href="#gallery-interactive-showcase" class="btn-secondary" style="padding:var(--space-2) var(--space-4);font-size:var(--font-size-xs);">Explore Stage Photos &darr;</a>'
        ].join('');

        var cardVerifyBtn = document.getElementById('globe-card-verify-btn');
        if (cardVerifyBtn) {
          cardVerifyBtn.addEventListener('click', function () {
            if (typeof window.openAfifCredentials === 'function') {
              window.openAfifCredentials();
            } else {
              var drawer = document.getElementById('credentials-drawer');
              if (drawer) {
                drawer.removeAttribute('hidden');
                document.body.style.overflow = 'hidden';
              }
            }
          });
        }
      }
    }

    var isDragging = false;
    var prevMouseX = 0;
    var prevMouseY = 0;

    function onPointerDown(e) {
      isDragging = true;
      globeState.spinning = false;
      if (spinText) spinText.textContent = '▶ Auto-Spin';
      globeState.targetYaw = null;
      globeState.targetPitch = null;
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      var curX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      var curY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      var dx = curX - prevMouseX;
      var dy = curY - prevMouseY;

      globeState.yaw -= dx * 0.008;
      globeState.pitch += dy * 0.008;
      globeState.pitch = Math.max(-1.25, Math.min(1.25, globeState.pitch));

      prevMouseX = curX;
      prevMouseY = curY;
    }

    function onPointerUp() {
      if (isDragging) {
        isDragging = false;
      }
    }

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    canvas.addEventListener('click', function (e) {
      var bounds = canvas.getBoundingClientRect();
      var clickX = e.clientX - bounds.left;
      var clickY = e.clientY - bounds.top;
      var cx = canvasBaseWidth / 2;
      var cy = canvasBaseHeight / 2;
      var R = globeState.radius;

      for (var i = 0; i < GLOBE_STOPS.length; i++) {
        var stop = GLOBE_STOPS[i];
        var p = projectCoord(stop.lat, stop.lon, R, globeState.yaw, globeState.pitch);
        if (p.z > 0) {
          var sx = cx + p.x;
          var sy = cy - p.y;
          var dist = Math.hypot(clickX - sx, clickY - sy);
          if (dist < 28) {
            selectGlobeStop(i, true);
            return;
          }
        }
      }
    });

    if (spinBtn) {
      spinBtn.addEventListener('click', function () {
        globeState.spinning = !globeState.spinning;
        if (spinText) {
          spinText.textContent = globeState.spinning ? '⏸ Pause' : '▶ Auto-Spin';
        }
      });
    }

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', function () {
        globeState.radius = Math.min(canvasBaseWidth * 0.48, globeState.radius + 22);
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', function () {
        globeState.radius = Math.max(canvasBaseWidth * 0.24, globeState.radius - 22);
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        selectGlobeStop(0, true);
        globeState.radius = Math.min(canvasBaseWidth, canvasBaseHeight) * 0.38;
        globeState.spinning = true;
        if (spinText) spinText.textContent = '⏸ Pause';
      });
    }

    selectGlobeStop(0, false);
    renderGlobe();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCareerGlobe);
  } else {
    initCareerGlobe();
  }
})();
