# Video Studio doctor (Windows): read-only check of everything the pipeline needs.
$ok = $true
function Row($name, $state, $info) { "{0,-22} {1,-8} {2}" -f $name, $state, $info; if ($state -ne "OK") { $script:ok = $false } }

if (Get-Command winget -ErrorAction SilentlyContinue) { Row "winget" "OK" "" } else { Row "winget" "MISSING" "Install App Installer from Microsoft Store" }

if (Get-Command node -ErrorAction SilentlyContinue) {
  $v = node -v; $major = [int]($v.TrimStart("v").Split(".")[0])
  if ($major -ge 22) { Row "Node.js" "OK" $v } else { Row "Node.js" "OLD" "$v (need 22+)" }
} else { Row "Node.js" "MISSING" "winget install OpenJS.NodeJS.22" }

if (Get-Command ffmpeg -ErrorAction SilentlyContinue) { Row "FFmpeg" "OK" ((ffmpeg -version | Select-Object -First 1).Split(" ")[2]) } else { Row "FFmpeg" "MISSING" "winget install Gyan.FFmpeg" }

$py = $env:HYPERFRAMES_PYTHON; if (-not $py) { $py = "$env:USERPROFILE\VideoStudio\.venv\Scripts\python.exe" }
$voiceOk = $false
if (Test-Path $py) { & $py -c "import kokoro_onnx, soundfile" 2>$null; $voiceOk = ($LASTEXITCODE -eq 0) }
if ($voiceOk) { Row "Voice engine" "OK" $py } else { Row "Voice engine" "MISSING" "venv with kokoro-onnx + soundfile; set HYPERFRAMES_PYTHON" }

$hv = npx -y hyperframes@0.8.216 --version 2>$null | Select-Object -Last 1
if ($hv) { Row "HyperFrames" "OK" $hv } else { Row "HyperFrames" "MISSING" "npx hyperframes" }

if (Get-Command claude -ErrorAction SilentlyContinue) {
  Row "Claude Code" "OK" (claude --version)
  if (claude plugin list 2>$null | Select-String "hyperframes@hyperframes") { Row "HyperFrames plugin" "OK" "" } else { Row "HyperFrames plugin" "MISSING" "claude plugin install hyperframes@hyperframes" }
} else { Row "Claude Code" "MISSING" "irm https://claude.ai/install.ps1 | iex" }

if (Test-Path "$env:USERPROFILE\.claude\skills\video-studio\SKILL.md") { Row "Video Studio skill" "OK" "" } else { Row "Video Studio skill" "MISSING" "copy video-studio-skill to ~/.claude/skills/video-studio" }

# Optional: never print the key, only whether it is set. Does not affect the result.
if ($env:OPENROUTER_API_KEY -or [Environment]::GetEnvironmentVariable("OPENROUTER_API_KEY", "User")) { "{0,-22} {1,-8} {2}" -f "OpenRouter key", "set", "(optional)" } else { "{0,-22} {1,-8} {2}" -f "OpenRouter key", "-", "optional, not set" }

if ($ok) { "All set."; exit 0 } else { "Some items need attention."; exit 1 }
