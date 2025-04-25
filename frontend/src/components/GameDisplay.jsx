const GameDisplay = ({ game }) => {
  return (
    <div className="game-display">
      <h2 className="game-title">{game.name}</h2>
      <p className="game-meta">
        {game.category} | {game.players_min}-{game.players_max} players
      </p>
      <p className="game-description">{game.description}</p>
      {game.equipment.length > 0 && (
        <p className="game-equipment">Equipment: {game.equipment.join(", ")}</p>
      )}
    </div>
  );
};
  
  export default GameDisplay;
  