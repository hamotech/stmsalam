@echo off
setlocal
cd /d "%~dp0"

echo.
echo === STMAPP Android build + sync ===

call npm install
if errorlevel 1 exit /b %errorlevel%

node scripts\prepare-web-assets.cjs
if errorlevel 1 exit /b %errorlevel%

if not exist android (
  call npx cap add android
  if errorlevel 1 exit /b %errorlevel%
)

call npx cap sync android
if errorlevel 1 exit /b %errorlevel%

call node scripts\android-doctor.cjs
if errorlevel 1 (
  echo.
  echo Android project was prepared, but doctor found local SDK/JDK items to fix.
  echo Android Studio will still be opened if available so you can install/fix SDK components.
)

call npx cap open android
if errorlevel 1 exit /b %errorlevel%
endlocal
