import { execFileSync } from 'node:child_process';

const files = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' }).split('\0').filter(Boolean);
const forbidden = files.filter((file) => /^(private-docs|maps)\//i.test(file) || /(^|\/)\.env(\.|$)/i.test(file) && !file.endsWith('.env.example') || /(^|\/)sternab-permission-dm\.png$/i.test(file));
if (forbidden.length) {
  console.error('Private material cannot be committed:\n' + forbidden.join('\n'));
  process.exit(1);
}
console.log('Public file boundary passed.');
