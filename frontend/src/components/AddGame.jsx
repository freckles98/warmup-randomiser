import { useState } from "react";

const AddGame = ({ onClose }) => {
  const [newGame, setNewGame] = useState({
    name: "",
    grades: "",
    classSize: "",
    category: "",
    description: "",
    equipment: "",
    funFactor: "",
  });

  const handleChange = (e) => {
    setNewGame({ ...newGame, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/add-game", {
        method: "POST",  // POST request to add a game
        headers: {
          "Content-Type": "application/json", // specify content type as JSON
        },
        body: JSON.stringify(newGame), // Convert the object to a JSON string
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
        placeholder="Name"
        onChange={handleChange}
        value={newGame.name}
      />
  
      {/* Grades dropdown */}
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
      <br></br>
      {/* Grades dropdown */}
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

      <input
        name="description"
        placeholder="Description"
        onChange={handleChange}
        value={newGame.description}
      />

      <input
        name="equipment"
        placeholder="Equipment (comma separated)"
        onChange={handleChange}
        value={newGame.equipment}
      />

      <input
        type="number"
        name="funFactor"
        min="1"
        max="5"
        onChange={handleChange}
        value={newGame.funFactor}
      />

      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default AddGame;
