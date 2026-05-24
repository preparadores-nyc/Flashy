#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$script_dir"

timestamp="$(date +%F_%H%M%S)"
backup_root="backups"
backup_dir="$backup_root/backup-$timestamp"

mkdir -p "$backup_dir"

if command -v git >/dev/null 2>&1 && [ -d .git ]; then
  echo "Creando backup en $backup_dir usando git..."
  git ls-files -z --cached --others --exclude-standard | tar --null -T - -cf - | tar -C "$backup_dir" -xpf -
else
  echo "git no disponible o no es un repositorio Git; usando rsync para el backup..."
  if ! command -v rsync >/dev/null 2>&1; then
    echo "Error: ni git ni rsync están disponibles. Instale al menos uno para ejecutar este script." >&2
    exit 1
  fi
  rsync -a --exclude='node_modules' --exclude='.next' --exclude='.git' --exclude='backups' --exclude-from='.gitignore' ./ "$backup_dir/"
fi

printf "Backup completado: %s\n" "$backup_dir"
printf "Archivos excluidos: node_modules/, .next/, y patrones listados en .gitignore\n"
