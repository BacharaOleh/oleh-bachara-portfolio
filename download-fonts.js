const https = require('https');
const fs = require('fs');
const path = require('path');

const fontsDir = path.join(__dirname, 'public', 'fonts');
if (!fs.existsSync(fontsDir)) fs.mkdirSync(fontsDir, { recursive: true });

// Use npm @fontsource packages which ship actual TTF files
// Or use bunny.net CDN which serves direct TTF
const fonts = [
  {
    url: 'https://fonts.gstatic.com/s/roboto/v47/KFOMCnqEu92Fr1ME4hFR2A.ttf',
    dest: path.join(fontsDir, 'Roboto-Regular.ttf'),
    label: 'Roboto-Regular'
  },
  {
    url: 'https://fonts.gstatic.com/s/roboto/v47/KFOlCnqEu92Fr1MmWUlvAA.ttf',
    dest: path.join(fontsDir, 'Roboto-Bold.ttf'),
    label: 'Roboto-Bold'
  }
];

function download(url, dest, label, cb) {
  const file = fs.createWriteStream(dest);
  https.get(url, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      file.close();
      fs.unlink(dest, () => {});
      console.log(`Redirect -> ${res.headers.location}`);
      download(res.headers.location, dest, label, cb);
      return;
    }
    if (res.statusCode !== 200) {
      console.error(`HTTP ${res.statusCode} for ${label}`);
      cb(new Error(`HTTP ${res.statusCode}`));
      return;
    }
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      const size = fs.statSync(dest).size;
      const magic = fs.readFileSync(dest).slice(0, 4).toString('hex');
      console.log(`✅ ${label}: ${(size / 1024).toFixed(1)} KB, magic=${magic}`);
      cb(null);
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    console.error(`❌ ${label}:`, err.message);
    cb(err);
  });
}

let pending = fonts.length;
for (const f of fonts) {
  download(f.url, f.dest, f.label, (err) => {
    if (err) { process.exitCode = 1; return; }
    if (--pending === 0) console.log('All fonts downloaded!');
  });
}
