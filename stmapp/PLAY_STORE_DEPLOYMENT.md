# STMAPP Play Store Deployment

## Architecture

STMAPP is a Capacitor Android shell that loads the live hosted website:

```text
https://teh-tarik-app-my-own.web.app
```

Because the app loads the hosted site, normal website updates appear in the Android app without a Play Store update. A Play Store update is only needed when changing native Android items such as app icon, splash screen, permissions, package id, signing, or native plugins.

## Production Capacitor Config

`capacitor.config.json`:

```json
{
  "appId": "com.stmsalam.app",
  "appName": "STMAPP",
  "webDir": "stmapp",
  "server": {
    "url": "https://teh-tarik-app-my-own.web.app",
    "androidScheme": "https",
    "cleartext": false
  }
}
```

## Android Network Policy

Production uses HTTPS only:

```xml
android:usesCleartextTraffic="false"
android:networkSecurityConfig="@xml/network_security_config"
```

`network_security_config.xml`:

```xml
<network-security-config>
    <base-config cleartextTrafficPermitted="false" />
</network-security-config>
```

## Icon And Splash

Current native icons and splash assets live under:

```text
android/app/src/main/res/mipmap-*/
android/app/src/main/res/drawable*/splash.png
```

Recommended source assets:

```text
resources/icon.png      1024x1024 PNG
resources/splash.png    2732x2732 PNG
```

When local npm certificate trust is fixed, install and run Capacitor Assets:

```bat
cd stmapp
npm install --save-dev @capacitor/assets
npx capacitor-assets generate --android
npx cap sync android
```

## Create Release Keystore

Run once:

```bat
cd stmapp
create-release-keystore.bat
```

This creates:

```text
android/keystores/stmapp-release.jks
android/keystore.properties
```

Do not lose these files. Android app updates require the same key.

## Build Signed Play Store AAB

```bat
cd stmapp
build-playstore-aab.bat
```

Output:

```text
dist/android/STMAPP-playstore-release.aab
dist/android/STMAPP-signed-release.apk
```

Upload the `.aab` to Play Console. Use the APK only for direct testing.

## Play Console Upload Steps

1. Open Google Play Console.
2. Create app.
3. App name: `STMAPP`.
4. Default language: English.
5. App type: App.
6. Category: Food & Drink.
7. Complete app access, ads, content rating, target audience, data safety, privacy policy, and store listing.
8. Go to Production, Internal testing, or Closed testing.
9. Create a release.
10. Upload `dist/android/STMAPP-playstore-release.aab`.
11. Add release notes.
12. Review and roll out.

## Store Listing Assets

Prepare:

- App icon: 512x512 PNG.
- Feature graphic: 1024x500 PNG.
- Phone screenshots: at least 2.
- Short description: up to 80 characters.
- Full description: up to 4000 characters.
- Privacy policy URL.

Suggested short description:

```text
Order STM Salam food, drinks, and delivery from your phone.
```

## Future Website Updates

Deploy website changes to Firebase Hosting:

```bat
cd frontend
npm run build
npx firebase-tools deploy --only hosting --project teh-tarik-app-my-own
```

The Android app will show the updated website automatically on next app launch/reload because it loads the live URL.

## Production Checklist

- `https://teh-tarik-app-my-own.web.app` loads publicly.
- Login works on hosted website.
- Menu, cart, checkout, and order tracking work on hosted website.
- Android app opens the hosted website.
- App icon and splash are final.
- Signed AAB builds successfully.
- Privacy policy is live.
- Keystore is backed up securely.
