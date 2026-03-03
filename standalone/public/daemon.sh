#!/bin/sh
set -e

echo "==========================================="
echo " Installing NextDeploy Daemon..."
echo "==========================================="

OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m)"

if [ "$OS" != "linux" ]; then
    echo "Error: The NextDeploy Daemon only runs on Linux servers."
    exit 1
fi

case "$ARCH" in
  x86_64) ARCH="amd64" ;;
  aarch64|arm64) ARCH="arm64" ;;
  *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
esac

REPO="Golangcodes/nextdeploy"
BIN_NAME="nextdeployd"
INSTALL_DIR="/usr/local/bin"

echo "Detected OS: linux"
echo "Detected Architecture: $ARCH"

LATEST_TAG=$(curl -fsSL "https://api.github.com/repos/$REPO/releases/latest" | grep -o '"tag_name": *"[^"]*"' | cut -d '"' -f 4)

if [ -z "$LATEST_TAG" ]; then
    echo "Error: Could not fetch the latest release tag. Check your internet connection."
    exit 1
fi

echo "Latest Version: $LATEST_TAG"

# Asset naming: nextdeployd-linux-amd64 or nextdeployd-linux-arm64
ASSET_NAME="${BIN_NAME}-linux-${ARCH}"
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
echo "✅ NextDeploy Daemon ($LATEST_TAG) installed!"
echo "The daemon will be managed by 'nextdeploy prepare' and 'nextdeploy ship'."
echo "==========================================="
