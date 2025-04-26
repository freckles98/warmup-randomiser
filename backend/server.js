const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 5001;
const { body, validationResult } = require("express-validator");

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
const games = require("./games.json");
const gamesFilePath = path.join(__dirname, "games.json");

const readGames = async () => {
  const data = await fs.promises.readFile(gamesFilePath, "utf8");
  return JSON.parse(data);
};

// Function to write updated games to the file
const writeGames = async (games) => {
  await fs.promises.writeFile(gamesFilePath, JSON.stringify(games, null, 2), "utf8");
};

// API endpoint to fetch a random game based on criteria
app.get("/random-game", (req, res) => {
  const { grades, classSize } = req.query;
  console.log(grades, classSize);
  // Filter games based on input
  let filteredGames = games.filter(game => 
    (game.grades == grades || game.grades == 'Any') &&
    (game.classSize == classSize || game.classSize == 'Any') 
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



app.post("/add-game", [
  body("name").isString().notEmpty(),
  body("grades").isIn(["Primary", "Secondary", "High", "Any"]),
  body("classSize").isIn(["Small", "Medium", "Large", "Any"]),
  body("category").isString().optional(),
  body("description").isString().optional(),
  body("equipment").isArray().optional(),
  body("funFactor").isInt({ min: 1, max: 5 }).optional()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newGame = req.body; // This will contain the new game data sent by the frontend

  // Read existing games from the file
  const games = readGames();

  // Add the new game to the games array
  games.push(newGame);

  // Write the updated games array back to the file
  writeGames(games);

  // Respond with a success message
  res.status(201).json({ message: "Game added successfully!" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

