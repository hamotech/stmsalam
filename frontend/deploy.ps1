cd C:\Users\User\Downloads\STM\teh-tarik-app\frontend
Write-Host ""
Write-Host "=== STM SALAM - OPTIMIZED DEPLOY ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Step 1: Building production bundle..." -ForegroundColor Yellow
npm run build
Write-Host ""
Write-Host "Step 2: Selecting project stm-app-18a53..." -ForegroundColor Yellow
npx firebase use stm-app-18a53
Write-Host ""
Write-Host "Step 3: Deploying to Firebase Hosting..." -ForegroundColor Yellow
npx firebase deploy --only hosting --non-interactive
Write-Host ""
Write-Host "✅ DEPLOY COMPLETE!" -ForegroundColor Green
Write-Host "🌐 Live URL: https://stm-app-18a53.web.app" -ForegroundColor Green
Write-Host ""
