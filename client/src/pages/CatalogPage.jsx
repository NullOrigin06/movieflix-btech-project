import { useMemo, useState } from "react";
import CatalogGrid from "../components/CatalogGrid.jsx";
import HeroBanner from "../components/HeroBanner.jsx";
import SkeletonGrid from "../components/SkeletonGrid.jsx";
import SortSelect from "../components/SortSelect.jsx";
import useCatalog from "../hooks/useCatalog.js";
import usePageTitle from "../hooks/usePageTitle.js";
import { filterByType, getActiveGenre, getGenresForType, sortNewest, sortTitles } from "../catalogUtils.js";

function CatalogPage({ type }) {
  const { movies, loading, error } = useCatalog();
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortMode, setSortMode] = useState("newest");
  const typedTitles = useMemo(() => filterByType(movies, type), [movies, type]);
  const genres = useMemo(() => getGenresForType(movies, type), [movies, type]);
  const activeGenre = getActiveGenre(selectedGenre, genres);
  const filteredTitles = activeGenre === "All"
    ? typedTitles
    : typedTitles.filter((item) => (item.genre || "Other") === activeGenre);
  const visibleTitles = useMemo(() => sortTitles(filteredTitles, sortMode), [filteredTitles, sortMode]);
  const pageTitle = type === "Show" ? "TV Shows" : "Movies";
  const featured = sortNewest(typedTitles)[0];
  usePageTitle(pageTitle);

  return (
    <main className={`page ${featured ? "browse-page has-hero" : "browse-page no-hero"}`}>
      <HeroBanner title={featured} eyebrow={`${pageTitle} spotlight`} />
      <section className="catalog-section page-width">
        <div className="catalog-heading">
          <div><span className="page-eyebrow">Browse</span><h2>All {pageTitle}</h2></div>
          <span>{visibleTitles.length} title{visibleTitles.length === 1 ? "" : "s"}</span>
        </div>
        <div className="catalog-toolbar">
          {genres.length > 0 && (
            <div className="genre-buttons" aria-label={`Filter ${pageTitle} by genre`}>
              {["All", ...genres].map((genre) => (
                <button key={genre} type="button" onClick={() => setSelectedGenre(genre)} className={activeGenre === genre ? "genre-btn active" : "genre-btn"} aria-pressed={activeGenre === genre}>{genre}</button>
              ))}
            </div>
          )}
          {!loading && !error && typedTitles.length > 1 && <SortSelect id="catalog-sort" value={sortMode} onChange={setSortMode} />}
        </div>
        {loading && <SkeletonGrid label={`Loading ${pageTitle.toLowerCase()}`} />}
        {error && <div className="state-panel error" role="alert"><h2>We could not load {pageTitle.toLowerCase()}</h2><p>{error}</p><button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>Try again</button></div>}
        {!loading && !error && visibleTitles.length === 0 && <div className="state-panel"><h2>No {pageTitle.toLowerCase()} found</h2><p>Try another genre.</p></div>}
        {!loading && !error && visibleTitles.length > 0 && <CatalogGrid movies={visibleTitles} label={`${pageTitle} catalog`} />}
      </section>
    </main>
  );
}

export default CatalogPage;
