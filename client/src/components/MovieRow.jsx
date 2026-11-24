import { useRef } from "react";
import MovieCard from "./MovieCard.jsx";

// A horizontal row of titles, such as movies or shows in "Action" or "Sci-Fi".
// If an onRemove function is given, each title gets a small X button.
// Arrow buttons scroll the row on desktop; touch users just swipe.
function MovieRow({ title, movies, onRemove }) {
  const trackRef = useRef(null);

  function scrollRow(direction) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <section className="row page-width">
      <div className="row-heading"><h2>{title}</h2><span>{movies.length} title{movies.length === 1 ? "" : "s"}</span></div>
      <div className="row-track">
        <div className="row-movies" ref={trackRef} aria-label={`${title} titles`}>
          {movies.map((movie) => (
            <div key={movie._id} className="card-wrapper">
              <MovieCard movie={movie} />
              {onRemove && (
                <button
                  className="remove-btn"
                  title="Remove from this row"
                  aria-label={`Remove ${movie.title} from this row`}
                  onClick={() => onRemove(movie._id)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        {movies.length > 4 && (
          <>
            <button type="button" className="row-arrow row-arrow-left" aria-label={`Scroll ${title} left`} onClick={() => scrollRow(-1)}>‹</button>
            <button type="button" className="row-arrow row-arrow-right" aria-label={`Scroll ${title} right`} onClick={() => scrollRow(1)}>›</button>
          </>
        )}
      </div>
    </section>
  );
}

export default MovieRow;
