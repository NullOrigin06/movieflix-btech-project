import { useEffect, useState } from "react";
import { getMovies } from "../api.js";

function useCatalog() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    getMovies()
      .then((data) => {
        if (cancelled) return;
        setMovies(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Could not load the catalog");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { movies, loading, error };
}

export default useCatalog;
