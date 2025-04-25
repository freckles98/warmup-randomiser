import { useState } from "react";

function RadioButton({ title, options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value); // Send selected value to parent
  };
  return (
    <div style={{ padding: '1rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#333' }}>
        {title}
      </h2>
      <div>
        {options.map((option) => (
          <div key={option} style={{ marginBottom: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#333' }}>
              <input
                type="radio"
                name={title}
                value={option}
                checked={selectedOption === option}
                onChange={handleSelect}
                style={{ marginRight: '0.5rem' }}
              />
              <span>{option}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RadioButton;
