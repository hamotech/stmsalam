#!/usr/bin/env node
/**
 * Resolve Android SDK (ANDROID_HOME → ANDROID_SDK_ROOT → OS defaults).
 * Used by Gradle on Windows when env is unset — same rules as expo run:android expects.
 */

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const HELP = `
Android SDK not found (need platform-tools under the SDK folder).

Windows (Android Studio default):
  setx ANDROID_HOME "%LOCALAPPDATA%\\Android\\Sdk"
Then open a NEW terminal — or install Android Studio SDK and use Settings → Android SDK → copy path.

After "npx expo prebuild --platform android", optionally:
  npm run android:write-local-properties
Or copy stm-mobile/android-sdk.example.properties → android/local.properties and set sdk.dir=...

EAS eas build --local runs only on macOS/Linux (not Windows). Use "eas build" in the cloud, or Gradle locally once ANDROID_HOME is valid.
`;

/**
 * @returns {string|null} Absolute path to SDK root, or null
 */
export function resolveAndroidSdk() {
  const fromEnv =
    process.env.ANDROID_HOME?.trim() || process.env.ANDROID_SDK_ROOT?.trim() || '';
  const plat = os.platform();
  /** @type {string[]} */
  const candidates = [];
  const pushUnique = (c) => {
    if (!c) return;
    const n = path.resolve(c);
    if (!candidates.includes(n)) candidates.push(n);
  };

  pushUnique(fromEnv);
  if (plat === 'win32' && process.env.LOCALAPPDATA) {
    pushUnique(path.join(process.env.LOCALAPPDATA, 'Android', 'Sdk'));
  }
  if (plat === 'darwin') {
    pushUnique(path.join(os.homedir(), 'Library', 'Android', 'sdk'));
  }
  pushUnique(path.join(os.homedir(), 'Android', 'Sdk'));

  for (const c of candidates) {
    const platformTools = path.join(c, 'platform-tools');
    if (fs.existsSync(platformTools)) return c;
  }
  return null;
}

/**
 * Gradle accepts forward slashes; Windows paths need escaped colon sometimes — forward slashes alone work.
 */
function toGradleSdkDir(absoluteSdk) {
  return absoluteSdk.replace(/\\/g, '/');
}

/** @returns {boolean} wrote file */
export function writeLocalProperties(androidRoot) {
  const sdk = resolveAndroidSdk();
  if (!sdk) return false;
  const localProperties = path.join(androidRoot, 'local.properties');
  const line = `sdk.dir=${toGradleSdkDir(sdk)}\n`;
  fs.writeFileSync(localProperties, line, 'utf8');
  return true;
}

function main(cliArgs = process.argv.slice(2)) {
  const cmd = cliArgs[0];
  const sdk = resolveAndroidSdk();

  if (cmd === 'check') {
    if (!sdk) {
      console.error('check:android-sdk FAILED');
      console.error(HELP.trim());
      process.exit(1);
    }
    console.log('Android SDK:', sdk);
    process.exit(0);
  }

  if (cmd === 'write-local-properties') {
    const root = process.cwd();
    const androidDir = path.join(root, 'android');
    if (!fs.existsSync(path.join(androidDir, 'gradle.properties')) && !fs.existsSync(path.join(androidDir, 'gradlew'))) {
      console.error(`No "${path.join(process.cwd(), 'android')}" Expo android project. Run: npm run prebuild:android`);
      process.exit(1);
    }
    if (!sdk) {
      console.error('android:write-local-properties FAILED');
      console.error(HELP.trim());
      process.exit(1);
    }
    writeLocalProperties(androidDir);
    console.log('Wrote', path.join(androidDir, 'local.properties'), 'sdk.dir=' + toGradleSdkDir(sdk));
    process.exit(0);
  }

  if (cmd === 'which') {
    if (!sdk) {
      console.error(HELP.trim());
      process.exit(1);
    }
    console.log(sdk);
    process.exit(0);
  }

  console.error('Usage: node scripts/android-sdk.mjs check|which|write-local-properties');
  process.exit(cmd ? 2 : 2);
}

const __filename = fileURLToPath(import.meta.url);
if (path.resolve(process.argv[1] || '') === path.resolve(__filename)) {
  main();
}
