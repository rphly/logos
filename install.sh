#!/usr/bin/env bash
set -euo pipefail

INSTALL_DIR="${INSTALL_DIR:-/usr/local/bin}"

echo "Installing logos to $INSTALL_DIR..."
cp bin/logos "$INSTALL_DIR/logos"
chmod +x "$INSTALL_DIR/logos"
echo "Done. Run 'logos <project-name>' to create a research project."
