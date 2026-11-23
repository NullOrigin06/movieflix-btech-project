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
