#!/bin/sh
set -e

echo "==========================================="
echo " Installing NextDeploy CLI..."
echo "==========================================="

OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m)"

case "$ARCH" in
  x86_64) ARCH="amd64" ;;
  aarch64|arm64) ARCH="arm64" ;;
  *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
esac

# macOS reports as 'darwin', Linux as 'linux'
case "$OS" in
  darwin|linux) ;;
  *) echo "Unsupported OS: $OS. Use install.bat for Windows."; exit 1 ;;
esac

REPO="Golangcodes/nextdeploy"
BIN_NAME="nextdeploy"
INSTALL_DIR="/usr/local/bin"

echo "Detected OS: $OS"
echo "Detected Architecture: $ARCH"

LATEST_TAG=$(curl -fsSL "https://api.github.com/repos/$REPO/releases/latest" | grep -o '"tag_name": *"[^"]*"' | cut -d '"' -f 4)

if [ -z "$LATEST_TAG" ]; then
    echo "Error: Could not fetch the latest release tag. Check your internet connection."
    exit 1
fi

echo "Latest Version: $LATEST_TAG"

# Asset naming: nextdeploy-linux-amd64 or nextdeploy-darwin-arm64
ASSET_NAME="${BIN_NAME}-${OS}-${ARCH}"
DOWNLOAD_URL="https://github.com/$REPO/releases/download/$LATEST_TAG/$ASSET_NAME"

echo "Downloading $ASSET_NAME..."
curl -fsSL "$DOWNLOAD_URL" -o "/tmp/$BIN_NAME"

chmod +x "/tmp/$BIN_NAME"

echo "Installing to $INSTALL_DIR/$BIN_NAME..."
if [ -w "$INSTALL_DIR" ]; then
    mv "/tmp/$BIN_NAME" "$INSTALL_DIR/$BIN_NAME"
else
    sudo mv "/tmp/$BIN_NAME" "$INSTALL_DIR/$BIN_NAME"
fi

echo "==========================================="
echo "✅ NextDeploy CLI ($LATEST_TAG) installed!"
echo "Run: nextdeploy --help"
echo "==========================================="
