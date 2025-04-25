import { useState } from "react";
import GameDisplay from "./GameDisplay";
import GradeSelector from "./RadioButton";
import ClassSizeSelector from "./RadioButton";
import EquipmentSelector from "./RadioButton";


const Randomizer = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [grade, setGrade] = useState("");
  const [classSize, setClassSize] = useState("");
  const [equipment, setEquipment] = useState("");

  const handleGradeSelection = (selectedGrade) => {
    console.log("Selected grade:", selectedGrade);
    setGrade(selectedGrade);
  };

  const handleClassSizeSelection = (selectedClassSize) => {
    console.log("Selected class size:", selectedClassSize);
    setClassSize(selectedClassSize);
  };

  const handleEquipmentSelection = (selectedEquipment) => {
    console.log("Selected equipment:", selectedEquipment);
    setEquipment(selectedEquipment);
  };

  const getRandomGame = async () => {
    if (!grade) {
      alert("Please select a grade.");
      return;
    }
    if (!classSize) {
      alert("Please select a class size.");
      return;
    }
    if (!equipment) {
      alert("Please select a equipment.");
      return;
    }
    const gradeMap = {
      "Grade 1-3": "primary",
      "Grade 4-5": "secondary",
      "High School": "high"
    };
  
    try {
      const response = await fetch(`http://localhost:5001/random-game?grades=${encodeURIComponent(gradeMap[grade])}&classSize=${encodeURIComponent(classSize)}&equipment=${encodeURIComponent(equipment)}`);
      
      if (!response.ok) {
        throw new Error("No game found");
      }
  
      const game = await response.json();
      setSelectedGame(game);
    } catch (error) {
      alert("No games available for the selected grade and class size.");
      console.error("Error fetching game:", error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <GradeSelector
          title="Select Grade"
          options={["Grade 1-3", "Grade 4-5", "High School"]}
          onSelect={handleGradeSelection}
        />

        <ClassSizeSelector
          title="Select Class Size"
          options={["Small", "Medium", "Large"]}
          onSelect={handleClassSizeSelection}
        />
        <EquipmentSelector
          title="Select whether equipment is needed"
          options={["True", "False"]}
          onSelect={handleEquipmentSelection}
        />

        <button className="button" onClick={getRandomGame}>
          Pick a Random Game
        </button>

        <div className="divider"></div>

        {selectedGame && <GameDisplay game={selectedGame} />}
      </div>
    </div>
  );
};
export default Randomizer;