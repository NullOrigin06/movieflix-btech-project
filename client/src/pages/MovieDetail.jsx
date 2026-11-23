import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getMovie,
  getMyList,
  addToMyList,
  removeFromMyList,
  saveWatching,
} from "../api.js";
import { getContentType } from "../catalogUtils.js";

function MovieDetail() {
  const { id } = useParams(); // the :id from the URL /movie/:id
  const [movie, setMovie] = useState(null);
  const [inList, setInList] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // load the movie
    getMovie(id)
      .then((data) => setMovie(data))
      .catch((err) => setError(err.message));

    // remember this movie for the "Continue Watching" row
    saveWatching(id).catch(() => {});

    // check if it is already in My List
    getMyList()
      .then((list) => {
        setInList(list.some((m) => m._id === id));
      })
      .catch(() => {});
  }, [id]);

  async function toggleList() {
    try {
      if (inList) {
        await removeFromMyList(id);
        setInList(false);
      } else {
        await addToMyList(id);
        setInList(true);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) {
    return (
      <main className="page detail page-width">
        <div className="state-panel error" role="alert"><h2>Movie unavailable</h2><p>{error}</p><Link to="/" className="text-link">Back to home</Link></div>
      </main>
    );
  }

  if (!movie) {
    return <p className="message page">Loading...</p>;
  }

  return (
    <main className="page detail-page">
      <div className="detail-backdrop" style={{ backgroundImage: `url(${movie.posterUrl})` }} />
      <div className="detail-content page-width">
        <Link to="/" className="back"><span aria-hidden="true">‹</span> Back to browse</Link>
        <div className="video-box">
          <iframe src={`https://www.youtube.com/embed/${movie.trailerId}`} title={`${movie.title} trailer`} allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowFullScreen></iframe>
        </div>
        <section className="movie-info">
          <span className="page-eyebrow">{getContentType(movie)}</span>
          <h1>{movie.title}</h1>
          <div className="detail-meta" aria-label="Title information">
            {movie.year && <span>{movie.year}</span>}
            {movie.rating && <span className="rating-pill">{movie.rating}</span>}
            <span>{getContentType(movie)}</span>
            <span>{movie.genre || "Other"}</span>
          </div>
          <p className="movie-description">{movie.description}</p>
          <dl className="detail-facts">
            <div><dt>Genre</dt><dd>{movie.genre || "Other"}</dd></div>
            <div><dt>Released</dt><dd>{movie.year || "—"}</dd></div>
            <div><dt>Rating</dt><dd>{movie.rating || "Not rated"}</dd></div>
            <div><dt>Format</dt><dd>{getContentType(movie)}</dd></div>
          </dl>
          <p className="detail-cast"><span>More to explore</span> Discover more stories from {movie.genre || "this collection"}.</p>
          <button onClick={toggleList} className={inList ? "btn btn-list active" : "btn btn-list"} aria-pressed={inList}>
            <span aria-hidden="true">{inList ? "✓" : "+"}</span>{inList ? "Added to My List" : "Add to My List"}
          </button>
        </section>
      </div>
    </main>
  );
}

export default MovieDetail;
