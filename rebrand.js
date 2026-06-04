const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('dist') && !dirFile.includes('.git')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      if (dirFile.match(/\.(jsx|js|html|json|xml|ts|css)$/)) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const dirsToScan = [
  path.join(__dirname, 'frontend', 'src'),
  path.join(__dirname, 'frontend', 'index.html'),
  path.join(__dirname, 'stmapp', 'capacitor.config.json'),
  path.join(__dirname, 'stmapp', 'capacitor.config.ts'),
  path.join(__dirname, 'stmapp', 'android', 'app', 'src', 'main', 'res', 'values', 'strings.xml')
];

let files = [];
dirsToScan.forEach(p => {
  if (fs.existsSync(p)) {
    if (fs.statSync(p).isDirectory()) {
      files = walkSync(p, files);
    } else {
      files.push(p);
    }
  }
});

const colorReplacements = {
  // Light bg (amber/yellow 50, 100)
  '#fffbeb': 'rgba(212,175,55,0.08)',
  '#fef3c7': 'rgba(212,175,55,0.12)',
  '#fef08a': '#E6C200',
  // Borders/accents (200, 300, 400)
  '#fde68a': 'rgba(212,175,55,0.3)',
  '#fcd34d': '#E6C200',
  '#facc15': '#E6C200',
  // Main accents (500)
  '#f59e0b': '#D4AF37',
  '#eab308': '#D4AF37',
  // Dark text/accents (600, 700, 800, 900)
  '#d97706': '#B8860B',
  '#b45309': '#B8860B',
  '#92400e': '#B8860B',
  '#78350f': '#B8860B',
  // Standard generic yellow
  '#FFC107': '#D4AF37',
  '#ffc107': '#D4AF37',
  '#FFC439': '#D4AF37'
};

const nameReplacements = [
  { regex: /STM Salam Teh Tarik/gi, replace: 'GoldenGravityExpressX' },
  { regex: /Salam Teh Tarik/gi, replace: 'GoldenGravityExpressX' },
  { regex: /STM Salam/gi, replace: 'GoldenGravityExpressX' }
];

let modifiedCount = 0;

files.forEach(f => {
  try {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // Apply color replacements
    Object.keys(colorReplacements).forEach(key => {
      const reg = new RegExp(key, 'gi');
      content = content.replace(reg, colorReplacements[key]);
    });

    // Apply name replacements
    nameReplacements.forEach(nr => {
      content = content.replace(nr.regex, nr.replace);
    });

    if (content !== original) {
      fs.writeFileSync(f, content, 'utf8');
      modifiedCount++;
      console.log(`Modified: ${f}`);
    }
  } catch(e) {
    console.error(`Error reading ${f}`, e);
  }
});

console.log(`Done! Modified ${modifiedCount} files.`);
