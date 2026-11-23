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
      </div>
      <div className="card-info">
        <h3>{movie.title}</h3>
        <p className="card-meta"><span className="card-match">Popular</span>{movie.year && <span>{movie.year}</span>}<span>{movie.genre || "Other"}</span></p>
      </div>
    </Link>
  );
}

export default MovieCard;
