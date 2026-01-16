#!/usr/bin/env node

import { spawn } from 'child_process';
import { cpSync, rmSync, existsSync, copyFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.dirname(__dirname);

const buildDir = path.join(rootDir, 'build');
const clientDir = path.join(rootDir, 'client');
const serverDir = path.join(rootDir, 'server');

async function build() {
  console.log('Building production bundle...\n');

  // Step 0: Install client dependencies
  console.log('Installing frontend dependencies...');
  await installClientDependencies();

  // Step 1: Build frontend
  console.log('Building frontend...');
  await buildFrontend();

  // Step 2: Clean old build folder
  console.log('Cleaning old build folder...');
  if (existsSync(buildDir)) {
    rmSync(buildDir, { recursive: true });
  }

  // Step 3: Copy server
  console.log('Copying server files...');
  cpSync(serverDir, path.join(buildDir, 'server'), { recursive: true });

  // Step 4: Copy client dist
  console.log('Copying frontend build...');
  const clientDistSrc = path.join(clientDir, 'dist');
  const clientDistDest = path.join(buildDir, 'client', 'dist');
  cpSync(clientDistSrc, clientDistDest, { recursive: true });

  // Step 5: Copy start.mjs
  console.log('Copying entry point...');
  copyFileSync(
    path.join(rootDir, 'start.mjs'),
    path.join(buildDir, 'start.mjs')
  );

  // Step 6: Copy package.json
  console.log('Copying package.json...');
  copyFileSync(
    path.join(rootDir, 'package.json'),
    path.join(buildDir, 'package.json')
  );

  // Step 7: Copy package-lock.json if it exists
  const lockFile = path.join(rootDir, 'package-lock.json');
  if (existsSync(lockFile)) {
    console.log('Copying package-lock.json...');
    copyFileSync(lockFile, path.join(buildDir, 'package-lock.json'));
  }

  // Step 8: Copy .env if it exists
  const envFile = path.join(rootDir, '.env');
  if (existsSync(envFile)) {
    console.log('Copying .env file...');
    copyFileSync(envFile, path.join(buildDir, '.env'));
  } else {
    console.log('.env file not found in root directory');
    console.log('   You need to create .env in the build folder after building');
  }

  // Step 9: Copy .env.example as reference
  const envExampleFile = path.join(rootDir, '.env.example');
  if (existsSync(envExampleFile)) {
    console.log('Copying .env.example as reference...');
    copyFileSync(envExampleFile, path.join(buildDir, '.env.example'));
  }

  console.log('\nBuild complete!');
  console.log('\nBuild folder structure:');
  console.log('   build/');
  console.log('   ├── start.mjs');
  console.log('   ├── package.json');
  console.log('   ├── package-lock.json');
  console.log('   ├── server/');
  console.log('   │   ├── src/');
  console.log('   │   └── package.json');
  console.log('   └── client/');
  console.log('       └── dist/');
  console.log('\nTo run the app:');
  console.log('   cd build');
  console.log('   node start.mjs');
}

function installClientDependencies() {
  return new Promise((resolve, reject) => {
    const installProcess = spawn('npm', ['install', '--omit=dev'], {
      cwd: clientDir,
      stdio: 'inherit',
      shell: true
    });

    installProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Frontend dependency installation failed');
        reject(new Error('Frontend dependency installation failed'));
      } else {
        resolve();
      }
    });

    installProcess.on('error', (err) => {
      console.error('Install process error:', err);
      reject(err);
    });
  });
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
        reject(new Error('Frontend build failed'));
      } else {
        resolve();
      }
    });

    buildProcess.on('error', (err) => {
      console.error('Build process error:', err);
      reject(err);
    });
  });
}

build().catch((err) => {
  console.error('Build failed:', err.message);
  process.exit(1);
});
