const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..', '..');
const frontendDir = path.join(rootDir, 'frontend');
const frontendPkgPath = path.join(frontendDir, 'package.json');
const frontendDist = path.join(frontendDir, 'dist');
const wrapperDir = path.resolve(__dirname, '..');
const webDir = path.join(wrapperDir, 'stmapp');
const skipBuild = process.argv.includes('--skip-build');

function run(command, args, cwd) {
  console.log(`\n> ${command} ${args.join(' ')}`);
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function ensureFrontendPackage() {
  if (!fs.existsSync(frontendPkgPath)) {
    throw new Error(`Missing frontend package.json: ${frontendPkgPath}`);
  }

  const pkg = readJson(frontendPkgPath);
  pkg.scripts = pkg.scripts || {};
  let changed = false;

  if (!pkg.scripts.dev) {
    pkg.scripts.dev = 'vite';
    changed = true;
  }
  if (!pkg.scripts.build) {
    pkg.scripts.build = 'vite build';
    changed = true;
  }

  if (changed) {
    writeJson(frontendPkgPath, pkg);
    console.log('[prepare] Injected missing Vite scripts into frontend/package.json');
  }
}

function ensureCapacitorConfig() {
  const configPath = path.join(wrapperDir, 'capacitor.config.json');
  const expected = {
    appId: 'com.stmsalam.app',
    appName: 'STMAPP',
    webDir: 'stmapp',
    server: {
      androidScheme: 'http',
      hostname: 'localhost',
      cleartext: true,
    },
  };
  writeJson(configPath, expected);
}

function copyDirectory(source, target) {
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(target, { recursive: true });
  fs.cpSync(source, target, { recursive: true });
}

function validateWebDir() {
  const required = ['index.html', 'assets'];
  const missing = required.filter((entry) => !fs.existsSync(path.join(webDir, entry)));
  if (missing.length) {
    throw new Error(`Prepared webDir is missing: ${missing.join(', ')}`);
  }

  const assetsDir = path.join(webDir, 'assets');
  const assets = fs.readdirSync(assetsDir, { recursive: true }).map(String);
  const hasJs = assets.some((file) => file.endsWith('.js'));
  const hasCss = assets.some((file) => file.endsWith('.css'));
  if (!hasJs || !hasCss) {
    throw new Error('Prepared webDir must contain JS and CSS bundles in assets/.');
  }

  const manifestPath = path.join(webDir, '.vite', 'manifest.json');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('Prepared webDir is missing Vite manifest at .vite/manifest.json.');
  }
}

function main() {
  ensureFrontendPackage();
  ensureCapacitorConfig();

  if (!fs.existsSync(path.join(frontendDir, 'node_modules'))) {
    run('npm', ['install', '--legacy-peer-deps'], frontendDir);
  }
  if (!fs.existsSync(path.join(wrapperDir, 'node_modules'))) {
    run('npm', ['install'], wrapperDir);
  }

  if (!skipBuild) {
    run('npm', ['run', 'build'], frontendDir);
  }

  if (!fs.existsSync(frontendDist)) {
    throw new Error('frontend/dist does not exist. Run npm run build first.');
  }

  copyDirectory(frontendDist, webDir);
  validateWebDir();

  console.log(`[prepare] Copied ${frontendDist} -> ${webDir}`);
}

try {
  main();
} catch (err) {
  console.error(`\n[prepare] ${err.message}`);
  process.exit(1);
}
