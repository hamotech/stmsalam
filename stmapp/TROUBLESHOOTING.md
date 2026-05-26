# STMAPP Android Troubleshooting

Use this when `build-android.bat`, `auto-sync.bat`, or `build-prod-android.bat` reports a problem.

## Quick Health Check

```bat
cd stmapp
node scripts\android-doctor.cjs
```

The doctor checks Capacitor config, prepared web assets, Android project, Internet permission, cleartext support, Android Studio, Java, and Android SDK environment variables.

## White Screen On Android

Cause: missing or stale web assets.

Fix:

```bat
cd stmapp
node scripts\prepare-web-assets.cjs
npx cap sync android
```

Confirm these files exist:

```text
stmapp/stmapp/index.html
stmapp/stmapp/assets/
stmapp/stmapp/.vite/manifest.json
```

## API Fetch Failure

Emulator builds use:

```text
http://10.0.2.2:5000/api
```

Start the backend from the project root:

```bat
npm run dev:backend
```

For a real phone on the same Wi-Fi, rebuild with your computer LAN IP:

```bat
cd stmapp
set VITE_CAPACITOR_API_URL=http://YOUR_COMPUTER_LAN_IP:5000/api
build-android.bat
```

## CORS Blocked

The backend already uses CORS and allows emulator, localhost, and Firebase Hosting. For real devices, add your LAN origin:

```bat
set ALLOWED_ORIGIN=http://YOUR_COMPUTER_LAN_IP:5000
npm run dev:backend
```

## Backend Inaccessible

The backend must bind to all interfaces:

```js
app.listen(5000, '0.0.0.0')
```

This is already configured in `backend/index.js`.

## Android Project Missing

Fix:

```bat
cd stmapp
npx cap add android
npx cap sync android
```

If the Android folder is corrupted, close Android Studio, delete `stmapp/android`, then run:

```bat
build-android.bat
```

## Capacitor Sync Failed

Fix:

```bat
cd stmapp
node scripts\prepare-web-assets.cjs
npx cap sync android
```

If sync still fails, delete `android` and regenerate:

```bat
rmdir /s /q android
npx cap add android
npx cap sync android
```

## Missing Permissions Or Cleartext Blocked

Confirm `android/app/src/main/AndroidManifest.xml` contains:

```xml
<uses-permission android:name="android.permission.INTERNET" />
android:usesCleartextTraffic="true"
android:networkSecurityConfig="@xml/network_security_config"
```

Then sync:

```bat
npx cap sync android
```

## Android SDK Missing

Install Android Studio and add SDK API 33 or 34 from SDK Manager. Set one environment variable:

```bat
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx ANDROID_SDK_ROOT "%LOCALAPPDATA%\Android\Sdk"
```

Restart the terminal after setting variables.

## PKIX Certificate Error During Gradle Download

Error example:

```text
PKIX path building failed
certificate_unknown
```

Fix:

1. Install JDK 17.
2. Set `JAVA_HOME` to the JDK 17 folder.
3. Restart the terminal.
4. Open Android Studio once and allow Gradle to download.
5. Re-run:

```bat
build-prod-android.bat
```

## Release APK Missing

Run:

```bat
cd stmapp
build-prod-android.bat
```

Expected output:

```text
stmapp/dist/android/STMAPP-release.apk
```

For Play Store upload, configure release signing in Android Studio. The generated release APK is unsigned until signing config is added.
