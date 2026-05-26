const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const wrapperDir = path.resolve(__dirname, '..');
const androidDir = path.join(wrapperDir, 'android');
const outDir = path.join(wrapperDir, 'dist', 'android');
const releaseDir = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'release');
const releaseApkCandidates = [
  path.join(releaseDir, 'app-release.apk'),
  path.join(releaseDir, 'app-release-unsigned.apk'),
];
const copiedApk = path.join(outDir, 'STMAPP-release.apk');

function run(command, args, cwd) {
  console.log(`\n> ${command} ${args.join(' ')}`);
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) process.exit(result.status || 1);
}

if (!fs.existsSync(androidDir)) {
  console.error('[release] Android project missing. Run build-android.bat first.');
  process.exit(1);
}

run('node', ['scripts/prepare-web-assets.cjs'], wrapperDir);
run('npx', ['cap', 'sync', 'android'], wrapperDir);
run(process.platform === 'win32' ? 'gradlew.bat' : './gradlew', ['assembleRelease'], androidDir);

const releaseApk = releaseApkCandidates.find((candidate) => fs.existsSync(candidate));
if (!releaseApk) {
  console.error(`[release] Expected APK not found in ${releaseDir}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(releaseApk, copiedApk);
console.log(`[release] APK copied to ${copiedApk}`);
