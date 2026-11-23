import MovieCard from "./MovieCard.jsx";

function CatalogGrid({ movies, label = "Catalog titles" }) {
  return (
    <div className="catalog-grid" aria-label={label}>
      {movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
    </div>
  );
}

export default CatalogGrid;
