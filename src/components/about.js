import React from "react";

function About() {
    return (
        <div className="about-page">
            <h1 className="homepage-title">About the StreamList Application!</h1>

            {/* movie database reference */}
            <p className="about-info">
                The Title information on the Movies page was retrieved from
                <a
                    href="https://www.themoviedb.org/?language=en-US"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-link"
                >
                    The Movie Database
                </a>.
            </p>

            {/* references */}
            <section className="about-sources">
                <h2 className="sources-title">Additional references:</h2>
                <ul className="sources-list">
                    <li>
                        Eakin, N. (2021)
                        <a
                            href="https://noaheakin.medium.com/changing-the-default-react-browser-tab-title-and-icon-1240239d92d3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="source-link"
                        >
                            Changing the Default React Browser Tab Title and Icon. Medium.
                        </a>
                    </li>
                    <li>
                        Geeks for Geeks (2025)
                        <a
                            href="https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="source-link"
                        >
                            How to create a table in ReactJS?
                        </a>
                    </li>
                    <li>
                        MDN Web Docs (2025)
                        <a
                            href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/serviceworker"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="source-link"
                        >
                            Serviceworker.
                        </a>
                    </li>
                    <li>
                        Nadeem, N. (2022)
                        <a
                            href="https://create-react-app.dev/docs/making-a-progressive-web-app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="source-link"
                        >
                            Making a Progressive Web App. Create React App.
                        </a>
                    </li>
                    <li>
                        React Navigation (n.d)
                        <a
                            href="https://reactnavigation.org/docs/getting-started/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="source-link"
                        >
                            Getting Started.
                        </a>
                    </li>
                    <li>
                        Shukla, M. (2023)
                        <a
                            href="https://manoj-shu100.medium.com/building-a-progressive-web-app-pwa-with-react-offline-capabilities-56aab3971de8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="source-link"
                        >
                            Building a Progressive Web App (PWA) with React: Offline Capabilities. Medium.
                        </a>
                    </li>
                    <li>
                        TMDB (n.d.)
                        <a
                            href="https://developer.themoviedb.org/v4/reference/intro/getting-started"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="source-link"
                        >
                            Getting Started.
                        </a>
                    </li>
                </ul>
            </section>

            {/* Logo in footer */}
            <footer className="about-footer">
                <img src="/ezlogo.png" alt="EZ Logo" className="logo" />
            </footer>
        </div>
    );
}

export default About;
