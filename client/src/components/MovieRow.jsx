import MovieCard from "./MovieCard.jsx";

// A horizontal row of titles, such as movies or shows in "Action" or "Sci-Fi".
// If an onRemove function is given, each title gets a small X button.
function MovieRow({ title, movies, onRemove }) {
  return (
    <section className="row page-width">
      <div className="row-heading"><h2>{title}</h2><span>{movies.length} title{movies.length === 1 ? "" : "s"}</span></div>
      <div className="row-movies" aria-label={`${title} titles`}>
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
    </section>
  );
}

export default MovieRow;
