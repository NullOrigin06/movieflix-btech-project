async function seedCatalogIfEmpty({ countTitles, seedCatalog }) {
  if ((await countTitles()) > 0) {
    return false;
  }

  await seedCatalog();
  return true;
}

module.exports = { seedCatalogIfEmpty };
