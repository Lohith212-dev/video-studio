#!/usr/bin/env bash
# Video Studio doctor (macOS/Linux): read-only check of everything the pipeline needs.
# Prints one line per item: OK / MISSING / OLD, then exits 0 if all OK, 1 otherwise.
ok=1
row() { printf "%-22s %-8s %s\n" "$1" "$2" "$3"; [ "$2" = OK ] || ok=0; }

if command -v brew >/dev/null 2>&1; then row "Homebrew" OK "$(brew --version | head -1)"; else row "Homebrew" MISSING "https://brew.sh"; fi

if command -v node >/dev/null 2>&1; then
  v=$(node -v); major=${v#v}; major=${major%%.*}
  if [ "$major" -ge 22 ]; then row "Node.js" OK "$v"; else row "Node.js" OLD "$v (need 22+)"; fi
else row "Node.js" MISSING "brew install node@22"; fi

if command -v ffmpeg >/dev/null 2>&1; then row "FFmpeg" OK "$(ffmpeg -version | head -1 | cut -d' ' -f3)"; else row "FFmpeg" MISSING "brew install ffmpeg"; fi

py="${HYPERFRAMES_PYTHON:-$HOME/VideoStudio/.venv/bin/python}"
if [ -x "$py" ] && "$py" -c "import kokoro_onnx, soundfile" >/dev/null 2>&1; then row "Voice engine" OK "$py"
else row "Voice engine" MISSING "venv with kokoro-onnx + soundfile; set HYPERFRAMES_PYTHON"; fi

if command -v npx >/dev/null 2>&1 && hv=$(npx -y hyperframes@0.8.216 --version 2>/dev/null | tail -1); then row "HyperFrames" OK "$hv"; else row "HyperFrames" MISSING "npx hyperframes"; fi

if command -v claude >/dev/null 2>&1; then
  row "Claude Code" OK "$(claude --version 2>/dev/null)"
  if claude plugin list 2>/dev/null | grep -q "hyperframes@hyperframes"; then row "HyperFrames plugin" OK ""; else row "HyperFrames plugin" MISSING "claude plugin install hyperframes@hyperframes"; fi
else row "Claude Code" MISSING "curl -fsSL https://claude.ai/install.sh | bash"; fi

if [ -f "$HOME/.claude/skills/video-studio/SKILL.md" ]; then row "Video Studio skill" OK "~/.claude/skills/video-studio"; else row "Video Studio skill" MISSING "copy video-studio-skill to ~/.claude/skills/video-studio"; fi

# Optional: never print the key, only whether it is set. Does not affect the result.
if [ -n "${OPENROUTER_API_KEY:-}" ] || grep -q "OPENROUTER_API_KEY" "$HOME/.zshrc" 2>/dev/null; then printf "%-22s %-8s %s\n" "OpenRouter key" "set" "(optional)"; else printf "%-22s %-8s %s\n" "OpenRouter key" "-" "optional, not set"; fi

[ $ok = 1 ] && { echo "All set."; exit 0; } || { echo "Some items need attention."; exit 1; }
