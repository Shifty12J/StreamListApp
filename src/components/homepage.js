import React, { useState } from "react";

function HomePage() {
    const [input, setInput] = useState("");
    const [watchList, setWatchList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("User Input:", input);
        setInput("");
        e.preventDefault();
        if (input.trim()) {
            setWatchList([...watchList, input.trim()]);
            setInput("");
        }
    };

    const handleDelete = (index) => {
        setWatchList(watchList.filter((_, i) => i !== index));
    };

    const handleEdit = (index) => {
        const newMovieName = prompt("Edit name:", watchList[index]);
        if (newMovieName !== null && newMovieName.trim()) {
            const updatedList = [...watchList];
            updatedList[index] = newMovieName.trim();
            setWatchList(updatedList);
        }
    };

    const totalRows = 5;
    const placeholderRows = totalRows - watchList.length;
    
    return (
        <div className="homepage">
            <h1 className="homepage-title">Welcome to StreamList!</h1>
            <form className="homepage-form" onSubmit={handleSubmit}>
                <input
                    className="homepage-input"
                    type="text"
                    placeholder="Add a movie..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="homepage-button" type="submit">
                    Add
                </button>
            </form>
            <table className="watchlist-table">
                <thead>
                    <tr>
                        <th>Watch List</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {watchList.map((movie, index) => (
                        <tr key={index}>
                            <td>{movie}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEdit(index)}>
                                    <span className="material-icons">edit</span>
                                </button>
                                <button className="delete-button" onClick={() => handleDelete(index)}>
                                    <span className="material-icons">delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                    {Array.from({ length: placeholderRows }).map((_, index) => (
                        <tr key={`placeholder-${index}`}>
                            <td className="placeholder">Enter a Title to remember!</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer className="homepage-footer">
                <img src="/ezlogo.png" alt="ez logo" className="logo" />
            </footer>
        </div>
    );
}

export default HomePage;
