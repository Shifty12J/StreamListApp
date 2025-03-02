import React, { useEffect, useState } from "react";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // the TMDB API
    const fetchMovies = async (query = "") => {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const baseUrl = "https://api.themoviedb.org/3";
        const url = query
            ? `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=1`
            : `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
            setLoading(false);

            // save storage
            localStorage.setItem("recentSearchTerm", query);
            localStorage.setItem("recentMovies", JSON.stringify(data.results));
        } catch (error) {
            console.error("error getting data from TMDB:", error);
        }
    };

    // load search results during refresh
    useEffect(() => {
        const savedSearchTerm = localStorage.getItem("recentSearchTerm");
        const savedMovies = localStorage.getItem("recentMovies");

        if (savedSearchTerm) {
            setSearchTerm(savedSearchTerm);
        }

        if (savedMovies) {
            setMovies(JSON.parse(savedMovies));
            setLoading(false);
        } else {
            fetchMovies(); // if nothing is in storage, pull popular movies
        }
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (searchTerm.trim()) {
            fetchMovies(searchTerm);
        } else {
            fetchMovies(); // if empty, pull popular movies
        }
    };

    return (
        <div className="movies-page">
            <h1 className="movies-title">The Movies!</h1>

            {/* search */}
            <form onSubmit={handleSearchSubmit} className="homepage-form">
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="homepage-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button type="submit" className="homepage-button">
                    Search
                </button>
            </form>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="movies-grid">
                    {movies?.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="movie-poster"
                            />
                            <h2>{movie.title}</h2>
                            <p>Year: {movie.release_date?.split("-")[0]}</p>
                            <p>Rating: {movie.vote_average}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* page footer with logo */}
            <footer className="movies-footer">
                <img
                    src="/TMDBlogo.png"
                    alt="TMDB Logo"
                    className="tmdb-logo"
                />
            </footer>
        </div>
    );
}

export default Movies;
