@echo off
chcp 65001 >nul
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Install the LTS version from the page that opens, then open this file again.
  echo Node.js がインストールされていません。開いたページからLTS版をインストールし、もう一度このファイルを開いてください。
  start "" https://nodejs.org/ja/download
  pause
  exit /b 1
)
node scripts\editor.mjs
if errorlevel 1 pause
