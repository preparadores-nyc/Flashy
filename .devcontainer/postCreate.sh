#!/usr/bin/env bash
set -euo pipefail

npm install

if [ -f .env.example ] && [ ! -f .env ]; then
  cp .env.example .env
fi

echo "Codespace ready. Configure DATABASE_URL and JWT_SECRET in GitHub Codespaces secrets."
