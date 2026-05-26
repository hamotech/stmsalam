@echo off
setlocal
cd /d "%~dp0"

echo.
echo === STMAPP fast Capacitor sync ===

node scripts\prepare-web-assets.cjs --skip-build
if errorlevel 1 exit /b %errorlevel%

call npx cap sync android
if errorlevel 1 exit /b %errorlevel%

echo.
echo Sync complete.
endlocal
