const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const readline = require('readline');

const wrapperDir = path.resolve(__dirname, '..');
const androidDir = path.join(wrapperDir, 'android');
const keystoreDir = path.join(androidDir, 'keystores');
const keystoreFile = path.join(keystoreDir, 'stmapp-release.jks');
const propertiesFile = path.join(androidDir, 'keystore.properties');

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.status !== 0) process.exit(result.status || 1);
}

async function main() {
  fs.mkdirSync(keystoreDir, { recursive: true });

  const keyAlias = process.env.STMAPP_KEY_ALIAS || await ask('Key alias [stmapp]: ') || 'stmapp';
  const storePassword = process.env.STMAPP_STORE_PASSWORD || await ask('Keystore password: ');
  const keyPassword = process.env.STMAPP_KEY_PASSWORD || await ask('Key password (Enter to reuse keystore password): ') || storePassword;

  if (!storePassword || storePassword.length < 6 || !keyPassword || keyPassword.length < 6) {
    throw new Error('Keystore and key passwords must be at least 6 characters.');
  }

  if (!fs.existsSync(keystoreFile)) {
    run('keytool', [
      '-genkeypair',
      '-v',
      '-keystore', keystoreFile,
      '-alias', keyAlias,
      '-keyalg', 'RSA',
      '-keysize', '2048',
      '-validity', '10000',
      '-storepass', storePassword,
      '-keypass', keyPassword,
      '-dname', 'CN=STMAPP,OU=STMSalam,O=STMSalam,C=SG',
    ], androidDir);
  } else {
    console.log(`[keystore] Reusing existing keystore: ${keystoreFile}`);
  }

  const relStoreFile = path.relative(androidDir, keystoreFile).replace(/\\/g, '/');
  fs.writeFileSync(propertiesFile, [
    `storeFile=${relStoreFile}`,
    `storePassword=${storePassword}`,
    `keyAlias=${keyAlias}`,
    `keyPassword=${keyPassword}`,
    '',
  ].join('\n'));

  console.log(`[keystore] Wrote local signing config: ${propertiesFile}`);
  console.log('[keystore] Keep this keystore and password safe. Losing them breaks future app updates.');
}

main().catch((err) => {
  console.error(`[keystore] ${err.message}`);
  process.exit(1);
});
