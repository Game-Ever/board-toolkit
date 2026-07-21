# Publishes the current version as a GitHub Release with the zip attached.
# Run via `npm run ship` (builds + zips first).
# Requires: gh authenticated, and the version commit already pushed (the tag
# points at remote main).
#
# NOTE: no `$ErrorActionPreference = 'Stop'` on purpose. On Windows PowerShell 5.1
# that turns any git/gh stderr output (e.g. "release not found", which is an
# EXPECTED result when probing) into a fatal error. We check $LASTEXITCODE instead.

$root = Split-Path -Parent $PSScriptRoot
$repo = 'Game-Ever/board-toolkit'
$pkg  = Get-Content (Join-Path $root 'package.json') -Raw | ConvertFrom-Json
$ver  = $pkg.version
$tag  = "v$ver"
$zip  = Join-Path $root "dist\BoardToolkit-v$ver.zip"

if (-not (Test-Path $zip)) {
  Write-Host "ERROR: zip not found: $zip  (run 'npm run release' first)"
  exit 1
}

# already published? (exit 0 = it exists)
gh release view $tag --repo $repo 2>$null | Out-Null
if ($LASTEXITCODE -eq 0) {
  Write-Host "ERROR: release $tag already exists on GitHub - bump the version first"
  exit 1
}

# the local commit must be the one on GitHub main, or the tag lands on an old version
$localHead  = (git rev-parse HEAD).Trim()
$remoteHead = ((git ls-remote 'https://github.com/Game-Ever/board-toolkit.git' main) -split "`t")[0]
if ($localHead -ne $remoteHead) {
  Write-Host "ERROR: local commit is not the one on GitHub main - push via Fork first"
  exit 1
}

$notes = "Board Toolkit $tag. Download BoardToolkit-v$ver.zip below, unzip, and run Board Toolkit.exe."

Write-Host "Publishing $tag ..."
gh release create $tag --repo $repo --target main --title "Board Toolkit $tag" --notes $notes "$zip#BoardToolkit-v$ver.zip"
if ($LASTEXITCODE -ne 0) {
  Write-Host "ERROR: gh release create failed (exit $LASTEXITCODE)"
  exit 1
}

Write-Host "Done: https://github.com/$repo/releases/tag/$tag"
