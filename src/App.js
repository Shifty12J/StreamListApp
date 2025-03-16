import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/homepage";
import About from "./components/about";
import Cart from "./components/cart";
import Movies from "./components/movies";
import "./App.css";

// NotFound 
function NotFound() {
    return (
        <div className="not-found">
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/" className="nav-button">
                Return Home
            </Link>
        </div>
    );
}

// error boundary 
class ErrorBoundary extends Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-container">
                    <h2>Something went wrong.</h2>
                    <p>Please refresh the page or try again later.</p>
                    <button onClick={() => window.location.reload()}>Refresh Page</button>
                </div>
            );
        }
        return this.props.children;
    }
}

//error boundary and 404
function App() {
    return (
        <Router>
            <ErrorBoundary>
                <div className="App">
                    <header>
                        <h1 className="app-title">StreamList</h1>
                        <nav className="navbar">
                            <Link to="/" className="nav-button">
                                Home
                            </Link>
                            <Link to="/movies" className="nav-button">
                                Movies
                            </Link>
                            <Link to="/cart" className="nav-button">
                                Cart
                            </Link>
                            <Link to="/about" className="nav-button">
                                About
                            </Link>
                        </nav>
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/movies" element={<Movies />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/about" element={<About />} />
                            <Route path="*" element={<NotFound />} /> {/* 404 route */}
                        </Routes>
                    </main>
                </div>
            </ErrorBoundary>
        </Router>
    );
}

export default App;
