import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // UUID import

function HomePage() {
    const [input, setInput] = useState("");
    const [watchList, setWatchList] = useState([]);

    // load watchlist storage
    useEffect(() => {
        const storedWatchList = localStorage.getItem("watchList");
        if (storedWatchList) {
            try {
                const parsedWatchList = JSON.parse(storedWatchList);
                setWatchList(parsedWatchList);
            } catch (error) {
                console.error("Error parsing Local Storage data:", error);
            }
        }
    }, []);

    // save watchlist
    useEffect(() => {
        if (watchList.length === 0) {
            localStorage.removeItem("watchList"); 
        } else {
            localStorage.setItem("watchList", JSON.stringify(watchList));
        }
    }, [watchList]);

    // add movie
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            setWatchList([...watchList, { id: uuidv4(), title: input.trim() }]); // UUID
            setInput("");
        }
    };

    // delete movie from list
    const handleDelete = (id) => {
        const updatedWatchList = watchList.filter((movie) => movie.id !== id);
        setWatchList(updatedWatchList);
    };

    // edit list
    const handleEdit = (id) => {
        const newMovieName = prompt(
            "Edit name:",
            watchList.find((movie) => movie.id === id)?.title || ""
        );
        if (newMovieName !== null && newMovieName.trim()) {
            setWatchList(
                watchList.map((movie) =>
                    movie.id === id ? { ...movie, title: newMovieName.trim() } : movie
                )
            );
        }
    };

    const totalRows = 5;
    const placeholderRows = totalRows - watchList.length;

    return (
        <div className="homepage">
            <h1 className="homepage-title">Welcome to StreamList!</h1>
            {/* add movies */}
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
            {/* watchlist table */}
            <table className="watchlist-table">
                <thead>
                    <tr>
                        <th>Watch List</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Display movies */}
                    {watchList.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.title}</td>
                            <td>
                                <button
                                    className="edit-button"
                                    onClick={() => handleEdit(movie.id)}
                                >
                                    <span className="material-icons">edit</span>
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDelete(movie.id)}
                                >
                                    <span className="material-icons">delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                    {/* placeholder for table */}
                    {Array.from({ length: placeholderRows }).map((_, index) => (
                        <tr key={`placeholder-${index}`}>
                            <td className="placeholder">Enter a Title to remember!</td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* logo in footer */}
            <footer className="homepage-footer">
                <img src="/ezlogo.png" alt="ez logo" className="logo" />
            </footer>
        </div>
    );
}

export default HomePage;
