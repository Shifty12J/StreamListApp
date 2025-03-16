import React, { useEffect, useState } from "react";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // The TMDB API
    const fetchMovies = async (query = "", page = 1) => {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const baseUrl = "https://api.themoviedb.org/3";
        const url = query
            ? `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&language=en-US&page=${page}`
            : `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
            setTotalPages(data.total_pages); // the total pages
            setLoading(false);

            // Save storage
            localStorage.setItem("recentSearchTerm", query);
            localStorage.setItem("recentMovies", JSON.stringify(data.results));
        } catch (error) {
            console.error("Error getting data from TMDB:", error);
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
            fetchMovies(); // If nothing is in storage, pull popular movies
        }
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setCurrentPage(1); // Reset to the first page for a new search

        if (searchTerm.trim()) {
            fetchMovies(searchTerm, 1);
        } else {
            fetchMovies("", 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setLoading(true);
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchMovies(searchTerm, nextPage);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setLoading(true);
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            fetchMovies(searchTerm, prevPage);
        }
    };

    return (
        <div className="movies-page">
            <h1 className="movies-title">The Movies!</h1>

            {/* Search */}
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
                <>
                    <div className="movies-grid">
                        {movies?.map((movie) => (
                            <div key={movie.id} className="movie-card">
                                <img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : "/placeholder-poster.png" // placeholder image
                                    }
                                    alt={movie.title}
                                    className="movie-poster"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/placeholder-poster.png";
                                    }}
                                />
                                <h2>{movie.title}</h2>
                                <p>Year: {movie.release_date?.split("-")[0]}</p>
                                <p>Rating: {movie.vote_average}</p>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="pagination-controls">
                        <button
                            disabled={currentPage === 1}
                            onClick={handlePrevPage}
                            className="pagination-button"
                        >
                            Previous
                        </button>
                        <span>
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={handleNextPage}
                            className="pagination-button"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {/* Page footer with logo */}
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
