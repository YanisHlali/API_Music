const fs = require("fs");
const path = require("path");
const genreData = require("../data/genre.json");

// --------------------- CREATE ---------------------

async function createGenre(req, res) {
  // Create a new genre
  if (req.method === "POST") {
    // Check if the HTTP method is POST
    const id = req.body.id;
    const name = req.body.name;

    const idDefault = genreData.length + 1; // Generate a new ID
    const newGenre = {
      id: id ? Number(id) : idDefault,
      name,
    };
    genreData.push(newGenre); // Add the new genre to the genreData array
    updategenreDataFile(); // Write the updated genre data to the JSON file
    res.send(newGenre); // Return the new genre object
  } else {
    res.sendStatus(404); // Return a 404 status code
  }
}

// --------------------- GET ---------------------

async function getAllGenre(req, res) {
  // Return all genres
  res.send(genreData);
}

async function getGenreById(req, res) {
  // Return an artist by ID
  const id = req.params.id;
  const genre = genreData.find((genre) => genre.id === Number(id)); // Find the genre with the matching ID
  res.send(genre);
}

async function getGenreByName(req, res) {
  // Return an genre by name
  const name = req.params.name;
  const genre = genreData.find((genre) => genre.name === name); // Find the genre with the matching name
  res.send(genre);
}

// --------------------- UPDATE ---------------------

async function updateGenre(req, res) {
  // Update an genre
  if (req.method === "PUT") {
    // Check if the HTTP method is PUT
    const id = req.body.id;
    const name = req.body.name;

    const index = genreData.findIndex((genre) => genre.id === Number(id)); // Find the index of the genre in the genreData array
    genreData[index].name = name;
    updateGenreDataFile(); // Write the updated genre data to the JSON file
    res.send(genreData[index]); // Return the updated genre object
  } else {
    res.sendStatus(404); // Return a 404 status code
  }
}

// --------------------- DELETE ---------------------

async function deleteGenre(req, res) {
  // Delete an genre
  const id = req.params.id;
  const genre = genreData.find((genre) => genre.id === Number(id)); // Find the genre with the matching ID
  genreData.splice(genreData.indexOf(genre), 1); // Remove the genre from the genreData array
  updateGenreDataFile(); // Write the updated genre data to the JSON file
  res.send("Genre deleted"); // Return the deleted genre object
}

async function updateGenreDataFile() {
  // Write the updated genre data to the JSON file
  const data = JSON.stringify(genreData, null, 2); // Convert the genreData array to a string
  fs.writeFileSync(path.join(__dirname, "../data/genre.json"), data); // Write the string to the JSON file
}

module.exports = {
  createGenre,
  getAllGenre,
  getGenreById,
  getGenreByName,
  updateGenre,
  deleteGenre,
};
