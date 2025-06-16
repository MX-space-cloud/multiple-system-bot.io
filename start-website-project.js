// Script to start the standalone website project
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting standalone website project on port 5000...');

// Start the server.js script and specify PORT environment variable
const server = spawn('node', ['server.js'], {
  env: { ...process.env, PORT: '5000' },
  cwd: path.join(__dirname, 'website-project'),
  stdio: 'inherit'
});

server.on('error', (err) => {
  console.error('Failed to start website:', err);
});

process.on('SIGINT', () => {
  console.log('Stopping website...');
  server.kill('SIGINT');
  process.exit();
});