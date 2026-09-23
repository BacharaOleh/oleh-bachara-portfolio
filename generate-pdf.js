const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const fontsDir = path.join(__dirname, 'public', 'fonts');
const regularFont = path.join(fontsDir, 'Roboto-Regular.ttf');
const boldFont    = path.join(fontsDir, 'Roboto-Bold.ttf');
const mediumFont  = path.join(fontsDir, 'Roboto-Medium.ttf');
const italicFont  = path.join(fontsDir, 'Roboto-Italic.ttf');

const PALETTE = {
  gold:      '#b38b36',
  goldLight: '#d4af5c',
  darkBg:    '#0d0c0b',
  cardBg:    '#161513',
  lineDark:  '#2a2723',
  textTitle: '#11100e',
  textBody:  '#262626',
  textMuted: '#525252',
  cyan:      '#0284c7',
  emerald:   '#059669',
  white:     '#ffffff',
  kpiBg:     '#f8f7f5',
  kpiBorder: '#e6e3dd'
};

const CV_DATA = {
  en: {
    filename: 'cv-roman-deyneko-en.pdf',
    name: 'Roman Deyneko',
    role: 'CTO | Lead Hardware, Embedded Systems & Full-Stack Architect',
    meta: 'Przechlewo, Pomorskie, Poland  ·  Dual PL / UA Citizen  ·  Full EU Work Rights (No Visa Needed)  ·  Remote (EU) / Hybrid / Travel',
    links: [
      { text: '+48 791 265 019', url: 'tel:+48791265019', label: 'Tel/WhatsApp' },
      { text: 'm.pnikut@gmail.com', url: 'mailto:m.pnikut@gmail.com', label: 'Email' },
      { text: 't.me/NeKoRoM', url: 'https://t.me/NeKoRoM', label: 'Telegram' },
      { text: 'github.com/NeKoRoM', url: 'https://github.com/NeKoRoM', label: 'GitHub' },
      { text: 'linkedin.com/in/roman-deyneko', url: 'https://linkedin.com/in/roman-deyneko', label: 'LinkedIn' }
    ],
    summary: 'Mechatronics & Embedded Systems Architect fusing industrial automation (Siemens S7, Factory I/O, Laser CNC, EPLAN) with cutting-edge robotics (UR-5), zero-router wireless mesh (ESP32-C6 ESP-NOW <10ms), Android hardware integration (Kotlin/BLE/RS-232), and real-time React 19 Canvas MES software. Rapid ROI via micro-downtime elimination (-40%), oven energy optimization (71.1k PLN/yr gas savings), and pre-commissioning in Factory I/O.',
    kpis: [
      { val: '+33%', lbl: 'Line Throughput', sub: '71.1k PLN/yr Gas Saved' },
      { val: '-40%', lbl: 'Downtime Cut', sub: 'Siemens S7 & Line OEE' },
      { val: 'Factory I/O', lbl: 'Virtual Commissioning', sub: 'Laser CNC, CAD & UR-5' },
      { val: '<10ms', lbl: 'Mesh Latency', sub: 'Zero-Router ESP-NOW' },
      { val: '100%', lbl: 'Zero Punch Loss', sub: 'rpi2 Edge Gateway' },
      { val: '493 ECTS', lbl: 'Triple Degree', sub: 'M.Sc. + 2x B.Sc. PANS' }
    ],
    sections: {
      experience: 'Commercial Engineering Experience & Plant Operations',
      projects: 'Key Industrial Projects & Production Deliverables',
      skills: 'Core Competencies Matrix (ATS Keyword Grouping)',
      academic: 'Academic Credentials, Target Alignment & Terms',
      rodoHeader: 'Data Processing Consent (GDPR)'
    },
    experience: [
      {
        title: 'Industrial Automation & Commissioning Engineer',
        company: 'Goodvalley Agro-Industrial Complex — Przechlewo, Poland',
        period: '2025 – Present',
        bullets: [
          'Commissioned and modernized industrial food processing machinery, packaging lines, and high-speed conveyors.',
          'Refactored Siemens S7 (TIA Portal) PLC software logic: eliminated sensor lags, kinematic dead times, and cut downtime by -40%.',
          'Architected and deployed plant MES platform, workTime WFM dispatching, and distributed ESP-NOW wireless mesh telemetry nodes.',
          'Automated data acquisition and telemetry from industrial energy meters; developed custom warehouse software for parts/tool picking.'
        ]
      },
      {
        title: 'Industrial Automation & Embedded Engineer',
        company: 'Colorland / Industrial Systems Engineering — Rzeszów & Poland',
        period: '2024 – 2025',
        bullets: [
          'Engineered 3D production line simulations in Factory I/O with Siemens PLCSIM, Modbus TCP and OPC UA for virtual commissioning.',
          'Developed OpenCV computer vision pipelines for industrial image analysis & inspection; integrated UR-5 with Sick vision (+35%).',
          'Designed custom hardware interface modules for machine integration; reverse-engineered internal machine data protocols.',
          'Operated CNC laser cutting with nesting optimization; mechanical design in AutoCAD, Fusion 360, SolidWorks, EPLAN.'
        ]
      },
      {
        title: 'Lead Automation Engineer (Główny Automatyk)',
        company: 'Fabryka Ciastek San-Pajda — Jarosław, Poland',
        period: '2023 – 2024',
        bullets: [
          'Modernized coordinate dosing algorithm for meringue baking: boosted tray capacity by +33%, saving 71,124 PLN/year in gas fuel.',
          'Deployed SCADA/MES turbomixer multi-machine integration in 57 days (25.4k PLN budget); supervised UR plant maintenance.'
        ]
      },
      {
        title: 'Android & Embedded Hardware Developer / Control Cabinets',
        company: 'MostCentrService, KasaMobile & ZUT Kunzek — Poland & Ukraine',
        period: '2021 – 2024',
        bullets: [
          'Developed KasaMobile & SmartShop Android apps (Kotlin, Jetpack Compose, Clean Architecture, Hilt, Room, Coroutines/Flow).',
          'Engineered Bluetooth (BLE/SPP) & RS-232 protocols for Posnet, Novitus & Elzab fiscal printers, industrial scales, and ML Kit scanning.',
          'Prefabricated industrial control cabinets (szafy sterownicze: PLCs, VFDs, safety relays) and executed EPLAN I/O loop checks.'
        ]
      }
    ],
    projects: [
      { name: 'San-Pajda Turbomixer & Oven Energy Optimization', desc: 'SCADA linking 2 machines in 57 days (25.4k PLN); coordinate dispensing gave +33% oven capacity & 71.1k PLN/yr verified gas savings.' },
      { name: 'Colorland Virtual Commissioning & Laser CNC', desc: 'Factory I/O simulations with Modbus TCP/PLCSIM; CNC laser cutting with nesting optimization; UR-5 + Sick vision sorting (+35%).' },
      { name: 'Industrial MES & Digital Twin Platform', desc: 'Python (FastAPI) + React 19 Canvas 60 FPS shopfloor telemetry; Order -> MES -> Edge pipeline (SLA ≤12h); Zero Punch Loss.' },
      { name: 'MostCentrService & KasaMobile Hardware POS', desc: 'Android (Kotlin/Compose) app communicating via BLE/SPP & RS-232 with Posnet/Novitus/Elzab fiscal printers and industrial scales.' }
    ],
    skills: [
      { cat: 'PLC & Automation', val: 'Siemens S7 (TIA Portal), OpenCV (Vision/Image Analysis), IEC 61131-3, Factory I/O, PROFINET, Modbus, IO-Link, UR-5' },
      { cat: 'CAD & Fabrication', val: 'AutoCAD, Fusion 360, SolidWorks, EPLAN (Electric P8), Laser CNC (G-code, Nesting), Szafy Sterownicze (VFD, Safety Relays)' },
      { cat: 'Mobile & Android', val: 'Kotlin, Jetpack Compose, Coroutines & Flow, Hilt, Room, Clean Architecture, Bluetooth (BLE/SPP), RS-232, CameraX / ML Kit' },
      { cat: 'Embedded & Mesh', val: 'C/C++ (PlatformIO), FreeRTOS, ESP-IDF, ESP32-C6 (ESP-NOW Mesh <10ms), STM32, Edge Linux (Raspberry Pi, Read-Only Rootfs)' },
      { cat: 'Full-Stack & Lead', val: 'Python (FastAPI), React 19 Canvas (Digital Twins), SQL, Docker, Agile/Scrum (Jira), Lean & OEE (+33%), ISO Audit, 493 ECTS' }
    ],
    academic: {
      degrees: 'Mgr (M.Sc.) Management (120 ECTS) · Inż. (B.Sc.) Computer Science (213 ECTS) · Inż. (B.Sc.) Automation & Electronics (160 ECTS) — PANS (493 ECTS Total, 1,880h+ Practicum)',
      target: 'Target Roles: CTO / Tech Lead · Head of Automation & R&D · Lead Embedded & IIoT Architect · Industrial MES Architect · Senior Automation Engineer',
      terms: 'Compensation: Open to Company Offers (B2B + VAT / UoP)   ·   Availability: Immediate / 2 Weeks   ·   Mode: Remote (EU) / Hybrid / Travel'
    },
    rodo: 'I hereby consent to my personal data being processed for the purpose of recruitment processes in accordance with the EU General Data Protection Regulation (GDPR / RODO 2016/679).'
  },
  pl: {
    filename: 'cv-roman-deyneko-pl.pdf',
    name: 'Roman Deyneko',
    role: 'Główny Inżynier Hardware, Systemów Wbudowanych i Full-Stack (CTO)',
    meta: 'Przechlewo, woj. pomorskie  ·  Obywatel RP / UA  ·  Pełne prawa rynku pracy UE (Bez wizy)  ·  Zdalnie w UE / Hybryda / Wyjazdy',
    links: [
      { text: '+48 791 265 019', url: 'tel:+48791265019', label: 'Tel/WhatsApp' },
      { text: 'm.pnikut@gmail.com', url: 'mailto:m.pnikut@gmail.com', label: 'Email' },
      { text: 't.me/NeKoRoM', url: 'https://t.me/NeKoRoM', label: 'Telegram' },
      { text: 'github.com/NeKoRoM', url: 'https://github.com/NeKoRoM', label: 'GitHub' },
      { text: 'linkedin.com/in/roman-deyneko', url: 'https://linkedin.com/in/roman-deyneko', label: 'LinkedIn' }
    ],
    summary: 'Inżynier Automatyk, Mechatronik i Architekt Systemów Wbudowanych łączący automatyzację przemysłową (Siemens S7, Factory I/O, Laser CNC, EPLAN) z robotyką (UR-5), sieciami kratowymi mesh (ESP32-C6 ESP-NOW <10ms), integracją Android (Kotlin/BLE/RS-232) oraz platformami MES w React 19 Canvas. Szybki ROI dzięki redukcji mikroprzestojów (-40%), optymalizacji pieców (71.1k PLN/rok) i walidacji w Factory I/O.',
    kpis: [
      { val: '+33%', lbl: 'Przepustowość Linii', sub: '71.1k PLN/rok oszczędności' },
      { val: '-40%', lbl: 'Redukcja Przestojów', sub: 'Siemens S7 & OEE Linii' },
      { val: 'Factory I/O', lbl: 'Wirtualny Rozruch', sub: 'Laser CNC, CAD & UR-5' },
      { val: '<10ms', lbl: 'Opóźnienie Mesh', sub: 'Bezrouterowy ESP-NOW' },
      { val: '100%', lbl: 'Zero Punch Loss', sub: 'Bramka Edge rpi2' },
      { val: '493 ECTS', lbl: '3 Dyplomy Wyższe', sub: 'Mgr + 2x Inż. PANS' }
    ],
    sections: {
      experience: 'Doświadczenie Komercyjne, Wdrożeniowe i Przemysłowe',
      projects: 'Główne Projekty Przemysłowe & Efekty Wdrożeń',
      skills: 'Matryca Głównych Kompetencji Technicznych (ATS Matrix)',
      academic: 'Wykształcenie Akademickie, Warunki Współpracy & Dostępność',
      rodoHeader: 'Klauzula Zgody na Przetwarzanie Danych Osobowych (RODO)'
    },
    experience: [
      {
        title: 'Inżynier ds. Automatyzacji i Uruchomień Przemysłowych',
        company: 'Kompleks Agroprzemysłowy Goodvalley — Przechlewo',
        period: '2025 – Obecnie',
        bullets: [
          'Uruchomienia i modernizacja linii produkcyjnych, maszyn pakujących oraz transporterów w zakładzie przetwórstwa.',
          'Refaktoring oprogramowania PLC Siemens S7 (TIA Portal): eliminacja zacięć czujników i redukcja mikroprzestojów o -40%.',
          'Wdrożenie zakładowej platformy MES, dyspozytorni workTime WFM oraz rozproszonej bezprzewodowej sieci telemetrycznej ESP-NOW mesh.',
          'Automatyzacja zczytywania danych z przemysłowych liczników energii; autorskie oprogramowanie magazynowe do pobierania części i narzędzi.'
        ]
      },
      {
        title: 'Inżynier Automatyk / Automatyk Linii Produkcyjnych',
        company: 'Colorland / Inżynieria Systemów Przemysłowych — Rzeszów i Polska',
        period: '2024 – 2025',
        bullets: [
          'Symulacje 3D linii w Factory I/O z połączeniem Siemens PLCSIM, Modbus TCP i OPC UA (wirtualny rozruch).',
          'Analiza obrazu i inspekcja w OpenCV; integracja ramienia robotycznego UR-5 z kamerą Sick do automatycznego sortowania (+35%).',
          'Projektowanie autorskich modułów sprzętowych do integracji maszyn; analiza i inżynieria wewnętrznych protokołów danych.',
          'Obsługa przemysłowych wycinarek laserowych CNC z nestingiem i CAD/CAM (AutoCAD, Fusion 360, SolidWorks, EPLAN).'
        ]
      },
      {
        title: 'Główny Automatyk (Lead Automation Engineer)',
        company: 'Fabryka Ciastek San-Pajda — Jarosław',
        period: '2023 – 2024',
        bullets: [
          'Modyfikacja algorytmu dozowania bezów: wzrost pojemności blachy o +33% i 71 124 PLN/rok potwierdzonych oszczędności gazu.',
          'Wdrożenie integracji SCADA/MES turbomixera w 57 dni (budżet 25.4k PLN); nadzór nad działem utrzymania ruchu (UR).'
        ]
      },
      {
        title: 'Programista Android & Systemów Wbudowanych / Monter Szaf',
        company: 'MostCentrService, KasaMobile & ZUT Kunzek — Polska i Ukraina',
        period: '2021 – 2024',
        bullets: [
          'Aplikacje mobilne KasaMobile i SmartShop (Kotlin, Jetpack Compose, Clean Architecture, Hilt, Room, Coroutines/Flow).',
          'Protokoły Bluetooth (BLE/SPP) i RS-232 do drukarek fiskalnych (Posnet, Novitus, Elzab), wag przemysłowych i skanowania ML Kit.',
          'Prefabrykacja szaf sterowniczych (PLC, falowniki VFD, przekaźniki bezpieczeństwa) oraz testy sygnałów (I/O check) wg EPLAN.'
        ]
      }
    ],
    projects: [
      { name: 'San-Pajda Turbomixer & Optymalizacja Pieca', desc: 'Integracja SCADA 2 maszyn w 57 dni (25.4k PLN); optymalizacja dozowania dała +33% wydajności pieca i 71.1k PLN/rok oszczędności gazu.' },
      { name: 'Colorland Wirtualny Rozruch & Laser CNC', desc: 'Symulacje w Factory I/O z Modbus TCP/PLCSIM; cięcie laserowe CNC z nestingiem; sortowanie wizyjne UR-5 + Sick (+35%).' },
      { name: 'Przemysłowy MES & Cyfrowy Bliźniak Hali', desc: 'Python (FastAPI) + React 19 Canvas 60 FPS telemetrii; przepływ Zlecenie -> MES -> Edge (SLA ≤12h); Zero Punch Loss.' },
      { name: 'MostCentrService & KasaMobile Sprzęt POS', desc: 'Aplikacje Android (Kotlin/Compose) integrujące przez BLE/SPP i RS-232 drukarki fiskalne Posnet/Novitus/Elzab i wagi przemysłowe.' }
    ],
    skills: [
      { cat: 'Automatyka & PLC', val: 'Siemens S7 (TIA Portal), OpenCV (Analiza Obrazu), IEC 61131-3, Factory I/O, PROFINET, Modbus RTU/TCP, IO-Link, UR-5' },
      { cat: 'CAD & Wytwarzanie', val: 'AutoCAD, Fusion 360, SolidWorks, EPLAN (Electric P8), Laser CNC (G-code, Nesting), Szafy Sterownicze (VFD, Safety)' },
      { cat: 'Mobile & Android', val: 'Kotlin, Jetpack Compose, Coroutines & Flow, Hilt, Room, Clean Architecture, Bluetooth (BLE/SPP), RS-232, CameraX / ML Kit' },
      { cat: 'Systemy Wbudowane', val: 'C/C++ (PlatformIO), FreeRTOS, ESP-IDF, ESP32-C6 (ESP-NOW Mesh <10ms), STM32, Edge Linux (Raspberry Pi, Read-Only)' },
      { cat: 'Full-Stack & Zespół', val: 'Python (FastAPI), React 19 Canvas (Cyfrowy Bliźniak), SQL, Docker, Agile/Scrum (Jira), Lean & OEE (+33%), Audyt ISO, 493 ECTS' }
    ],
    academic: {
      degrees: 'Mgr Zarządzania (120 ECTS) · Inż. Informatyki (213 ECTS) · Inż. Automatyki i Elektroniki (160 ECTS) — PANS w Jarosławiu (Łącznie 493 ECTS, 1880h+ praktyk)',
      target: 'Docelowe Stanowiska: CTO / Tech Lead · Head of Automation & R&D · Główny Architekt Embedded & IIoT · Architekt Systemów MES · Senior Automatyk',
      terms: 'Wynagrodzenie: Do uzgodnienia / Oferta firmy (B2B / UoP)   ·   Dostępność: Od zaraz / 2 tyg.   ·   Tryb: Zdalnie / Hybryda / Delegacje'
    },
    rodo: 'Wyrażam zgodę na przetwarzanie moich danych osobowych dla potrzeb niezbędnych do realizacji procesu rekrutacji zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).'
  }
};

