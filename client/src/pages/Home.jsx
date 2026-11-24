import { useState, useEffect } from "react";
import { getWatching, removeWatching } from "../api.js";
import HeroBanner from "../components/HeroBanner.jsx";
import MovieRow from "../components/MovieRow.jsx";
import useCatalog from "../hooks/useCatalog.js";
import usePageTitle from "../hooks/usePageTitle.js";
import { filterByType, getTopTitles, groupByGenre, sortNewest } from "../catalogUtils.js";

function Home() {
  const { movies, loading, error: catalogError } = useCatalog();
  const [watching, setWatching] = useState([]);
  const [actionError, setActionError] = useState("");
  usePageTitle("Home");

  // Load the Continue Watching movies once, when the page opens
  useEffect(() => {
    getWatching()
      .then((data) => setWatching(data))
      .catch(() => {}); // if it fails, we just don't show the row
  }, []);

  // Remove a movie from the row (and from the server)
  async function handleRemoveWatching(movieId) {
    try {
      await removeWatching(movieId);
      setWatching((current) => current.filter((movie) => movie._id !== movieId));
    } catch (err) {
      setActionError(err.message);
    }
  }

  const featured = getTopTitles(movies, 1)[0];
  const movieTitles = filterByType(movies, "Movie");
  const showTitles = filterByType(movies, "Show");
  const genreGroups = Object.entries(groupByGenre(movies)).filter(([, titles]) => titles.length >= 3).slice(0, 3);

  return (
    <main className={featured ? "page home-page has-hero" : "page home-page no-hero"}>
      <HeroBanner title={featured} />
      {loading && <div className="state-panel page-width home-state"><span className="loader" /><p>Loading titles...</p></div>}
      {(catalogError || actionError) && <div className="state-panel page-width error home-state" role="alert"><h2>We could not load MovieFlix</h2><p>{catalogError || actionError}</p></div>}
      {!loading && !catalogError && movies.length === 0 && <div className="state-panel page-width home-state"><h2>No titles are available</h2><p>Please check back later.</p></div>}

      {/* Show Continue Watching only on the plain home view */}
      {watching.length > 0 && (
        <MovieRow
          title="Continue Watching"
          movies={watching}
          onRemove={handleRemoveWatching}
        />
      )}

      {movies.length > 0 && <MovieRow title="Trending Now" movies={getTopTitles(movies, 10)} />}
      {movieTitles.length > 0 && <MovieRow title="Popular Movies" movies={movieTitles.slice(0, 10)} />}
      {showTitles.length > 0 && <MovieRow title="Binge-Worthy TV Shows" movies={showTitles.slice(0, 10)} />}
      {movies.length > 0 && <MovieRow title="New Releases" movies={sortNewest(movies).slice(0, 10)} />}
      {genreGroups.map(([genre, titles]) => <MovieRow key={genre} title={`${genre} Picks`} movies={titles.slice(0, 10)} />)}
    </main>
  );
}

export default Home;
