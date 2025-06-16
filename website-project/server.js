const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get the CLIENT_ID from .env file
const CLIENT_ID = process.env.CLIENT_ID || "1356256774348341292";
// The permissions your bot needs - this number represents the combination of Discord permissions
// 268435456 is for "Manage Server" permission
// 8 is for "Administrator" permission
// 3149056 is for (Manage channels, Manage roles, Manage messages, etc.)
const PERMISSIONS = "268435456";
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

// Predefined commands for standalone website
const commandCategories = {
  economy: [
    { name: "balance", description: "Check your coin balance" },
    { name: "daily", description: "Claim your daily coins" },
    { name: "job", description: "Get a job and earn coins" },
    { name: "shop", description: "Buy items from the shop" },
    { name: "activity", description: "Go fishing or mining for rewards" },
    { name: "inventory", description: "View your inventory items" },
    { name: "pay", description: "Pay coins to another user" },
  ],
  games: [
    { name: "rps", description: "Play rock-paper-scissors with the bot" },
    { name: "trivia", description: "Answer trivia questions for rewards" },
    {
      name: "collaborative",
      description: "Join collaborative raids with other users",
    },
  ],
  moderation: [
    { name: "clear", description: "Clear a number of messages from a channel" },
    { name: "kick", description: "Kick a user from the server" },
    { name: "ban", description: "Ban a user from the server" },
  ],
  utility: [
    { name: "help", description: "Get help with bot commands" },
    {
      name: "tutorial",
      description: "Start an interactive tutorial for the bot",
    },
  ],
};

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
  res.render("commands", { commandCategories });
});

app.get("/support", (req, res) => {
  res.redirect(
    process.env.SUPPORT_SERVER || "https://discord.gg/yourinvitelink"
  );
});

app.get("/thanks", (req, res) => {
  res.render("thanks");
});

// Mock leaderboard data for demo purposes - in production, this would be fetched from a database
const leaderboardData = {
  collaborative: {
    topPlayers: [
      { username: "DragonSlayer", score: 1500, gamesPlayed: 15, icon: "🐉" },
      { username: "RaidLeader", score: 1200, gamesPlayed: 12, icon: "⚔️" },
      { username: "MythicTank", score: 1000, gamesPlayed: 10, icon: "🛡️" },
      { username: "LegendaryHealer", score: 900, gamesPlayed: 9, icon: "💉" },
      { username: "EpicMage", score: 800, gamesPlayed: 8, icon: "🔮" },
    ],
    stats: {
      totalRaids: 250,
      totalTeams: 45,
      averageScore: 95,
      topEarnedReward: 5000,
    },
  },
  trivia: {
    topPlayers: [
      { username: "KnowledgeKing", score: 2500, gamesPlayed: 50, icon: "👑" },
      { username: "TriviaQueen", score: 2200, gamesPlayed: 45, icon: "👸" },
      { username: "BrainiacBob", score: 1800, gamesPlayed: 40, icon: "🧠" },
      { username: "QuizMaster", score: 1600, gamesPlayed: 35, icon: "🎓" },
      { username: "FactFinder", score: 1400, gamesPlayed: 30, icon: "🔍" },
    ],
    stats: {
      totalQuestions: 5000,
      categories: 25,
      averageScore: 75,
      perfectRounds: 120,
    },
  },
  rps: {
    topPlayers: [
      { username: "RockChampion", score: 1800, gamesPlayed: 200, icon: "🪨" },
      { username: "PaperWinner", score: 1700, gamesPlayed: 180, icon: "📄" },
      { username: "ScissorsMaster", score: 1600, gamesPlayed: 170, icon: "✂️" },
      { username: "RPSLegend", score: 1500, gamesPlayed: 160, icon: "👊" },
      { username: "GameKing", score: 1400, gamesPlayed: 150, icon: "👑" },
    ],
    stats: {
      totalGames: 10000,
      rockWins: 3300,
      paperWins: 3400,
      scissorsWins: 3300,
      averageBet: 50,
    },
  },
};

// Leaderboard routes
app.get("/leaderboard", (req, res) => {
  res.render("leaderboard", {
    title: "Leaderboards",
    description: "Check out the top players in our community!",
    gameTypes: ["collaborative", "trivia", "rps"],
    viewTypes: ["global", "personal", "teams"],
  });
});

// Shared leaderboard view - must be defined BEFORE the generic /:gameType route
app.get("/leaderboard/share/:shareId", (req, res) => {
  const shareId = req.params.shareId;

  // In a real implementation, this would fetch the shared leaderboard data
  // from the bot's database using the shareId
  // This demonstrates the schema of shared leaderboard data
  const sharedData = {
    id: shareId,
    createdAt: new Date().toISOString(),
    views: Math.floor(Math.random() * 50) + 1, // Random view count for demo
    data: {
      game: "collaborative",
      topPlayers: leaderboardData.collaborative.topPlayers,
      userEntry: {
        username: "SharedUser",
        score: 750,
        gamesPlayed: 8,
        icon: "🧙",
      },
      userRank: 6,
      totalPlayers: 50,
      gameStats: leaderboardData.collaborative.stats,
    },
  };

  res.render("leaderboard-share", {
    title: "Shared Leaderboard",
    description: "Check out this player's achievements!",
    shareData: sharedData,
    shareUrl: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
  });
});

// Game-specific leaderboard route - must be defined AFTER the share route
app.get("/leaderboard/:gameType", (req, res) => {
  const gameType = req.params.gameType;

  // Check if the game type exists in our data
  if (!leaderboardData[gameType]) {
    return res.redirect("/leaderboard");
  }

  const gameNames = {
    collaborative: "Raid Battles",
    trivia: "Trivia Quiz",
    rps: "Rock Paper Scissors",
  };

  const gameIcons = {
    collaborative: "⚔️",
    trivia: "❓",
    rps: "✂️",
  };

  res.render("leaderboard-game", {
    title: `${gameNames[gameType]} Leaderboard`,
    description: `Top players in ${gameNames[gameType]}!`,
    gameType: gameType,
    gameName: gameNames[gameType],
    gameIcon: gameIcons[gameType],
    leaderboard: leaderboardData[gameType],
    otherGames: Object.keys(leaderboardData).filter((g) => g !== gameType),
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Website running on port ${PORT}`);
});