function generatePdf(langKey) {
  return new Promise((resolve, reject) => {
    const data = CV_DATA[langKey];
    const outputPath = path.join(__dirname, 'public', data.filename);
    
    // Standard A4: 595.28 x 841.89 points
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 20, bottom: 12, left: 32, right: 32 },
      autoFirstPage: true,
      bufferPages: true
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // Register TrueType Fonts
    doc.registerFont('Roboto', regularFont);
    doc.registerFont('Roboto-Bold', boldFont);
    doc.registerFont('Roboto-Medium', mediumFont);
    doc.registerFont('Roboto-Italic', italicFont);

    const left = 32;
    const pageWidth = 595.28;
    const contentWidth = pageWidth - (left * 2); // 531.28 pt

    // ─── 1. HEADER ────────────────────────────────────────────────────────────
    const headerHeight = 84;
    doc.rect(left, 18, contentWidth, headerHeight)
       .fillAndStroke(PALETTE.darkBg, PALETTE.lineDark);

    // Gold decorative top accent bar
    doc.rect(left, 18, contentWidth, 3).fill(PALETTE.gold);

    // Candidate Name
    doc.font('Roboto-Bold').fontSize(19).fillColor(PALETTE.white)
       .text(data.name, left + 14, 27);

    // Candidate Title / Target Role
    doc.font('Roboto-Medium').fontSize(9.5).fillColor(PALETTE.goldLight)
       .text(data.role, left + 14, 49);

    // Location & Citizenship Meta
    doc.font('Roboto').fontSize(7.5).fillColor('#9ca3af')
       .text(data.meta, left + 14, 64);

    // Interactive Clickable Contact Strip
    let curX = left + 14;
    const contactY = 80;
    doc.font('Roboto-Medium').fontSize(7.6);

    data.links.forEach((item, idx) => {
      const label = item.text;
      const textWidth = doc.widthOfString(label);

      doc.fillColor(PALETTE.goldLight)
         .text(label, curX, contactY);
      doc.link(curX, contactY - 1, textWidth, 11, item.url);

      curX += textWidth;

      if (idx < data.links.length - 1) {
        const sep = '  ·  ';
        const sepWidth = doc.widthOfString(sep);
        doc.fillColor('#6b7280').text(sep, curX, contactY);
        curX += sepWidth;
      }
    });

    let y = 108;

    // ─── 2. EXECUTIVE SUMMARY (HOOK) ──────────────────────────────────────────
    const summaryHeight = 33;
    doc.rect(left, y, contentWidth, summaryHeight)
       .fillAndStroke('#faf9f6', '#e5e2db');

    doc.font('Roboto-Italic').fontSize(7.4).fillColor('#1f2937')
       .text(data.summary, left + 8, y + 4.5, {
         width: contentWidth - 16,
         lineGap: 1.1,
         align: 'justify'
       });

    y += summaryHeight + 5;

    // ─── 3. PROOF-OF-IMPACT KPI BANNER (6 TILES) ──────────────────────────────
    const tileGap = 4;
    const tileCount = data.kpis.length;
    const tileWidth = (contentWidth - ((tileCount - 1) * tileGap)) / tileCount;
    const tileHeight = 29;

    data.kpis.forEach((kpi, i) => {
      const tileX = left + (i * (tileWidth + tileGap));
      doc.rect(tileX, y, tileWidth, tileHeight)
         .fillAndStroke(PALETTE.kpiBg, PALETTE.kpiBorder);

      doc.font('Roboto-Bold').fontSize(9.2).fillColor(PALETTE.gold)
         .text(kpi.val, tileX, y + 2.5, { width: tileWidth, align: 'center' });

      doc.font('Roboto-Medium').fontSize(6.4).fillColor('#111827')
         .text(kpi.lbl, tileX, y + 13, { width: tileWidth, align: 'center' });

      doc.font('Roboto').fontSize(5.3).fillColor('#6b7280')
         .text(kpi.sub, tileX, y + 20.5, { width: tileWidth, align: 'center' });
    });

    y += tileHeight + 6;

    // ─── HELPER: SECTION HEADER ───────────────────────────────────────────────
    function renderSectionHeader(title) {
      doc.rect(left, y, contentWidth, 13).fill(PALETTE.darkBg);
      doc.rect(left, y, 3, 13).fill(PALETTE.gold);
      doc.font('Roboto-Bold').fontSize(7.5).fillColor(PALETTE.goldLight)
         .text(title.toUpperCase(), left + 8, y + 2.8, { lineBreak: false });
      y += 16;
    }

    // ─── 4. COMMERCIAL & R&D EXPERIENCE (CAR FRAMEWORK) ───────────────────────
    renderSectionHeader(data.sections.experience);

    data.experience.forEach((job) => {
      doc.font('Roboto-Bold').fontSize(8.1).fillColor('#111827')
         .text(job.title, left, y, { lineBreak: false });

      doc.font('Roboto-Bold').fontSize(7.4).fillColor(PALETTE.gold)
         .text(job.period, left, y + 0.5, { width: contentWidth, align: 'right' });
      y += 9.5;

      doc.font('Roboto-Medium').fontSize(7.3).fillColor('#4b5563')
         .text(job.company, left, y);
      y += 8.5;

      job.bullets.forEach((bullet) => {
        doc.font('Roboto-Bold').fontSize(7.0).fillColor(PALETTE.gold)
           .text('›', left + 4, y, { lineBreak: false });

        doc.font('Roboto').fontSize(6.9).fillColor('#1f2937')
           .text(bullet, left + 12, y, {
             width: contentWidth - 12,
             lineGap: 0.6
           });
        y = doc.y + 0.8;
      });
      y += 2.2;
    });

    // ─── 5. KEY INDUSTRIAL PROJECTS & DELIVERABLES ────────────────────────────
    renderSectionHeader(data.sections.projects);

    data.projects.forEach((proj) => {
      doc.font('Roboto-Bold').fontSize(7.3).fillColor('#111827')
         .text(proj.name + ': ', left, y, { continued: true });

      doc.font('Roboto').fontSize(6.9).fillColor('#374151')
         .text(proj.desc, { width: contentWidth, lineGap: 0.6 });
      y = doc.y + 1.8;
    });

    y += 1;

    // ─── 6. CORE COMPETENCIES MATRIX ──────────────────────────────────────────
    renderSectionHeader(data.sections.skills);

    data.skills.forEach((skill) => {
      const catWidth = 98;
      doc.font('Roboto-Bold').fontSize(7.2).fillColor('#111827')
         .text(skill.cat + ':', left, y, { width: catWidth });

      doc.font('Roboto').fontSize(6.9).fillColor('#374151')
         .text(skill.val, left + catWidth, y, {
           width: contentWidth - catWidth,
           lineGap: 0.6
         });
      y = doc.y + 1.4;
    });

    y += 2;

    // ─── 7. ACADEMIC CREDENTIALS & TERMS ──────────────────────────────────────
    renderSectionHeader(data.sections.academic);

    // Row 1: Degrees
    doc.font('Roboto-Bold').fontSize(7.1).fillColor('#111827')
       .text(langKey === 'pl' ? 'Uczelnia: ' : 'Education: ', left, y, { continued: true });
    doc.font('Roboto').fontSize(6.9).fillColor('#374151')
       .text(data.academic.degrees, { width: contentWidth });
    y = doc.y + 2.0;

    // Row 2: Target
    doc.font('Roboto-Medium').fontSize(7.1).fillColor(PALETTE.gold)
       .text(data.academic.target, left, y);
    y = doc.y + 2.0;

    // Row 3: Terms
    doc.font('Roboto').fontSize(6.9).fillColor('#4b5563')
       .text(data.academic.terms, left, y);

    // ─── 8. RODO / GDPR LEGAL COMPLIANCE FOOTER ───────────────────────────────
    doc.rect(left, 804, contentWidth, 24)
       .fillAndStroke('#f3f2ee', '#e2dfd7');

    doc.font('Roboto-Italic').fontSize(5.6).fillColor('#6b7280')
       .text(data.rodo, left + 6, 808, {
         width: contentWidth - 12,
         align: 'center',
         lineGap: 1
       });

    doc.end();

    stream.on('finish', () => {
      const stats = fs.statSync(outputPath);
      console.log(`✅ [${langKey.toUpperCase()}] PDF created: ${data.filename} (${(stats.size / 1024).toFixed(1)} KB)`);
      resolve({ filename: data.filename, path: outputPath });
    });

    stream.on('error', reject);
  });
}

async function run() {
  console.log('Generating high-converting CVs (EN & PL)...');
  const enRes = await generatePdf('en');
  const plRes = await generatePdf('pl');

  // Copy default cv-roman-deyneko.pdf from English version for backwards compatibility
  const defaultPath = path.join(__dirname, 'public', 'cv-roman-deyneko.pdf');
  fs.copyFileSync(enRes.path, defaultPath);
  console.log(`✅ Default CV synced: cv-roman-deyneko.pdf`);
}

run().catch((err) => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
