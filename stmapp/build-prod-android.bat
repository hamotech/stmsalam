@echo off
setlocal
cd /d "%~dp0"

echo.
echo === STMAPP production release APK ===

call npm install
if errorlevel 1 exit /b %errorlevel%

node scripts\build-release-apk.cjs
if errorlevel 1 exit /b %errorlevel%

echo.
echo Release APK ready at:
echo %~dp0dist\android\STMAPP-release.apk
endlocal
