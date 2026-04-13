cd C:\Users\User\Downloads\STM\teh-tarik-app
Write-Host ""
Write-Host "=== STM SALAM - FIREBASE DEPLOY ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Step 1: Logging into Firebase..." -ForegroundColor Yellow
firebase login
Write-Host ""
Write-Host "Step 2: Selecting project stm-app-18a53..." -ForegroundColor Yellow
firebase use stm-app-18a53
Write-Host ""
Write-Host "Step 3: Deploying to Firebase Hosting..." -ForegroundColor Yellow
firebase deploy --only hosting
Write-Host ""
Write-Host "✅ DEPLOY COMPLETE!" -ForegroundColor Green
Write-Host "🌐 Live URL: https://stm-app-18a53.web.app" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to close"
