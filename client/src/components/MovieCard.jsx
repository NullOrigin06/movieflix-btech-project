import { Link } from "react-router-dom";
import { getContentType } from "../catalogUtils.js";

// One movie poster. Clicking it opens the movie page.
function MovieCard({ movie }) {
  return (
    <Link to={"/movie/" + movie._id} className="card">
      <div className="card-image">
        <img src={movie.posterUrl} alt={`${movie.title} poster`} loading="lazy" />
        <span className="card-type">{getContentType(movie)}</span>
        <span className="card-play" aria-hidden="true">▶</span>
        <div className="card-overlay">
          <span className="card-overlay-title">{movie.title}</span>
          <span className="card-overlay-description">{movie.description}</span>
          <span className="card-overlay-link">View details <span aria-hidden="true">↗</span></span>
        </div>
      </div>
      <div className="card-info">
        <h3>{movie.title}</h3>
        <p className="card-meta"><span className="card-match">Popular</span>{movie.year && <span>{movie.year}</span>}{movie.rating && <span className="card-rating">{movie.rating}</span>}<span>{movie.genre || "Other"}</span></p>
      </div>
    </Link>
  );
}

export default MovieCard;
