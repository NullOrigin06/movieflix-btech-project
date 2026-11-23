async function seedCatalogIfEmpty({ countTitles, seedCatalog }) {
  if ((await countTitles()) > 0) {
    return false;
  }

  await seedCatalog();
  return true;
}

function findMissingTitles(existingTitles, desiredTitles) {
  const existingKeys = new Set(
    existingTitles.map((title) => `${title.type}:${title.title}`),
  );

  return desiredTitles.filter(
    (title) => !existingKeys.has(`${title.type}:${title.title}`),
  );
}

module.exports = { findMissingTitles, seedCatalogIfEmpty };
