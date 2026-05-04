/**
 * Uses static app.json via Expo's `({ config })` — do not duplicate app.json elsewhere.
 * Optional Firebase native configs when files exist.
 */

const fs = require('fs');
const path = require('path');

module.exports = ({ config }) => {
  const gAndroid = path.join(__dirname, 'google-services.json');
  if (fs.existsSync(gAndroid)) {
    config.android = { ...(config.android || {}), googleServicesFile: './google-services.json' };
  }

  const gIos = path.join(__dirname, 'GoogleService-Info.plist');
  if (fs.existsSync(gIos)) {
    config.ios = { ...(config.ios || {}), googleServicesFile: './GoogleService-Info.plist' };
  }

  return config;
};
