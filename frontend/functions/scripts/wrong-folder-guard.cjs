/* eslint-disable no-console */
'use strict';

console.error(
  '[ERROR] You are inside backend functions folder. Run the app from /frontend (parent directory).'
);
console.error('');
console.error('  cd ..');
console.error('  npm install');
console.error('  npm run dev');
console.error('    or: npm start');
console.error('');
console.error('This folder is for Firebase Cloud Functions only (deploy / emulators), not the Vite website.');
process.exit(1);
