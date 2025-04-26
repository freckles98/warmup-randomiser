const getFunFactorEmoji = (funFactor) => {
  return "⭐".repeat(funFactor);
};

const GameDisplay = ({ game }) => {
  return (
    <div className="game-display">
      <h2 className="game-title">{game.name}</h2>
      <p className="game-meta">
        {game.category} | Fun Factor :{getFunFactorEmoji(game.funFactor)}
      </p>
      <p className="game-description">{game.description}</p>
      {game.equipment.length > 0 && (
        <p className="game-equipment">Equipment: {game.equipment.join(", ")}</p>
      )}
    </div>
  );
};
  
  export default GameDisplay;
  