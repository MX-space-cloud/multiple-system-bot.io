# Discord Bot Website

This is a standalone website for the Discord Economy Bot. It serves as a landing page and help center for users to learn about the bot's features and add it to their Discord servers.

## Features

- Clean, responsive design
- Bot information and feature showcase
- Command list and documentation
- "Add to Discord" functionality with proper OAuth2 flow
- Support server redirect

## Setup

1. Clone this repository
2. Install dependencies with `npm install`
3. Create a `.env` file with the following variables:
   ```
   CLIENT_ID=your_discord_bot_client_id_here
   SUPPORT_SERVER=https://discord.gg/your_invite_here
   PORT=5000
   ```
4. Start the server with `npm start`

## Development

- Run in development mode: `npm run dev`
- This uses nodemon to automatically restart the server when files change

## Project Structure

- `server.js` - Express server and route setup
- `public/` - Static assets (CSS, images, client-side JS)
- `views/` - EJS templates
  - `layout.ejs` - Main layout template
  - `index.ejs` - Home page
  - `commands.ejs` - Command documentation
  - `features.ejs` - Bot features
  - `thanks.ejs` - "Thank you" page after adding bot
  - `partials/` - Reusable template parts

## Customization

You can easily customize this website for your own Discord bot:

1. Update the bot name, description and statistics in `server.js`
2. Modify the command list in `server.js`
3. Update the features page content in `views/features.ejs`
4. Replace CSS styles in `public/css/style.css`

## Deployment

This website can be deployed to any Node.js hosting platform, such as:

- Replit
- Heroku
- Vercel
- Glitch
- DigitalOcean
- AWS

Make sure to set the environment variables in your hosting provider's dashboard or configuration.