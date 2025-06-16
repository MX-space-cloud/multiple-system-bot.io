// Simple script to start the website
require('dotenv').config(); // Load environment variables first
console.log('Starting Discord bot website...');
console.log(`Client ID: ${process.env.CLIENT_ID ? 'Configured ✓' : 'Missing ✗'}`);
console.log(`Discord Token: ${process.env.DISCORD_TOKEN ? 'Configured ✓' : 'Missing ✗'}`);
console.log(`Support Server: ${process.env.SUPPORT_SERVER ? 'Configured ✓' : 'Using default'}`);

require('./website/server.js');