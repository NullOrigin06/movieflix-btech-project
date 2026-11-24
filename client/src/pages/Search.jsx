import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CatalogGrid from "../components/CatalogGrid.jsx";
import SkeletonGrid from "../components/SkeletonGrid.jsx";
import SortSelect from "../components/SortSelect.jsx";
import useCatalog from "../hooks/useCatalog.js";
import usePageTitle from "../hooks/usePageTitle.js";
import { sortTitles } from "../catalogUtils.js";

function Search() {
  const [params] = useSearchParams();
  const { movies, loading, error } = useCatalog();
  const [sortMode, setSortMode] = useState("relevance");
  const query = (params.get("q") || "").trim();
  const text = query.toLowerCase();
  const matches = useMemo(() => (text
    ? movies.filter((movie) => [movie.title, movie.genre, movie.description].some((value) => String(value || "").toLowerCase().includes(text)))
    : []), [movies, text]);
  // "relevance" keeps title matches ahead of genre and description matches
  const results = useMemo(() => {
    if (sortMode !== "relevance") return sortTitles(matches, sortMode);
    const inTitle = (movie) => String(movie.title || "").toLowerCase().includes(text);
    return [...matches.filter(inTitle), ...matches.filter((movie) => !inTitle(movie))];
  }, [matches, sortMode, text]);
  usePageTitle(query ? `Search: ${query}` : "Search");

  return (
    <main className="page search-page page-width">
      <header className="search-header">
        <span className="page-eyebrow">Search MovieFlix</span>
        <h1>{query ? `Results for “${query}”` : "Find your next watch"}</h1>
        {query && !loading && <p>{results.length} match{results.length === 1 ? "" : "es"}</p>}
      </header>
      {!query && <div className="state-panel"><span className="state-icon" aria-hidden="true">⌕</span><h2>Start typing to search</h2><p>Use the search box in the navigation to find movies and shows.</p></div>}
      {query && loading && <SkeletonGrid label="Searching the catalog" />}
      {query && error && <div className="state-panel error" role="alert"><h2>Search is unavailable</h2><p>{error}</p></div>}
      {query && !loading && !error && results.length === 0 && <div className="state-panel"><h2>No matches found</h2><p>Try a different title, genre, or keyword.</p></div>}
      {query && !loading && !error && results.length > 1 && (
        <div className="catalog-toolbar">
          <SortSelect id="search-sort" value={sortMode} onChange={setSortMode} extra={[{ value: "relevance", label: "Best match" }]} />
        </div>
      )}
      {query && !loading && !error && results.length > 0 && <CatalogGrid movies={results} label={`Search results for ${query}`} />}
    </main>
  );
}

export default Search;
