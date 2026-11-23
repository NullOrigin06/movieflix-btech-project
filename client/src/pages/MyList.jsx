import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyList } from "../api.js";
import MovieRow from "../components/MovieRow.jsx";

function MyList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyList()
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="page list-page">
      <header className="list-header page-width">
        <span className="page-eyebrow">Your collection</span><h1>My List</h1><p>Movies you saved for later, all in one place.</p>
        {!loading && !error && movies.length > 0 && <span className="saved-count">{movies.length} saved title{movies.length === 1 ? "" : "s"}</span>}
      </header>

      {loading && <div className="state-panel page-width"><span className="loader" /><p>Loading your list...</p></div>}
      {error && <div className="state-panel page-width error" role="alert"><h2>Could not load your list</h2><p>{error}</p></div>}
      {!loading && !error && movies.length === 0 && (
        <div className="state-panel page-width empty-list"><span className="state-icon" aria-hidden="true">＋</span><h2>Your list is waiting</h2><p>Open a movie and select “Add to My List” to save it here.</p><Link to="/" className="btn btn-primary">Browse movies</Link></div>
      )}

      {movies.length > 0 && <MovieRow title="Saved movies" movies={movies} />}
    </main>
  );
}

export default MyList;
