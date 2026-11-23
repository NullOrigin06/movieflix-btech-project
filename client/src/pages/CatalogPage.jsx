import { useMemo, useState } from "react";
import CatalogGrid from "../components/CatalogGrid.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import useCatalog from "../hooks/useCatalog.js";
import { filterByType, getActiveGenre, getGenresForType, sortNewest } from "../catalogUtils.js";

function CatalogPage({ type }) {
  const { movies, loading, error } = useCatalog();
  const [selectedGenre, setSelectedGenre] = useState("All");
  const typedTitles = useMemo(() => filterByType(movies, type), [movies, type]);
  const genres = useMemo(() => getGenresForType(movies, type), [movies, type]);
  const activeGenre = getActiveGenre(selectedGenre, genres);
  const visibleTitles = activeGenre === "All"
    ? typedTitles
    : typedTitles.filter((item) => (item.genre || "Other") === activeGenre);
  const pageTitle = type === "Show" ? "TV Shows" : "Movies";
  const featured = sortNewest(typedTitles)[0];

  return (
    <main className={`page ${featured ? "browse-page has-hero" : "browse-page no-hero"}`}>
      <HeroBanner title={featured} eyebrow={`${pageTitle} spotlight`} />
      <section className="catalog-section page-width">
        <div className="catalog-heading">
          <div><span className="page-eyebrow">Browse</span><h2>All {pageTitle}</h2></div>
          <span>{visibleTitles.length} title{visibleTitles.length === 1 ? "" : "s"}</span>
        </div>
        {genres.length > 0 && (
          <div className="genre-buttons" aria-label={`Filter ${pageTitle} by genre`}>
            {["All", ...genres].map((genre) => (
              <button key={genre} type="button" onClick={() => setSelectedGenre(genre)} className={activeGenre === genre ? "genre-btn active" : "genre-btn"} aria-pressed={activeGenre === genre}>{genre}</button>
            ))}
          </div>
        )}
        {loading && <div className="state-panel"><span className="loader" /><p>Loading {pageTitle.toLowerCase()}...</p></div>}
        {error && <div className="state-panel error" role="alert"><h2>We could not load {pageTitle.toLowerCase()}</h2><p>{error}</p></div>}
        {!loading && !error && visibleTitles.length === 0 && <div className="state-panel"><h2>No {pageTitle.toLowerCase()} found</h2><p>Try another genre.</p></div>}
        {!loading && !error && visibleTitles.length > 0 && <CatalogGrid movies={visibleTitles} label={`${pageTitle} catalog`} />}
      </section>
    </main>
  );
}

export default CatalogPage;
