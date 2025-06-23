const express = require("express");
const path = require("path");
const fs = require("fs");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get the CLIENT_ID from .env file
const CLIENT_ID = CLIENT_ID || "1356256774348341292";
// The permissions your bot needs - this number represents the combination of Discord permissions
// 268435456 is for "Manage Server" permission
// 8 is for "Administrator" permission
// 3149056 is for (Manage channels, Manage roles, Manage messages, etc.)
const PERMISSIONS = "8";
// You can use this tool to calculate permissions: https://discordapi.com/permissions.html

// OAuth2 scopes for bot
const SCOPES = "bot applications.commands";

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");
app.set("layout extractScripts", true);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    clientId: CLIENT_ID,
    permissions: PERMISSIONS,
    scopes: SCOPES,
    botName: "Discord Multiple System Bot",
    featuresCount: 20,
    serversCount: "100+",
    usersCount: "5,000+",
    supportServer:
      process.env.SUPPORT_SERVER || "https://discord.gg/yourinvitelink",
  });
});

app.get("/features", (req, res) => {
  res.render("features");
});

app.get("/commands", (req, res) => {
  // Read commands dynamically from the commands folder
  const commandCategories = {};
  const commandsDir = path.join(__dirname, "..", "commands");

  try {
    const categories = fs.readdirSync(commandsDir);

    categories.forEach((category) => {
      const categoryPath = path.join(commandsDir, category);
      if (fs.statSync(categoryPath).isDirectory()) {
        const commands = fs
          .readdirSync(categoryPath)
          .filter((file) => file.endsWith(".js"))
          .map((file) => {
            const command = require(path.join(categoryPath, file));
            return {
              name: command.data ? command.data.name : file.replace(".js", ""),
              description: command.data
                ? command.data.description
                : "No description available",
            };
          });

        commandCategories[category] = commands;
      }
    });

    res.render("commands", { commandCategories });
  } catch (error) {
    console.error("Error loading commands:", error);
    res.render("commands", { commandCategories: {} });
  }
});

app.get("/support", (req, res) => {
  res.redirect(
    process.env.SUPPORT_SERVER || "https://discord.gg/yourinvitelink"
  );
});

app.get("/thanks", (req, res) => {
  res.render("thanks");
});

app.listen(PORT, () => {
  console.log(`Website running on port ${PORT}`);
});
