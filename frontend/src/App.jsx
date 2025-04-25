import { useState } from "react";
import Randomizer from "./components/Randomizer";
import "./index.css"; // Ensure Tailwind is working

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">🎲 Warmup Game Randomizer</h1>
      <Randomizer />
    </div>
  );
}

export default App;
