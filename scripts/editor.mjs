import { spawn, spawnSync } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const windows = process.platform === 'win32';
const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 12)) {
  console.error(`Node.js 22.12以降が必要です（現在 ${process.versions.node}）。https://nodejs.org/ja/download から最新のLTS版をインストールしてください。`);
  process.exit(1);
}

const installed = path.join(root, 'node_modules', '.package-lock.json');
if (!existsSync(installed) || statSync(path.join(root, 'package-lock.json')).mtimeMs > statSync(installed).mtimeMs) {
  console.log('初回の準備をしています（数分かかります）…');
  const result = spawnSync('npm', ['ci'], { cwd: root, stdio: 'inherit', shell: windows });
  if (result.status !== 0) { console.error('準備に失敗しました。インターネット接続を確認してから、もう一度開いてください。'); process.exit(1); }
}

function freePort(port) {
  return new Promise((resolve) => {
    const server = net.createServer().once('error', () => resolve(freePort(port + 1))).once('listening', () => server.close(() => resolve(port)));
    server.listen(port, '127.0.0.1');
  });
}
const port = await freePort(3200);
const url = `http://127.0.0.1:${port}/editor`;
console.log('名称エディタを起動しています…');
const server = spawn('npm', ['run', 'dev', '--workspace=@siegemaps/web', '--', '-p', String(port), '-H', '127.0.0.1'], { cwd: root, stdio: ['inherit', 'ignore', 'inherit'], shell: windows });
server.on('exit', (code) => process.exit(code ?? 0));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.kill(signal));

for (let attempt = 0; attempt < 300; attempt++) {
  const ready = await fetch(url).then((response) => response.ok, () => false);
  if (ready) break;
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
if (windows) spawn('cmd', ['/c', 'start', '', url], { stdio: 'ignore', detached: true }).unref();
else spawn(process.platform === 'darwin' ? 'open' : 'xdg-open', [url], { stdio: 'ignore', detached: true }).unref();
console.log(`\n名称エディタ：${url}\n使い終わったら、このウィンドウを閉じてください。`);
