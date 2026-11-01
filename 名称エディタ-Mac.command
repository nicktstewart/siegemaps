#!/bin/bash
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js がインストールされていません。開いたページからLTS版をインストールし、もう一度このファイルを開いてください。"
  open https://nodejs.org/ja/download
  read -r -p "Enterキーで閉じます"
  exit 1
fi
node scripts/editor.mjs || read -r -p "Enterキーで閉じます"
