import React, { useState } from "react";

function HomePage() {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Input:", input);
        setInput("");
    };

    return (
        <div className="homepage">
            <h1 className="homepage-title">Welcome to StreamList</h1>
            <form onSubmit={handleSubmit} className="homepage-form">
                <input
                    type="text"
                    placeholder="Add to your list..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="homepage-input"
                />
                <button type="submit" className="homepage-button">
                    Add
                </button>
            </form>
        </div>
    );
}

export default HomePage;
