#!/bin/bash
set -euo pipefail

# Navigate to the correct project directory
cd /home/kavia/workspace/code-generation/Alumni-app/alumni_frontend

# Install dependencies if missing
if [ ! -d "node_modules" ]; then
  npm ci --no-audit --no-fund || npm install --no-audit --no-fund
fi

# Run a non-interactive build to validate code (do not fail on warnings)
CI=false npm run build
