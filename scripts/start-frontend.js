const { execFileSync, spawn } = require('child_process');
const path = require('path');

const port = 3000;

function reclaimPort(port) {
  try {
    const output = execFileSync(
      'powershell',
      [
        '-NoProfile',
        '-Command',
        `$listener = Get-NetTCPConnection -LocalPort ${port} -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1; if ($listener) { $listener.OwningProcess }`,
      ],
      {
        encoding: 'utf8',
        windowsHide: true,
      }
    );

    const pids = output
      .split(/\r?\n/)
      .map((line) => Number.parseInt(line.trim(), 10))
      .filter((pid) => Number.isInteger(pid) && pid > 0);

    for (const pid of pids) {
      execFileSync('taskkill', ['/PID', String(pid), '/F'], {
        stdio: 'ignore',
        windowsHide: true,
      });
    }
  } catch {
    // If the port is already free or the listener cannot be queried, keep going.
  }
}

async function main() {
  reclaimPort(port);

  const env = Object.fromEntries(
    Object.entries(process.env).filter(([, value]) => typeof value === 'string')
  );

  env.PORT = String(port);
  env.CI = 'true';

  const reactScriptsBin = path.join(
    __dirname,
    '..',
    'frontend',
    'node_modules',
    'react-scripts',
    'bin',
    'react-scripts.js'
  );

  const child = spawn(process.execPath, [reactScriptsBin, 'start'], {
    stdio: 'inherit',
    env,
    cwd: path.join(__dirname, '..', 'frontend'),
  });

  child.on('exit', (code) => {
    process.exit(code === null ? 1 : code);
  });

  child.on('error', (error) => {
    console.error(error);
    process.exit(1);
  });
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});