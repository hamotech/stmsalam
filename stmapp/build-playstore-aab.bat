@echo off
setlocal
cd /d "%~dp0"

echo.
echo === STMAPP signed Play Store release ===

if not exist android\keystore.properties (
  echo Missing android\keystore.properties.
  echo Run create-release-keystore.bat first.
  exit /b 1
)

call npm install
if errorlevel 1 exit /b %errorlevel%

call npx cap sync android
if errorlevel 1 exit /b %errorlevel%

node scripts\build-play-release.cjs
if errorlevel 1 exit /b %errorlevel%

echo.
echo Play Store AAB ready:
echo %~dp0dist\android\STMAPP-playstore-release.aab
echo.
echo Optional signed APK:
echo %~dp0dist\android\STMAPP-signed-release.apk
endlocal
