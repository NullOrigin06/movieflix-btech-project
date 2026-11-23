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
  { title: "Oppenheimer", genre: "Drama", year: 2023, rating: "R", trailerId: "uYPbbksJxIg",
    description: "Physicist J. Robert Oppenheimer leads the secret project that changes the course of history and his own life." },
  { title: "Everything Everywhere All at Once", genre: "Sci-Fi", year: 2022, rating: "R", trailerId: "wxN1T1uxQ2g",
    description: "A stressed laundromat owner discovers that she alone may be able to save a strange and sprawling multiverse." },
  { title: "Top Gun: Maverick", genre: "Action", year: 2022, rating: "PG-13", trailerId: "giXco2jaZ_4",
    description: "A veteran pilot returns to train a new group of graduates for a dangerous mission that demands the impossible." },
  { title: "Ford v Ferrari", genre: "Drama", year: 2019, rating: "PG-13", trailerId: "I3h9Z89U9ZA",
    description: "An American designer and a fearless driver build a race car to challenge Ferrari at Le Mans." },
  { title: "The Social Network", genre: "Drama", year: 2010, rating: "PG-13", trailerId: "lB95KLmpLR4",
    description: "A university coding project becomes a global social network and leaves friendships and lawsuits in its wake." },
  { title: "La La Land", genre: "Romance", year: 2016, rating: "PG-13", trailerId: "0pdqf4P9MB8",
    description: "An aspiring actor and a jazz musician fall in love while pursuing their dreams in Los Angeles." },
  { title: "Coco", genre: "Animation", year: 2017, rating: "PG", trailerId: "Ga6RYejo6Hk",
    description: "A young musician enters the Land of the Dead to uncover the story behind his family's ban on music." },
  { title: "Blade Runner 2049", genre: "Sci-Fi", year: 2017, rating: "R", trailerId: "gCcx85zbxz4",
    description: "A new blade runner uncovers a secret that could change the fragile balance of a divided world." },
  { title: "Mad Max: Fury Road", genre: "Action", year: 2015, rating: "R", trailerId: "hEJnMQG9ev8",
    description: "A road warrior joins a rebel driver and a group of escapees fleeing a tyrant across the wasteland." },
  { title: "Get Out", genre: "Mystery", year: 2017, rating: "R", trailerId: "DzfpyUB60YY",
    description: "A weekend visit to meet his girlfriend's family leads a young photographer toward a disturbing discovery." },
  { title: "Arrival", genre: "Sci-Fi", year: 2016, rating: "PG-13", trailerId: "tFMo3UJ4B4g",
    description: "A linguist works to understand the visitors who have arrived on Earth before fear turns into conflict." },
  { title: "The Shawshank Redemption", genre: "Drama", year: 1994, rating: "R", trailerId: "6hB3S9bIaco",
    description: "Two prisoners build an unlikely friendship and hold on to hope through years behind bars." },
  { title: "Whiplash", genre: "Drama", year: 2014, rating: "R", trailerId: "7d_jQycdQGo",
    description: "A determined young drummer pushes himself to the limit under the demands of a strict instructor." },
  { title: "The Grand Budapest Hotel", genre: "Comedy", year: 2014, rating: "R", trailerId: "1Fg5iWmQjwk",
    description: "A famous concierge and his lobby boy become involved in a stolen painting and a family fortune." },
  { title: "Paddington 2", genre: "Family", year: 2017, rating: "PG", trailerId: "52x5HJ9H8DM",
    description: "Paddington takes a series of odd jobs to buy a special gift, then finds himself caught in a mystery." },
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
  { title: "Dark", genre: "Sci-Fi", year: 2017, rating: "TV-MA", trailerId: "rrwycJ08PSA",
    description: "A missing child draws four families into a mystery that stretches across generations in a small German town." },
  { title: "Money Heist", genre: "Crime", year: 2017, rating: "TV-MA", trailerId: "p_PJbmrX4uk",
    description: "A criminal mastermind recruits a crew for an ambitious robbery at the Royal Mint of Spain." },
  { title: "Breaking Bad", genre: "Crime", year: 2008, rating: "TV-MA", trailerId: "HhesaQXLuRY",
    description: "A chemistry teacher facing a terminal diagnosis enters the drug trade with a former student." },
  { title: "The Crown", genre: "Drama", year: 2016, rating: "TV-MA", trailerId: "JWtnJjn6ng0",
    description: "A young queen balances public duty, private life, and political change across decades of British history." },
  { title: "Squid Game", genre: "Thriller", year: 2021, rating: "TV-MA", trailerId: "oqxAJKy0ii4",
    description: "Hundreds of people in debt enter a series of children's games where losing has deadly consequences." },
  { title: "The Witcher", genre: "Fantasy", year: 2019, rating: "TV-MA", trailerId: "ndl1W4ltcmg",
    description: "A monster hunter travels through a dangerous world as his fate becomes tied to a princess with a secret." },
  { title: "The Office", genre: "Comedy", year: 2005, rating: "TV-14", trailerId: "tNcDHWpselE",
    description: "The everyday lives of office coworkers become a comedy of awkward meetings and workplace friendships." },
  { title: "Sherlock", genre: "Mystery", year: 2010, rating: "TV-14", trailerId: "xK7S9mrFWL4",
    description: "A sharp-minded detective and his flatmate solve unusual crimes across modern-day London." },
  { title: "Blue Planet II", genre: "Documentary", year: 2017, rating: "TV-PG", trailerId: "-E-_IRJU5g0",
    description: "A journey beneath the waves reveals the remarkable wildlife and changing habitats of the oceans." },
  { title: "The Good Place", genre: "Comedy", year: 2016, rating: "TV-14", trailerId: "9QxRbzFk3zk",
    description: "After arriving in an unusual afterlife neighborhood, Eleanor tries to become a better person." },
  { title: "Our Planet", genre: "Documentary", year: 2019, rating: "TV-PG", trailerId: "aETNYyrqNYE",
    description: "From forests to oceans, this nature series explores the habitats and animals sharing our planet." },
];

function buildCatalog() {
  return [
    ...movies.map((movie) => ({ ...movie, type: "Movie" })),
    ...shows.map((show) => ({ ...show, type: "Show" })),
  ].map((title) => ({
    ...title,
    posterUrl: "https://img.youtube.com/vi/" + title.trailerId + "/hqdefault.jpg",
  }));
}

async function replaceCatalog() {
  const titles = buildCatalog();

  // Stage the replacement first. A bad title must not wipe the working catalog.
  const inserted = await Movie.insertMany(titles);
  const insertedIds = inserted.map((title) => title._id);

  try {
    await User.updateMany({}, { $set: { myList: [], watching: [] } });
    await Movie.deleteMany({ _id: { $nin: insertedIds } });
  } catch (error) {
    // Keep the old catalog if the replacement cannot be completed.
    await Movie.deleteMany({ _id: { $in: insertedIds } }).catch(() => {});
    throw error;
  }
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

module.exports = { buildCatalog, replaceCatalog };
