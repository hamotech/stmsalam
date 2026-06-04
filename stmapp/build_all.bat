@echo off
setlocal

echo Generating Android Assets...
call npx @capacitor/assets generate --iconBackgroundColor "#013220" --splashBackgroundColor "#013220" --android
if errorlevel 1 exit /b %errorlevel%

echo Syncing Capacitor Android...
call npx cap sync android
if errorlevel 1 exit /b %errorlevel%

echo Building Release APK...
call .\build-prod-android.bat
if errorlevel 1 exit /b %errorlevel%

echo Building Release AAB...
call .\build-playstore-aab.bat
if errorlevel 1 exit /b %errorlevel%

echo All production builds completed successfully!
endlocal
