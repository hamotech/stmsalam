const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const wrapperDir = path.resolve(__dirname, '..');
const androidDir = path.join(wrapperDir, 'android');

function commandExists(command, args = ['--version']) {
  const result = spawnSync(command, args, {
    cwd: wrapperDir,
    stdio: 'pipe',
    shell: process.platform === 'win32',
  });
  return result.status === 0;
}

function check(label, ok, fix) {
  const mark = ok ? '[ok]' : '[fix]';
  console.log(`${mark} ${label}${ok ? '' : ` - ${fix}`}`);
  return ok;
}

function commandOutput(command, args = ['--version']) {
  const result = spawnSync(command, args, {
    cwd: wrapperDir,
    stdio: 'pipe',
    shell: process.platform === 'win32',
    encoding: 'utf8',
  });
  return `${result.stdout || ''}${result.stderr || ''}`;
}

function readJavaMajorVersion() {
  const output = commandOutput('java', ['-version']);
  const match = output.match(/version\s+"(\d+)/);
  return match ? Number(match[1]) : null;
}

let ok = true;

ok = check('Capacitor config exists', fs.existsSync(path.join(wrapperDir, 'capacitor.config.json')), 'run build-android.bat') && ok;
ok = check('Prepared web app exists', fs.existsSync(path.join(wrapperDir, 'stmapp', 'index.html')), 'run build-android.bat') && ok;
ok = check('Android project exists', fs.existsSync(androidDir), 'run npx cap add android or build-android.bat') && ok;
ok = check('Node is available', commandExists('node'), 'install Node.js LTS') && ok;
ok = check('npm is available', commandExists('npm'), 'install Node.js LTS') && ok;
ok = check(
  'Android Studio can be launched',
  Boolean(process.env.CAPACITOR_ANDROID_STUDIO_PATH) || commandExists('studio', []),
  'install Android Studio or set CAPACITOR_ANDROID_STUDIO_PATH'
) && ok;

if (fs.existsSync(androidDir)) {
  const manifest = path.join(androidDir, 'app', 'src', 'main', 'AndroidManifest.xml');
  if (fs.existsSync(manifest)) {
    const text = fs.readFileSync(manifest, 'utf8');
    ok = check('INTERNET permission is enabled', text.includes('android.permission.INTERNET'), 'run npx cap sync android') && ok;
    ok = check('Cleartext traffic is enabled', text.includes('android:usesCleartextTraffic="true"'), 'run npx cap sync android') && ok;
  }
}

if (!commandExists('java')) {
  ok = false;
  console.log('[fix] Java/Gradle runtime not found - install Android Studio with JDK or set JAVA_HOME.');
} else {
  const javaMajor = readJavaMajorVersion();
  ok = check(
    'JDK 17 is configured for Android/Gradle',
    javaMajor === 17,
    `install JDK 17 and set JAVA_HOME (detected ${javaMajor || 'unknown'})`
  ) && ok;
}

if (!process.env.ANDROID_HOME && !process.env.ANDROID_SDK_ROOT) {
  ok = false;
  console.log('[fix] ANDROID_HOME/ANDROID_SDK_ROOT not set - install Android SDK API 33 or 34 in Android Studio.');
}

console.log('\nCommon release blocker: if Gradle download fails with PKIX/certificate_unknown, install JDK 17, set JAVA_HOME, then let Android Studio download Gradle once.');

process.exit(ok ? 0 : 1);
