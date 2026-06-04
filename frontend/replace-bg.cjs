const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('c:/Users/User/Desktop/syllabuss/teh-tarik-app-my-own/frontend/src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/background:\s*'white'/g, "background: 'var(--bg-card)'");
  content = content.replace(/background:\s*'#FFFFFF'/gi, "background: 'var(--bg-card)'");
  content = content.replace(/background:\s*'#f8fafc'/gi, "background: 'var(--bg-body)'");
  fs.writeFileSync(file, content);
});

console.log('Replaced backgrounds in ' + files.length + ' files.');
