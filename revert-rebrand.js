const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      if (!dirFile.includes('node_modules') && !dirFile.includes('dist') && !dirFile.includes('build') && !dirFile.includes('.git') && !dirFile.includes('.expo') && !dirFile.includes('android\\app\\build')) {
        filelist = walkSync(dirFile, filelist);
      }
    } else {
      // Exclude binary files like images, videos, audio etc, to prevent corruption
      if (!dirFile.match(/\.(png|jpe?g|gif|webp|ico|svg|mp4|webm|mp3|wav|ogg|pdf|zip|tar|gz|apk|aab|keystore|jks)$/i)) {
        filelist.push(dirFile);
      }
    }
  });
  return filelist;
};

const dirsToScan = [
  path.join(__dirname, 'frontend'),
  path.join(__dirname, 'backend'),
  path.join(__dirname, 'functions'),
  path.join(__dirname, 'stm-mobile'),
  path.join(__dirname, 'stmapp'),
  path.join(__dirname, 'package.json'),
  path.join(__dirname, 'firebase.json')
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

const exactReplacements = [
  { regex: /© 2026 GoldenGravityExpressX\. All rights reserved\./gi, replace: '© 2026 STM Salam Fast Delivery. All rights reserved.' },
  { regex: /GoldenGravityExpressX/gi, replace: 'STM Salam' },
  { regex: /Golden Gravity Express X/gi, replace: 'STM Salam' },
  { regex: /GoldenGravity Express/gi, replace: 'STM Salam' },
  { regex: /GoldenGravity/gi, replace: 'STM Salam' },
  { regex: /Golden Gravity/gi, replace: 'STM Salam' },
  { regex: /\bGGE\b/g, replace: 'STM Salam' } // Only match GGE as a standalone word to avoid breaking things like 'SUGGESTION'
];

let modifiedCount = 0;
let modifiedFiles = [];

files.forEach(f => {
  try {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    exactReplacements.forEach(nr => {
      content = content.replace(nr.regex, nr.replace);
    });

    if (content !== original) {
      fs.writeFileSync(f, content, 'utf8');
      modifiedCount++;
      modifiedFiles.push(f);
      console.log(`Modified: ${f}`);
    }
  } catch(e) {
    // some files might not be utf8, ignore those
  }
});

console.log(`Done! Modified ${modifiedCount} files.`);
fs.writeFileSync(path.join(__dirname, 'rebrand-report-temp.json'), JSON.stringify(modifiedFiles, null, 2), 'utf8');
