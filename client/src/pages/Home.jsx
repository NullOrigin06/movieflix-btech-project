import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMovies, getWatching, removeWatching } from "../api.js";
import MovieRow from "../components/MovieRow.jsx";
import { filterByType, getContentType, getGenresForType } from "../catalogUtils.js";

function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All"); // which filter button is active
  const [selectedType, setSelectedType] = useState("All");

  const [watching, setWatching] = useState([]); // the "Continue Watching" movies

  // Load the Continue Watching movies once, when the page opens
  useEffect(() => {
    getWatching()
      .then((data) => setWatching(data))
      .catch(() => {}); // if it fails, we just don't show the row
  }, []);

  // Remove a movie from the row (and from the server)
  async function handleRemoveWatching(movieId) {
    try {
      await removeWatching(movieId);
      setWatching((current) => current.filter((movie) => movie._id !== movieId));
    } catch (err) {
      setError(err.message);
    }
  }

  // Runs on first load, and again whenever "search" changes
  useEffect(() => {
    let cancelled = false;

    getMovies(search)
      .then((data) => {
        if (cancelled) return;
        setMovies(data);
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [search]);

  const typeFilteredMovies = filterByType(movies, selectedType);
  const genres = getGenresForType(movies, selectedType);

  // If the chosen genre has no movies (for example after a search), act like "All"
  const activeGenre = genres.includes(selectedGenre) ? selectedGenre : "All";

  // Only show the rows we want: every genre, or just the chosen one
  const genresToShow = activeGenre === "All" ? genres : [activeGenre];

  // The big banner shows the first movie
  const featured = typeFilteredMovies[0];
  const showHero = Boolean(featured && !search && activeGenre === "All" && selectedType === "All");
  const displayedMovieCount = activeGenre === "All"
    ? typeFilteredMovies.length
    : typeFilteredMovies.filter((movie) => (movie.genre || "Other") === activeGenre).length;

  return (
    <main className="page home-page">
      {showHero && (
        <section className="hero" style={{ backgroundImage: `url(${featured.posterUrl})` }}>
          <div className="hero-overlay" />
          <div className="hero-text page-width">
            <span className="featured-label"><span /> Featured today</span>
            <h1>{featured.title}</h1>
            <div className="hero-meta" aria-label="Title information">
              {featured.year && <span>{featured.year}</span>}
              {featured.rating && <span className="rating-pill">{featured.rating}</span>}
              <span>{getContentType(featured)}</span>
              <span>{featured.genre || "Other"}</span>
            </div>
            <p className="hero-description">{featured.description}</p>
            <div className="hero-actions">
              <Link to={`/movie/${featured._id}`} className="btn btn-primary"><span aria-hidden="true">▶</span> Play trailer</Link>
              <Link to={`/movie/${featured._id}`} className="btn btn-secondary"><span aria-hidden="true">ⓘ</span> More info</Link>
            </div>
          </div>
        </section>
      )}

      <section className={`discovery-panel page-width${showHero ? " with-hero" : ""}`} aria-labelledby="discover-title">
        <div className="discovery-heading">
          <div><span className="page-eyebrow">Explore</span><h2 id="discover-title">Find something to watch</h2></div>
          {(search || activeGenre !== "All" || selectedType !== "All") && !loading && <span className="result-count">{displayedMovieCount} result{displayedMovieCount === 1 ? "" : "s"}</span>}
        </div>
        <div className="type-buttons" aria-label="Filter catalog by content type">
          {["All", "Movie", "Show"].map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => {
                setSelectedType(type);
                setSelectedGenre("All");
              }}
              className={type === selectedType ? "type-btn active" : "type-btn"}
              aria-pressed={type === selectedType}
            >
              {type === "All" ? "All" : `${type}s`}
            </button>
          ))}
        </div>
        <div className="search-bar">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            aria-label="Search movies and shows"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => {
              setLoading(true);
              setSearch(e.target.value);
            }}
          />
        </div>
        {genres.length > 0 && (
          <div className="genre-buttons" aria-label="Filter titles by genre">
            {["All", ...genres].map((genre) => (
              <button type="button" key={genre} onClick={() => setSelectedGenre(genre)} className={genre === activeGenre ? "genre-btn active" : "genre-btn"} aria-pressed={genre === activeGenre}>{genre}</button>
            ))}
          </div>
        )}
      </section>

      {loading && <div className="state-panel page-width"><span className="loader" /><p>Loading movies...</p></div>}
      {error && <div className="state-panel page-width error" role="alert"><h2>We could not load the movies</h2><p>{error}</p></div>}
      {!loading && !error && displayedMovieCount === 0 && (
        <div className="state-panel page-width"><span className="state-icon" aria-hidden="true">⌕</span><h2>No movies found</h2><p>No {selectedType === "All" ? "titles" : `${selectedType.toLowerCase()}s`} match these filters. Try another title or genre.</p></div>
      )}

      {/* Show Continue Watching only on the plain home view */}
      {watching.length > 0 && !search && activeGenre === "All" && selectedType === "All" && (
        <MovieRow
          title="Continue Watching"
          movies={watching}
          onRemove={handleRemoveWatching}
        />
      )}

      {genresToShow.map((genre) => (
        <MovieRow
          key={genre}
          title={genre}
          movies={typeFilteredMovies.filter((movie) => (movie.genre || "Other") === genre)}
        />
      ))}
    </main>
  );
}

export default Home;
