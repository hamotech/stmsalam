@echo off
setlocal

rem ----------------------------------------------------
rem 1. Install frontend dependencies (frontend)
rem ----------------------------------------------------
pushd frontend
if exist node_modules (
    echo Deleting existing node_modules for a clean install...
    rd /s /q node_modules
)
npm install --legacy-peer-deps
if errorlevel 1 (
    echo *** npm install failed. aborting.& popd & exit /b 1
)
rem ----------------------------------------------------
rem 2. Build Vite production bundle
rem ----------------------------------------------------
npm run build
if errorlevel 1 (
    echo *** Vite build failed. aborting.& popd & exit /b 1
)
popd

rem ----------------------------------------------------
rem 3. Copy built assets to Capacitor webDir (stmapp/stmapp)
rem ----------------------------------------------------
if exist stmapp\stmapp rd /s /q stmapp\stmapp
xcopy /E /I frontend\dist stmapp\stmapp >nul
if errorlevel 1 (
    echo *** Copying assets failed. aborting.& exit /b 1
)

rem ----------------------------------------------------
rem 4. Initialise Capacitor wrapper (stmapp)
rem ----------------------------------------------------
pushd stmapp
if not exist package.json (
    echo Initialising npm for Capacitor wrapper...
    npm init -y >nul
)
npm install @capacitor/core @capacitor/cli @capacitor/android --save-dev
if errorlevel 1 (
    echo *** Capacitor package install failed. aborting.& popd & exit /b 1
)
rem Create/overwrite capacitor.config.json
> capacitor.config.json (
    echo {^"appId^": ^"com.stmsalam.app^",^"appName^": ^"STMAPP^",^"webDir^": ^"stmapp^",^"server^": {^"androidScheme^": ^"http^",^"hostname^": ^"10.0.2.2^",^"cleartext^": true}}
)
rem Initialise Capacitor if not already
if not exist ios (
    npx cap init stmapp com.stmsalam.app
)
rem Add Android platform if missing
if not exist android (
    npx cap add android
)
rem Sync Capacitor assets
npx cap sync android
if errorlevel 1 (
    echo *** Capacitor sync failed. aborting.& popd & exit /b 1
)
popd

rem ----------------------------------------------------
rem 5. Open Android Studio
rem ----------------------------------------------------
pushd stmapp
npx cap open android
popd

echo ----------------------------------------------------
echo ✅   Android build pipeline completed successfully.
echo ----------------------------------------------------
endlocal
