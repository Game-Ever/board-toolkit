# Packages dist/win-unpacked into dist/BoardToolkit-v<version>.zip
# with a clean top-level "Board Toolkit" folder. Run: npm run zip
$ErrorActionPreference = 'Stop'
$root  = Split-Path -Parent $PSScriptRoot
$pkg   = Get-Content (Join-Path $root 'package.json') -Raw | ConvertFrom-Json
$ver   = $pkg.version
$src   = Join-Path $root 'dist\win-unpacked'
$stage = Join-Path $root 'dist\Board Toolkit'
$zip   = Join-Path $root ("dist\BoardToolkit-v$ver.zip")

Stop-Process -Name 'Board Toolkit' -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 1

if (Test-Path $stage) { Remove-Item -Recurse -Force $stage }
# clear older zips: dist/ should only ever hold "the one to send"
Get-ChildItem (Join-Path $root 'dist') -Filter 'BoardToolkit-v*.zip' -ErrorAction SilentlyContinue |
  Remove-Item -Force -ErrorAction SilentlyContinue

Copy-Item -Recurse $src $stage
Compress-Archive -Path $stage -DestinationPath $zip -CompressionLevel Optimal
Remove-Item -Recurse -Force $stage

$z = Get-Item $zip
Write-Output ("ZIP: " + $z.FullName)
Write-Output ("SIZE_MB: " + [math]::Round($z.Length / 1MB, 1))
