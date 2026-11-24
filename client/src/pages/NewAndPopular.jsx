import CatalogGrid from "../components/CatalogGrid.jsx";
import MovieCard from "../components/MovieCard.jsx";
import SkeletonGrid from "../components/SkeletonGrid.jsx";
import useCatalog from "../hooks/useCatalog.js";
import usePageTitle from "../hooks/usePageTitle.js";
import { getTopTitles, sortNewest } from "../catalogUtils.js";

function NewAndPopular() {
  const { movies, loading, error } = useCatalog();
  usePageTitle("New & Popular");
  const newest = sortNewest(movies).slice(0, 18);
  const topTen = getTopTitles(movies, 10);

  return (
    <main className="page collection-page">
      <header className="collection-header page-width">
        <span className="page-eyebrow">Fresh picks</span>
        <h1>New &amp; Popular</h1>
        <p>New releases and the titles everyone is watching right now.</p>
      </header>
      {loading && <div className="page-width"><SkeletonGrid count={4} label="Loading popular titles" /></div>}
      {error && <div className="state-panel page-width error" role="alert"><h2>Could not load this collection</h2><p>{error}</p></div>}
      {!loading && !error && movies.length === 0 && <div className="state-panel page-width"><h2>No titles are available</h2><p>Please check back later.</p></div>}
      {!loading && !error && movies.length > 0 && (
        <>
          <section className="top-ten page-width">
            <div className="row-heading"><h2>Top 10 Today</h2><span>Most popular</span></div>
            <div className="top-ten-track">
              {topTen.map((movie, index) => <div className="top-ten-item" key={movie._id}><span className="top-ten-number" aria-hidden="true">{index + 1}</span><MovieCard movie={movie} /></div>)}
            </div>
          </section>
          <section className="catalog-section page-width">
            <div className="catalog-heading"><div><span className="page-eyebrow">Just added</span><h2>New Releases</h2></div></div>
            <CatalogGrid movies={newest} label="New releases" />
          </section>
        </>
      )}
    </main>
  );
}

export default NewAndPopular;
