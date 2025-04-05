import React, { useState } from "react";
import "./styles.css";

function App() {
  const [regex, setRegex] = useState("");
  const [type, setType] = useState("nfa");
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setImageUrl(null);
    try {
      const response = await fetch("https://toc-1.onrender.com/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ regex, type }),
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(`https://toc-1.onrender.com/${data.image}`);
      } else {
        setError(data.error || "Something went wrong!");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="container">
      <h1>Regex to NFA/DFA Converter</h1>
      <input
        type="text"
        value={regex}
        onChange={(e) => setRegex(e.target.value)}
        placeholder="Enter a regular expression"
      />
      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            value="nfa"
            checked={type === "nfa"}
            onChange={() => setType("nfa")}
          />
          Convert to NFA
        </label>
        <label>
          <input
            type="radio"
            value="dfa"
            checked={type === "dfa"}
            onChange={() => setType("dfa")}
          />
          Convert to DFA
        </label>
      </div>
      <button onClick={handleSubmit}>Convert</button>

      {error && <p className="error">{error}</p>}

      {imageUrl && (
        <div className="image-container">
          <h3>Generated Automaton</h3>
          <img src={imageUrl} alt="Automaton" />
        </div>
      )}
    </div>
  );
}

export default App;
