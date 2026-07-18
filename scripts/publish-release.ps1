# Publishes the current version as a GitHub Release with the zip attached.
# Run via `npm run ship` (builds + zips first).
# Requires: gh authenticated, and the version commit already pushed (the tag
# points at remote main).
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$repo = 'Game-Ever/board-toolkit'
$pkg  = Get-Content (Join-Path $root 'package.json') -Raw | ConvertFrom-Json
$ver  = $pkg.version
$tag  = "v$ver"
$zip  = Join-Path $root "dist\BoardToolkit-v$ver.zip"

if (-not (Test-Path $zip)) {
  Write-Error "zip not found: $zip  (run 'npm run release' first)"
  exit 1
}

# don't clobber an existing release
gh release view $tag --repo $repo 1>$null 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Error "release $tag already exists on GitHub - bump the version first"
  exit 1
}

# make sure the local commit is the one on GitHub (otherwise the tag lands on an old version)
$localHead = (git rev-parse HEAD).Trim()
$remote    = git ls-remote 'https://github.com/Game-Ever/board-toolkit.git' main
$remoteHead = ($remote -split "`t")[0]
if ($localHead -ne $remoteHead) {
  Write-Warning 'Local commit is not the one on GitHub main - push via Fork first. Aborting.'
  exit 1
}

$notes = "Board Toolkit $tag. Download BoardToolkit-v$ver.zip below, unzip, and run Board Toolkit.exe."
$asset = "$zip#BoardToolkit-v$ver.zip"

Write-Output "Publishing $tag ..."
gh release create $tag --repo $repo --target main --title "Board Toolkit $tag" --notes $notes $asset

Write-Output "Done: https://github.com/$repo/releases/tag/$tag"
