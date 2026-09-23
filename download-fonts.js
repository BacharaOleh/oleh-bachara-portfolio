const https = require('https');
const fs = require('fs');
const path = require('path');

const fontsDir = path.join(__dirname, 'public', 'fonts');
if (!fs.existsSync(fontsDir)) fs.mkdirSync(fontsDir, { recursive: true });

// Reliable TrueType font assets for PDF generation
const fonts = [
  {
    url: 'https://raw.githubusercontent.com/PolymerElements/font-roboto-local/master/fonts/roboto/Roboto-Regular.ttf',
    dest: path.join(fontsDir, 'Roboto-Regular.ttf'),
    label: 'Roboto-Regular'
  },
  {
    url: 'https://raw.githubusercontent.com/PolymerElements/font-roboto-local/master/fonts/roboto/Roboto-Bold.ttf',
    dest: path.join(fontsDir, 'Roboto-Bold.ttf'),
    label: 'Roboto-Bold'
  },
  {
    url: 'https://raw.githubusercontent.com/PolymerElements/font-roboto-local/master/fonts/roboto/Roboto-Medium.ttf',
    dest: path.join(fontsDir, 'Roboto-Medium.ttf'),
    label: 'Roboto-Medium'
  },
  {
    url: 'https://raw.githubusercontent.com/PolymerElements/font-roboto-local/master/fonts/roboto/Roboto-Italic.ttf',
    dest: path.join(fontsDir, 'Roboto-Italic.ttf'),
    label: 'Roboto-Italic'
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
      console.log(`✅ ${label}: ${(size / 1024).toFixed(1)} KB`);
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
    if (--pending === 0) console.log('All fonts downloaded and ready!');
  });
}

