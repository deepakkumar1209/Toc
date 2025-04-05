import React, { useState } from "react";
import "./styles.css";

function App() {
    const [regex, setRegex] = useState("");
    const [image, setImage] = useState(null);
    const [type, setType] = useState("nfa");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://127.0.0.1:5000/convert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ regex, type }),
        });

        const data = await response.json();
        if (data.image_url) {
            setImage(`http://127.0.0.1:5000${data.image_url}`);
        }
    };

    return (
        <div className="container">
            <h1>Regex to NFA/DFA Converter</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={regex}
                    onChange={(e) => setRegex(e.target.value)}
                    placeholder="Enter regular expression"
                    required
                />
                <select onChange={(e) => setType(e.target.value)}>
                    <option value="nfa">NFA</option>
                    <option value="dfa">DFA</option>
                </select>
                <button type="submit">Convert</button>
            </form>
            {image && <img src={image} alt="Automaton Visualization" />}
        </div>
    );
}

export default App;
