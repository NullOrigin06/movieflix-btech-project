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
