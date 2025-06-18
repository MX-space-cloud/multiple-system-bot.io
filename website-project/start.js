// Script to start the standalone website on port 5001
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Create a temporary .env file with PORT=5001
const envPath = path.join(__dirname, '.env');
let envContent = '';

try {
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
    
    // Check if PORT is already defined
    if (envContent.includes('PORT=')) {
      // Replace the existing PORT line
      envContent = envContent.replace(/PORT=\d+/, 'PORT=5001');
    } else {
      // Add PORT to the end
      envContent += '\nPORT=5001';
    }
  } else {
    // Create a minimal .env file
    envContent = 'PORT=5001\n';
  }
  
  // Write the modified .env file
  fs.writeFileSync(envPath, envContent);
  
  console.log('Starting standalone website on port 5001...');
  
  // Start the server.js script
  const server = spawn('node', ['server.js'], {
    cwd: __dirname,
    stdio: 'inherit'
  });
  
  server.on('error', (err) => {
    console.error('Failed to start website:', err);
  });
  
} catch (error) {
  console.error('Error setting up the website:', error);
}