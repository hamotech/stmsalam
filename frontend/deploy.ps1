Set-Location $PSScriptRoot

# Low parallel uploads reduce timeouts / auth flakes on Windows (override by setting the env var yourself).
$env:FIREBASE_HOSTING_UPLOAD_CONCURRENCY = if ($env:FIREBASE_HOSTING_UPLOAD_CONCURRENCY) { $env:FIREBASE_HOSTING_UPLOAD_CONCURRENCY } else { '3' }
Write-Host "FIREBASE_HOSTING_UPLOAD_CONCURRENCY=$($env:FIREBASE_HOSTING_UPLOAD_CONCURRENCY)" -ForegroundColor DarkGray

Write-Host ""
Write-Host "=== STM SALAM - DEPLOY (Firebase project: teh-tarik-app-my-own) ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Step 1: Building production bundle..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Step 2: Selecting project teh-tarik-app-my-own..." -ForegroundColor Yellow
npx firebase use teh-tarik-app-my-own
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Step 3: Clearing local Firebase cache (avoids Hosting uploader paths[1] errors)..." -ForegroundColor Yellow
if (Test-Path .firebase) {
  Remove-Item -Recurse -Force .firebase
}

Write-Host ""
Write-Host "Step 4: Deploying to Firebase Hosting..." -ForegroundColor Yellow
npx firebase deploy --only hosting --non-interactive
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "DEPLOY COMPLETE!" -ForegroundColor Green
Write-Host "Live URL: https://teh-tarik-app-my-own.web.app" -ForegroundColor Green
Write-Host ""
