@echo off
setlocal
cd /d "%~dp0"

echo.
echo === STMAPP release keystore setup ===
echo This creates android\keystores\stmapp-release.jks and android\keystore.properties.
echo Keep both safe and do not commit them.
echo.

node scripts\create-release-keystore.cjs
if errorlevel 1 exit /b %errorlevel%

echo.
echo Keystore setup complete.
endlocal
