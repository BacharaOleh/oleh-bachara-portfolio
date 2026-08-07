const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'public', 'cv-oleh-bachara.pdf');
const doc = new PDFDocument({ margin: 50, size: 'A4' });
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// ─── Color Palette ──────────────────────────────────────────
const INDIGO  = '#6366f1';
const CYAN    = '#06b6d4';
const DARK    = '#0f172a';
const LABEL   = '#64748b';
const TEXT    = '#1e293b';
const WHITE   = '#ffffff';

// ─── Header Background ──────────────────────────────────────
doc.rect(0, 0, 595, 140).fill(DARK);

// Name
doc.fontSize(26).fillColor(WHITE).font('Helvetica-Bold')
   .text('Oleh Bachara', 50, 38);

// Title
doc.fontSize(12).fillColor(CYAN).font('Helvetica')
   .text('Web Developer  |  Technical Marketing Specialist  |  Systems Architect', 50, 72);

// Contact line
doc.fontSize(9).fillColor('#94a3b8').font('Helvetica')
   .text('+48 453 315 500   ·   olegbachara@gmail.com   ·   Jarosław, Podkarpackie, Poland   ·   EU Work Rights (PL/UA Citizenship)', 50, 98);

// Underline divider
doc.moveTo(50, 130).lineTo(545, 130).strokeColor(INDIGO).lineWidth(1.5).stroke();

let y = 152;

// ─── Helper: Section Header ─────────────────────────────────
function sectionHeader(title) {
  doc.rect(50, y, 495, 22).fill(INDIGO);
  doc.fontSize(9).fillColor(WHITE).font('Helvetica-Bold')
     .text(title.toUpperCase(), 58, y + 7);
  y += 30;
}

// ─── Helper: Entry ──────────────────────────────────────────
function entry(titleLine, subtitleLine, dateRange, bullets = []) {
  doc.fontSize(11).fillColor(TEXT).font('Helvetica-Bold')
     .text(titleLine, 50, y);
  if (dateRange) {
    doc.fontSize(9).fillColor(LABEL).font('Helvetica')
       .text(dateRange, 50, y, { align: 'right', width: 495 });
  }
  y += 16;
  if (subtitleLine) {
    doc.fontSize(9).fillColor(LABEL).font('Helvetica-Oblique')
       .text(subtitleLine, 50, y);
    y += 14;
  }
  for (const bullet of bullets) {
    doc.fontSize(9).fillColor(TEXT).font('Helvetica')
       .text(`•  ${bullet}`, 62, y, { width: 475, align: 'left' });
    y += 13;
  }
  y += 6;
}

// ─── Helper: Skills row ─────────────────────────────────────
function skillRow(label, value) {
  doc.fontSize(9).fillColor(LABEL).font('Helvetica-Bold')
     .text(label + ':', 50, y, { continued: true });
  doc.fontSize(9).fillColor(TEXT).font('Helvetica')
     .text('  ' + value);
  y += 14;
}

// ─── EDUCATION ──────────────────────────────────────────────
sectionHeader('Academic Credentials');

entry(
  'Magister Zarządzania (M.Sc. Management)',
  'PANS w Jarosławiu — Jarosław, Poland',
  '2025 – Present',
  [
    'Advanced studies in organizational management, digital marketing strategy,',
    'project management methodologies, and business process optimization.'
  ]
);

entry(
  'Inżynier Informatyki (B.Sc. Computer Science)',
  'PANS w Jarosławiu — Jarosław, Poland',
  '2019 – 2025',
  [
    'Software engineering, algorithms & data structures, database systems,',
    'computer networks, and web technologies coursework.'
  ]
);

y += 4;

// ─── EXPERIENCE ─────────────────────────────────────────────
sectionHeader('Commercial Experience');

entry(
  'IT & Web Marketing Specialist / Web Developer',
  'Reh4mat — Jarosław, Poland',
  '2023 – 2026  (3 Years)',
  [
    'Owned full lifecycle of 8 corporate websites & large product catalog platforms across PL/UA/EU markets.',
    'Achieved +40% organic search traffic surge via UX/UI redesign, PageSpeed sub-2s optimization & technical SEO.',
    'Grew email marketing engagement rate to 30–36% via segmentation, A/B testing & automation.',
    'Executed zero-downtime server migrations — PageSpeed Insights: 45 → 94+ on mobile.',
    'Built custom Telegram Bot API integrations, REST webhooks & custom PHP HMAC auth modules.'
  ]
);

entry(
  'Web Developer & UI/UX Designer (Freelance & Pet Projects)',
  'Self-employed / Remote',
  '2021 – 2023  (1.5 Years)',
  [
    'Developed responsive corporate web platforms, custom WordPress themes & plugin solutions.',
    'Created a Telegram OAuth authentication system with server-side PHP HMAC-SHA256 validation.',
    'Delivered UI/UX design improvements and technical SEO audits for small business clients.'
  ]
);

y += 4;

// ─── SKILLS ─────────────────────────────────────────────────
sectionHeader('Technical Skills Matrix');

skillRow('Languages & Core', 'PHP, JavaScript (ES6+), HTML5, CSS3/Tailwind CSS, TypeScript, SQL');
skillRow('CMS & Platforms', 'WordPress (Custom Themes & Plugins), Elementor, ACF/CPT, WP Multisite, Gutenberg/FSE');
skillRow('Product Catalog', 'Product Catalog Management, B2B/B2C Showcase Platforms, Corporate Web Systems');
skillRow('Marketing & SEO', 'Google Analytics 4, Google Search Console, Technical SEO, Mailchimp / SARE, A/B Testing');
skillRow('APIs & Automation', 'Telegram Bot API, REST Webhooks, OAuth / HMAC Authentication, DataLayer / GTM');
skillRow('Servers & Tools', 'cPanel / WHM, Linux CLI, DNS Management, MySQL / MariaDB, Git / GitHub, Adobe Photoshop');

y += 4;

// ─── LANGUAGES ──────────────────────────────────────────────
sectionHeader('Language Proficiency');
doc.fontSize(9).fillColor(TEXT).font('Helvetica')
   .text('🇵🇱 Polish — Native   ·   🇺🇦 Ukrainian — Native   ·   🇷🇺 Russian — Native   ·   🇬🇧 English — B1 (Professional Growth)', 50, y, { width: 495 });
y += 20;

// ─── KEY METRICS ────────────────────────────────────────────
sectionHeader('Key Performance Metrics');
doc.fontSize(9).fillColor(TEXT).font('Helvetica')
   .text('+40% Organic Traffic Surge (Reh4mat)   ·   8+ Corporate Sites Managed   ·   30–36% Email CTR   ·   0% Migration Downtime   ·   PageSpeed: 45→94+', 50, y, { width: 495 });
y += 20;

// ─── Footer ─────────────────────────────────────────────────
doc.rect(0, 800, 595, 42).fill(DARK);
doc.fontSize(8).fillColor('#64748b').font('Helvetica')
   .text('olegbachara@gmail.com   ·   +48 453 315 500   ·   linkedin.com/in/olegh-bachara   ·   github.com/olegb', 50, 814, { align: 'center', width: 495 });

doc.end();

stream.on('finish', () => {
  const stats = fs.statSync(outputPath);
  console.log(`✅ PDF generated: public/cv-oleh-bachara.pdf (${(stats.size / 1024).toFixed(1)} KB)`);
});
