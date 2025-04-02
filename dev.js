#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
const colors = {
  info: '\x1b[36m%s\x1b[0m',    // cyan
  success: '\x1b[32m%s\x1b[0m',  // green
  warning: '\x1b[33m%s\x1b[0m',  // yellow
  error: '\x1b[31m%s\x1b[0m'     // red
};

console.log(colors.info, '🚀 Starting development environment...');
console.log(colors.info, '📂 Watching for changes in both main library and example...');

// Function to run a command
function runCommand(command, args, options = {}) {
  const child = spawn(command, args, { 
    stdio: 'inherit',
    shell: true,
    ...options
  });
  
  child.on('error', (error) => {
    console.log(colors.error, `Error running ${command}: ${error.message}`);
  });
  
  return child;
}

// Start TypeScript in watch mode
const tscWatch = runCommand('npm', ['run', 'dev']);
console.log(colors.success, '✅ TypeScript compiler started in watch mode');

// Watch for changes and rebuild
const nodemonWatch = runCommand('npm', ['run', 'watch']);
console.log(colors.success, '✅ Nodemon watcher started');

// Start the example app
const exampleApp = runCommand('npm', ['run', 'example:dev']);
console.log(colors.success, '✅ Example app started');

// Handle process termination
process.on('SIGINT', () => {
  console.log(colors.warning, '\n🛑 Shutting down development environment...');
  tscWatch.kill();
  nodemonWatch.kill();
  exampleApp.kill();
  process.exit(0);
});

console.log(colors.info, '🎉 Development environment ready!');
console.log(colors.info, '📝 Make changes to files in src/ and see them reflected in the example app');
console.log(colors.info, '⛔ Press Ctrl+C to stop all processes'); 