export function getContentType(item) {
  return item?.type === "Show" ? "Show" : "Movie";
}

export function filterByType(items, selectedType) {
  if (selectedType === "All") return items;
  return items.filter((item) => getContentType(item) === selectedType);
}

export function getGenresForType(items, selectedType) {
  const genres = [];

  filterByType(items, selectedType).forEach((item) => {
    const genre = item.genre || "Other";
    if (!genres.includes(genre)) genres.push(genre);
  });

  return genres;
}

export function getActiveGenre(selectedGenre, availableGenres) {
  return selectedGenre === "All" || availableGenres.includes(selectedGenre)
    ? selectedGenre
    : "All";
}

export function sortNewest(items) {
  return [...items].sort((a, b) => {
    const yearDifference = (Number(b.year) || 0) - (Number(a.year) || 0);
    return yearDifference || String(a.title || "").localeCompare(String(b.title || ""));
  });
}

export function sortTopRated(items) {
  return [...items].sort((a, b) => {
    const scoreDifference = (Number(b.score) || 0) - (Number(a.score) || 0);
    if (scoreDifference) return scoreDifference;

    const yearDifference = (Number(b.year) || 0) - (Number(a.year) || 0);
    return yearDifference || String(a.title || "").localeCompare(String(b.title || ""));
  });
}

export function getTopTitles(items, limit = 10) {
  if (limit <= 0) return [];
  return sortTopRated(items).slice(0, limit);
}

export function groupByGenre(items) {
  return items.reduce((groups, item) => {
    const genre = item.genre || "Other";
    if (!groups[genre]) groups[genre] = [];
    groups[genre].push(item);
    return groups;
  }, Object.create(null));
}

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "Title A–Z" },
  { value: "za", label: "Title Z–A" },
];

// Returns a sorted copy. Unknown modes keep the original order.
export function sortTitles(items, mode) {
  const byTitle = (a, b) => String(a.title || "").localeCompare(String(b.title || ""));
  const byYear = (a, b) => (Number(a.year) || 0) - (Number(b.year) || 0);

  if (mode === "newest") return sortNewest(items);
  if (mode === "oldest") return [...items].sort((a, b) => byYear(a, b) || byTitle(a, b));
  if (mode === "az") return [...items].sort(byTitle);
  if (mode === "za") return [...items].sort((a, b) => byTitle(b, a));
  return [...items];
}

// Other titles in the same genre first, then the same type, never the title itself.
export function getRelatedTitles(items, movie, limit = 10) {
  if (!movie || limit <= 0) return [];
  const genre = movie.genre || "Other";
  const type = getContentType(movie);
  const others = items.filter((item) => item._id !== movie._id);
  const sameGenre = others.filter((item) => (item.genre || "Other") === genre);
  const sameType = others.filter((item) => (item.genre || "Other") !== genre && getContentType(item) === type);
  return [...sortNewest(sameGenre), ...sortNewest(sameType)].slice(0, limit);
}
