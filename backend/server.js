const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
const games = require("./games.json");

// API endpoint to fetch a random game based on criteria
app.get("/random-game", (req, res) => {
  const { grades, classSize } = req.query;

  // Filter games based on input
  let filteredGames = games.filter(game => 
    (game.grades== grades || game.grades == 'Any') &&
    (games.classSize == classSize || games.classSize == 'Any') 
  );

  // Pick a random game
  if (filteredGames.length > 0) {
    const randomGame = filteredGames[Math.floor(Math.random() * filteredGames.length)];
    console.log(randomGame);
    res.json(randomGame);
  } else {
    res.status(404).json({ message: "No games found for given criteria." });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

