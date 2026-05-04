# One-shot local release APK: requires Android Studio SDK (JDK 17) and ANDROID_HOME.
# Usage (from repo root): pwsh -File ./scripts/android-gradle-release.ps1
# Or: npm run android:assemble:release

$ErrorActionPreference = "Stop"
# stm-mobile/ (where android/ and package.json live)
$root = Split-Path $PSScriptRoot -Parent
$androidDir = Join-Path $root "android"
$gradlew = Join-Path $androidDir "gradlew.bat"

if (-not (Test-Path $gradlew)) {
  Write-Host "No android/ project. Run: npx expo prebuild --platform android"
  exit 1
}

$sdkTool = Join-Path $PSScriptRoot "android-sdk.mjs"
$sdk = & node $sdkTool which
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($sdk)) {
  Write-Error "Android SDK not found. Run: npm run check:android-sdk   (or set ANDROID_HOME / install Android Studio SDK). See android-sdk.example.properties."
  exit 1
}

# Gradle expects forward slashes in sdk.dir
$sdkPosix = $sdk -replace "\\", "/"
"sdk.dir=$sdkPosix" | Set-Content -Path (Join-Path $androidDir "local.properties") -Encoding utf8
Write-Host "Wrote local.properties: sdk.dir=$sdkPosix"

Set-Location $androidDir
& .\gradlew.bat assembleRelease
exit $LASTEXITCODE
