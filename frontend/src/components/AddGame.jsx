import { useState } from "react";

const AddGame = ({ onClose }) => {
  const [newGame, setNewGame] = useState({
    name: "",
    grades: "",
    classSize: "",
    category: "",
    description: "",
    equipment: [],
    funFactor: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    
    if (name === "equipment") {
    const equipmentArray = value
    .split(',')
    .map(item => item.trim())
    .filter(item => item); // remove empty strings

  setNewGame(prev => ({
    ...prev,
    equipment: equipmentArray
  }));
} else {
  setNewGame(prev => ({...prev,[name]: value
  }));
}
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("Hello", newGame)
      const response = await fetch("http://localhost:5001/add-game", {
        method: "POST",  // POST request to add a game
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(newGame), 
      });

      if (!response.ok) {
        throw new Error("Failed to add game");
      }

      alert("Game added successfully!");
      onClose(); // Close modal after adding
    } catch (error) {
      console.error(error);
      alert("Failed to add game.");
    }
  };

  return (
<form onSubmit={handleSubmit} className="add-game-form">
  <input
    name="name"
    placeholder="Game Name"
    onChange={handleChange}
    value={newGame.name}
    required
  />

  <select
    name="grades"
    value={newGame.grades}
    onChange={handleChange}
    required
  >
    <option value="">Select Grade</option>
    <option value="Primary">Primary</option>
    <option value="Secondary">Secondary</option>
    <option value="High">High School</option>
    <option value="Any">Any</option>
  </select>

  <select
    name="classSize"
    value={newGame.classSize}
    onChange={handleChange}
    required
  >
    <option value="">Select Class Size</option>
    <option value="Small">Small</option>
    <option value="Medium">Medium</option>
    <option value="Large">Large</option>
    <option value="Any">Any</option>
  </select>

  <input
    name="category"
    placeholder="Category"
    onChange={handleChange}
    value={newGame.category}
  />

  <textarea
    name="description"
    placeholder="Description"
    onChange={handleChange}
    value={newGame.description}
    rows={3}
  />

  <input
    name="equipment"
    placeholder="Equipment (comma separated)"
    onChange={handleChange}
    value={newGame.equipment.join(', ')}
  />

  <input
    type="number"
    name="funFactor"
    min="1"
    max="5"
    placeholder="Fun Factor (1-5)"
    onChange={handleChange}
    value={newGame.funFactor}
  />

  <button type="submit">Submit</button>
  <button type="cancel" onClick={onClose}>Cancel</button>
</form>
  );
};

export default AddGame;
