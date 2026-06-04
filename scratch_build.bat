@echo off
setlocal

echo Copying frontend build...
if exist stmapp\stmapp rd /s /q stmapp\stmapp
xcopy /E /I /Y frontend\dist stmapp\stmapp >nul

echo Syncing Capacitor...
cd stmapp
call npx cap sync android
if errorlevel 1 exit /b %errorlevel%

echo Building Production APK...
call build-prod-android.bat

echo Done!
endlocal
