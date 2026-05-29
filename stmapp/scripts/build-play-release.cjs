const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const wrapperDir = path.resolve(__dirname, '..');
const androidDir = path.join(wrapperDir, 'android');
const outDir = path.join(wrapperDir, 'dist', 'android');
const aabPath = path.join(androidDir, 'app', 'build', 'outputs', 'bundle', 'release', 'app-release.aab');
const apkCandidates = [
  path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk'),
  path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'release', 'app-release-unsigned.apk'),
];

function run(command, args, cwd) {
  console.log(`\n> ${command} ${args.join(' ')}`);
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) process.exit(result.status || 1);
}

if (!fs.existsSync(path.join(androidDir, 'keystore.properties'))) {
  console.error('[play-release] Missing android/keystore.properties. Run create-release-keystore.bat first.');
  process.exit(1);
}

run('npx', ['cap', 'sync', 'android'], wrapperDir);
run(process.platform === 'win32' ? 'gradlew.bat' : './gradlew', ['bundleRelease', 'assembleRelease'], androidDir);

if (!fs.existsSync(aabPath)) {
  console.error(`[play-release] Expected AAB not found: ${aabPath}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });
fs.copyFileSync(aabPath, path.join(outDir, 'STMAPP-playstore-release.aab'));

const apkPath = apkCandidates.find((candidate) => fs.existsSync(candidate));
if (apkPath) {
  fs.copyFileSync(apkPath, path.join(outDir, 'STMAPP-signed-release.apk'));
}

console.log(`[play-release] AAB ready: ${path.join(outDir, 'STMAPP-playstore-release.aab')}`);
if (apkPath) {
  console.log(`[play-release] APK ready: ${path.join(outDir, 'STMAPP-signed-release.apk')}`);
}
