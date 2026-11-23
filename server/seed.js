// Run npm run seed to replace the catalog and clear saved titles and watch history.
const mongoose = require("mongoose");
const Movie = require("./models/Movie");
const User = require("./models/User");

// trailerId = the part after "v=" in a YouTube link
const movies = [
  { title: "Inception", genre: "Sci-Fi", year: 2010, rating: "PG-13", trailerId: "YoHD9XEInc0",
    description: "A thief who steals secrets from dreams is given one last job: plant an idea inside someone's mind." },
  { title: "Interstellar", genre: "Sci-Fi", year: 2014, rating: "PG-13", trailerId: "zSWdZVtXT7E",
    description: "A team of explorers travels through a wormhole in space to find a new home for humanity." },
  { title: "The Matrix", genre: "Sci-Fi", year: 1999, rating: "R", trailerId: "vKQi3bBA1y8",
    description: "A hacker learns that the world he lives in is a simulation and joins a rebellion against the machines." },
  { title: "The Dark Knight", genre: "Action", year: 2008, rating: "PG-13", trailerId: "EXeTwQWrcwY",
    description: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into chaos." },
  { title: "Avengers: Endgame", genre: "Action", year: 2019, rating: "PG-13", trailerId: "TcMBFSGVi1c",
    description: "The Avengers assemble one more time to undo the damage caused by Thanos." },
  { title: "Spider-Man: No Way Home", genre: "Action", year: 2021, rating: "PG-13", trailerId: "JfVOs4VSpmA",
    description: "Peter Parker asks for help to make the world forget his secret, and things go very wrong." },
  { title: "Joker", genre: "Drama", year: 2019, rating: "R", trailerId: "zAGVQLHvwOY",
    description: "A lonely comedian is pushed to the edge by society and becomes a dangerous criminal." },
  { title: "Parasite", genre: "Drama", year: 2019, rating: "R", trailerId: "5xH0HfJHsaY",
    description: "A poor family slowly worms its way into the lives of a rich family, with surprising results." },
  { title: "Toy Story", genre: "Animation", year: 1995, rating: "G", trailerId: "v-PjgYDrg70",
    description: "A cowboy doll feels threatened when a shiny new space ranger toy arrives in his owner's room." },
  { title: "Frozen", genre: "Animation", year: 2013, rating: "PG", trailerId: "TbQm5doF_Uc",
    description: "Princess Anna sets out with a mountain man to find her sister Elsa, whose icy powers froze the kingdom." },
  { title: "Harry Potter and the Sorcerer's Stone", genre: "Fantasy", year: 2001, rating: "PG", trailerId: "VyHV0BRtdxo",
    description: "A boy discovers he is a wizard and begins his first year at Hogwarts School of Witchcraft and Wizardry." },
  { title: "Avatar", genre: "Fantasy", year: 2009, rating: "PG-13", trailerId: "5PSNL1qE6VY",
    description: "A marine on the alien world of Pandora is torn between following orders and protecting its people." },
  { title: "Inside Out", genre: "Animation", year: 2015, rating: "PG", trailerId: "yRUAzGQ3nSY",
    description: "Riley's family moves across the country, and the emotions inside her head struggle to help her settle in." },
  { title: "Knives Out", genre: "Mystery", year: 2019, rating: "PG-13", trailerId: "qGqiHJTsRkQ",
    description: "Detective Benoit Blanc interviews a novelist's quarrelsome family after the author dies on his birthday." },
  { title: "The Martian", genre: "Sci-Fi", year: 2015, rating: "PG-13", trailerId: "ej3ioOneTy8",
    description: "An astronaut stranded on Mars grows food and pieces together a radio while his crew plans a rescue." },
  { title: "Black Panther", genre: "Action", year: 2018, rating: "PG-13", trailerId: "xjDjIWPwcPU",
    description: "T'Challa returns to Wakanda to take the throne, where a challenger puts his claim and his country's future at risk." },
  { title: "The Batman", genre: "Mystery", year: 2022, rating: "PG-13", trailerId: "mqqft2x_Aa4",
    description: "A killer leaves riddles at Gotham crime scenes, drawing Batman into an investigation of the city's most powerful families." },
  { title: "Dune", genre: "Sci-Fi", year: 2021, rating: "PG-13", trailerId: "n9xhJrPXop4",
    description: "Paul Atreides travels to Arrakis when his family takes command of the desert planet's coveted spice harvest." },
];

const shows = [
  { title: "Stranger Things", genre: "Sci-Fi", year: 2016, rating: "TV-14", trailerId: "b9EkMc79ZSU",
    description: "A boy vanishes in Hawkins, Indiana. His friends meet a girl who may know what happened near the town's laboratory." },
  { title: "Wednesday", genre: "Mystery", year: 2022, rating: "TV-14", trailerId: "Di310WS8zLk",
    description: "Wednesday Addams investigates a series of attacks while learning to control her visions at Nevermore Academy." },
  { title: "Arcane", genre: "Animation", year: 2021, rating: "TV-14", trailerId: "4Ps6nV4wiCE",
    description: "Two sisters from Zaun take different sides as a new invention shifts the balance of power in neighboring Piltover." },
  { title: "One Piece", genre: "Fantasy", year: 2023, rating: "TV-14", trailerId: "Ades3pQbeh8",
    description: "In this live-action adventure, Monkey D. Luffy assembles a pirate crew to search for a legendary treasure." },
  { title: "The Last of Us", genre: "Drama", year: 2023, rating: "TV-MA", trailerId: "uLtkt8BonwM",
    description: "Joel agrees to guide a teenager across an America devastated by a fungal infection." },
  { title: "Emily in Paris", genre: "Comedy", year: 2020, rating: "TV-MA", trailerId: "lptctjAT-Mk",
    description: "A Chicago marketing executive lands a job in Paris and must win over clients and colleagues in a new language." },
];

async function replaceCatalog() {
  const titles = [
    ...movies.map((movie) => ({ ...movie, type: "Movie" })),
    ...shows.map((show) => ({ ...show, type: "Show" })),
  ].map((title) => ({
    ...title,
    posterUrl: "https://img.youtube.com/vi/" + title.trailerId + "/hqdefault.jpg",
  }));

  await User.updateMany({}, { $set: { myList: [], watching: [] } });
  await Movie.deleteMany({});
  await Movie.insertMany(titles);
  console.log(`Added ${movies.length} movies and ${shows.length} shows`);
}

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  try {
    await replaceCatalog();
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  require("dotenv").config();
  seed().catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  });
}

module.exports = { replaceCatalog };
