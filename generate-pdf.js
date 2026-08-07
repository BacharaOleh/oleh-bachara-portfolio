const fs = require('fs');

const text = `CV — Oleh Bachara
Location: Jarosław, Podkarpackie, Poland
Phone: +48 453 315 500 | Email: olegbachara@gmail.com
Title: Web Developer | Technical Marketing Specialist | Systems Architect

================================================================================
ACADEMIC CREDENTIALS & DEGREES
================================================================================
- Magister Zarzadzania (M.Sc. Management)
  PANS w Jaroslawiu | 2025 - Present
  Digital marketing strategy, project management methodologies & business processes.

- Inzynier Informatyki (B.Sc. Computer Science)
  PANS w Jaroslawiu | 2019 - 2025
  Software engineering, algorithms & data structures, database systems & networking.

- Legal Status: Dual PL/UA Citizenship — Full EU Work Rights.

================================================================================
COMMERCIAL EXPERIENCE
================================================================================
- Reh4mat (IT & Web Marketing Specialist / Web Developer)
  2023 - 2026 (3 Years)
  * Managed full lifecycle of 8 corporate websites & product catalog platforms.
  * Achieved +40% organic search traffic surge via PageSpeed sub-2s tuning & SEO.
  * Elevated email campaign engagement rate to 30-36%.

- Freelance & Pet Projects (Web Developer & UI/UX)
  2021 - 2023 (1.5 Years)
  * Developed custom Telegram API authentication systems & REST webhooks.
  * Built custom PHP modules & responsive web platforms.

================================================================================
TECHNICAL SKILLS MATRIX
================================================================================
* Languages & Core: PHP, JavaScript (ES6+), HTML5, CSS3/Tailwind, TypeScript
* CMS & Platforms: WordPress Custom Themes & Plugins, Product Catalog Systems, Elementor, ACF
* Marketing & SEO: Google Analytics 4, Google Search Console, Technical SEO, SARE/Mailchimp
* Servers & Tools: cPanel / WHM, Linux CLI, DNS Management, MySQL / MariaDB, Git/GitHub`;

function buildPDF(rawText) {
  const lines = rawText.split('\n');
  let stream = 'BT /F1 10 Tf 40 800 Td 13 TL\n';
  for (const line of lines) {
    const clean = line.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
    stream += `(${clean}) T*\n`;
  }
  stream += 'ET';

  const streamLen = Buffer.byteLength(stream);

  const objects = [
    `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`,
    `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`,
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595 842] /Contents 5 0 R >>\nendobj\n`,
    `4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`,
    `5 0 obj\n<< /Length ${streamLen} >>\nstream\n${stream}\nendstream\nendobj\n`
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [];
  for (const obj of objects) {
    offsets.push(Buffer.byteLength(pdf));
    pdf += obj;
  }

  const startXref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    pdf += offset.toString().padStart(10, '0') + ' 00000 n \n';
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF`;
  return pdf;
}

fs.writeFileSync('public/cv-oleh-bachara.pdf', buildPDF(text));
console.log('PDF created successfully at public/cv-oleh-bachara.pdf');
