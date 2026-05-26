# STMAPP Android Deployment Guide

This folder wraps the Vite frontend as a Capacitor Android app.

## One-Click Commands

Run from `stmapp`:

```bat
build-android.bat
```

What it does:
- Installs wrapper dependencies.
- Builds `../frontend`.
- Copies `../frontend/dist` to `stmapp/stmapp`.
- Creates Android platform if missing.
- Syncs Capacitor.
- Opens Android Studio.

Fast sync after a frontend rebuild:

```bat
auto-sync.bat
```

Production release APK:

```bat
build-prod-android.bat
```

Output:

```text
stmapp/dist/android/STMAPP-release.apk
```

## API Behavior

The frontend automatically uses:

- Capacitor/Android emulator: `http://10.0.2.2:5000/api`
- Local browser dev: `http://localhost:5000/api`
- Hosted production web: `https://teh-tarik-app-k4w4.onrender.com/api`

For a real Android device on the same Wi-Fi as your computer, set:

```bat
set VITE_CAPACITOR_API_URL=http://YOUR_COMPUTER_LAN_IP:5000/api
build-android.bat
```

The backend is configured with CORS, JSON parsing, and `0.0.0.0` binding.

## Android Requirements

Install Android Studio, then in SDK Manager install:

- Android SDK Platform 33 or 34
- Android SDK Build-Tools
- Android SDK Platform-Tools
- Android Emulator
- JDK 17 configured as `JAVA_HOME`

Make sure one of these environment variables points to the SDK:

- `ANDROID_HOME`
- `ANDROID_SDK_ROOT`

## Troubleshooting

White screen:
- Run `node scripts\prepare-web-assets.cjs`.
- Confirm `stmapp\stmapp\index.html` exists.
- Run `npx cap sync android`.

API request failure:
- Emulator uses `http://10.0.2.2:5000/api`.
- Start backend from repo root with `npm run dev:backend`.
- For real devices, rebuild with `VITE_CAPACITOR_API_URL` set to your LAN IP.

CORS blocked:
- Backend already allows `http://10.0.2.2`, localhost, and Firebase Hosting.
- Add your LAN origin to `ALLOWED_ORIGIN` if needed.

Missing Android project:

```bat
npx cap add android
npx cap sync android
```

Broken Gradle or SDK:
- Open Android Studio once and let it install recommended Gradle/JDK/SDK components.
- Run `node scripts\android-doctor.cjs`.
- If Gradle download fails with `PKIX path building failed`, install JDK 17, set `JAVA_HOME`, restart the terminal, then let Android Studio download Gradle once.

Manifest or permission issues:
- Run `npx cap sync android`.
- Confirm Android manifest includes `INTERNET` and cleartext traffic.

## Release Notes

`assembleRelease` creates an unsigned release APK unless signing config is added in Android Studio. For Play Store, create a signing key and configure release signing in `android/app/build.gradle`.
