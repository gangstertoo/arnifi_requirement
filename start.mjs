#!/usr/bin/env node

import { spawn } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDir = path.join(__dirname, 'client');
const clientDistDir = path.join(clientDir, 'dist');

async function main() {
  console.log('Starting Blog App (consolidated)...\n');

  // Check if dist folder exists, if not build it
  if (!existsSync(clientDistDir)) {
    console.log('Building frontend...');

    await buildFrontend();
  }

  startServer();
}

function buildFrontend() {
  return new Promise((resolve, reject) => {
    const buildProcess = spawn('npm', ['run', 'build'], {
      cwd: clientDir,
      stdio: 'inherit',
      shell: true
    });

    buildProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Frontend build failed');
        process.exit(1);
      }
      console.log('Frontend build complete\n');
      resolve();
    });

    buildProcess.on('error', (err) => {
      console.error('Build process error:', err);
      reject(err);
    });
  });
}

function startServer() {
  console.log('Starting backend server...\n');

  const serverProcess = spawn('node', ['server/src/server.js'], {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });

  serverProcess.on('error', (err) => {
    console.error('Server process error:', err);
    process.exit(1);
  });

  serverProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Server exited with code:', code);
      process.exit(code);
    }
  });
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
