import { useSearchParams } from "react-router-dom";
import CatalogGrid from "../components/CatalogGrid.jsx";
import useCatalog from "../hooks/useCatalog.js";

function Search() {
  const [params] = useSearchParams();
  const { movies, loading, error } = useCatalog();
  const query = (params.get("q") || "").trim();
  const text = query.toLowerCase();
  const results = text
    ? movies.filter((movie) => [movie.title, movie.genre, movie.description].some((value) => String(value || "").toLowerCase().includes(text)))
    : [];

  return (
    <main className="page search-page page-width">
      <header className="search-header">
        <span className="page-eyebrow">Search MovieFlix</span>
        <h1>{query ? `Results for “${query}”` : "Find your next watch"}</h1>
        {query && !loading && <p>{results.length} match{results.length === 1 ? "" : "es"}</p>}
      </header>
      {!query && <div className="state-panel"><span className="state-icon" aria-hidden="true">⌕</span><h2>Start typing to search</h2><p>Use the search box in the navigation to find movies and shows.</p></div>}
      {query && loading && <div className="state-panel"><span className="loader" /><p>Searching the catalog...</p></div>}
      {query && error && <div className="state-panel error" role="alert"><h2>Search is unavailable</h2><p>{error}</p></div>}
      {query && !loading && !error && results.length === 0 && <div className="state-panel"><h2>No matches found</h2><p>Try a different title, genre, or keyword.</p></div>}
      {query && !loading && !error && results.length > 0 && <CatalogGrid movies={results} label={`Search results for ${query}`} />}
    </main>
  );
}

export default Search;
