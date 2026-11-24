import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getMovie,
  getMyList,
  addToMyList,
  removeFromMyList,
  saveWatching,
} from "../api.js";
import MovieRow from "../components/MovieRow.jsx";
import useCatalog from "../hooks/useCatalog.js";
import usePageTitle from "../hooks/usePageTitle.js";
import { getContentType, getRelatedTitles } from "../catalogUtils.js";

// Keyed by id so opening another title starts with fresh state
function MovieDetail() {
  const { id } = useParams(); // the :id from the URL /movie/:id
  return <MovieDetailView key={id} id={id} />;
}

function MovieDetailView({ id }) {
  const [movie, setMovie] = useState(null);
  const [inList, setInList] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(""); // "", "copied" or "failed"
  const { movies: catalog } = useCatalog();
  usePageTitle(movie ? movie.title : "Loading");

  useEffect(() => {
    let cancelled = false;

    // load the movie
    getMovie(id)
      .then((data) => { if (!cancelled) setMovie(data); })
      .catch((err) => { if (!cancelled) setError(err.message); });

    // remember this movie for the "Continue Watching" row
    saveWatching(id).catch(() => {});

    // check if it is already in My List
    getMyList()
      .then((list) => {
        if (!cancelled) setInList(list.some((m) => m._id === id));
      })
      .catch(() => {});

    return () => { cancelled = true; };
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

  // Copies the page address so the title can be shared
  async function copyLink() {
    let done = false;
    try {
      await navigator.clipboard.writeText(window.location.href);
      done = true;
    } catch {
      // older browsers or blocked clipboard access: try the legacy way
      const box = document.createElement("textarea");
      box.value = window.location.href;
      box.setAttribute("readonly", "");
      box.style.position = "fixed";
      box.style.opacity = "0";
      document.body.appendChild(box);
      box.select();
      try { done = document.execCommand("copy"); } catch { done = false; }
      document.body.removeChild(box);
    }
    setCopied(done ? "copied" : "failed");
    setTimeout(() => setCopied(""), 2500);
  }

  if (error) {
    return (
      <main className="page detail page-width">
        <div className="state-panel error" role="alert"><h2>Movie unavailable</h2><p>{error}</p><Link to="/" className="text-link">Back to home</Link></div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="page detail-page" aria-busy="true">
        <div className="detail-content page-width" role="status" aria-label="Loading title">
          <div className="video-box skeleton-image" />
          <div className="movie-info" aria-hidden="true">
            <div className="skeleton-line wide" />
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
          </div>
        </div>
      </main>
    );
  }

  const related = getRelatedTitles(catalog, movie, 10);

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
          <div className="detail-actions">
            <button onClick={toggleList} className={inList ? "btn btn-list active" : "btn btn-list"} aria-pressed={inList}>
              <span aria-hidden="true">{inList ? "✓" : "+"}</span>{inList ? "Added to My List" : "Add to My List"}
            </button>
            <button type="button" onClick={copyLink} className="btn btn-share">
              <span aria-hidden="true">{copied === "copied" ? "✓" : "↗"}</span>{copied === "copied" ? "Link copied" : copied === "failed" ? "Copy failed" : "Share"}
            </button>
          </div>
          <span className="visually-hidden" role="status">{copied === "copied" ? "Link copied to clipboard" : copied === "failed" ? "Could not copy the link" : ""}</span>
        </section>
      </div>
      {related.length > 0 && <MovieRow title="More Like This" movies={related} />}
    </main>
  );
}

export default MovieDetail;
