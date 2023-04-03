const fs = require("fs");
const path = require("path");
const artistData = require("../data/artist.json");

// --------------------- CREATE ---------------------

async function createArtist(req, res) {
     // Create a new artist
     if (req.method === "POST") {
          // Check if the HTTP method is POST
          const id = req.body.id;
          const name = req.body.name;
          const popularity = req.body.popularity;
          const nationality = req.body.nationality;

          const idDefault = artistData.length + 1; // Generate a new ID
          const newArtist = {
               id: id ? Number(id) : idDefault,
               name,
               popularity,
               nationality,
          };
          artistData.push(newArtist); // Add the new artist to the artistData array
          updateArtistDataFile(); // Write the updated artist data to the JSON file
          res.send(newArtist); // Return the new artist object
     } else {
          res.sendStatus(404); // Return a 404 status code
     }
}

// --------------------- GET ---------------------

async function getAllArtist(req, res) {
     // Return all artists
     res.send(artistData);
}

async function getArtistById(req, res) {
     // Return an artist by ID
     const id = req.params.id;
     const artist = artistData.find((artist) => artist.id === Number(id)); // Find the artist with the matching ID
     res.send(artist);
}

async function getArtistByName(req, res) {
     // Return an artist by name
     const name = req.params.name;
     const artist = artistData.find((artist) => artist.name === name); // Find the artist with the matching name
     res.send(artist);
}

async function getArtistByPopularity(req, res) {
     // Return an artist by popularity
     const popularity = req.params.popularity;
     const artist = artistData.find(
          (artist) => artist.popularity === Number(popularity)
     ); // Find the artist with the matching popularity
     res.send(artist);
}

async function getArtistByNationality(req, res) {
     const nationality = req.params.nationality;
     const artist = artistData.find(
          (artist) => artist.nationality === nationality
     );
     res.send(artist);
}

// --------------------- UPDATE ---------------------

async function updateArtist(req, res) {
     // Update an artist
     if (req.method === "PUT") {
          // Check if the HTTP method is PUT
          const id = req.body.id;
          const name = req.body.name;
          const popularity = req.body.popularity;
          const nationality = req.body.nationality;

          const index = artistData.findIndex(
               (artist) => artist.id === Number(id)
          ); // Find the index of the artist in the artistData array
          artistData[index].name = name;
          artistData[index].popularity = popularity;
          artistData[index].nationality = nationality;
          updateArtistDataFile(); // Write the updated artist data to the JSON file
          res.send(artistData[index]); // Return the updated artist object
     } else {
          res.sendStatus(404); // Return a 404 status code
     }
}

// --------------------- DELETE ---------------------

async function deleteArtist(req, res) {
     // Delete an artist
     const id = req.params.id;
     const artist = artistData.find((artist) => artist.id === Number(id)); // Find the artist with the matching ID
     artistData.splice(artistData.indexOf(artist), 1); // Remove the artist from the artistData array
     updateArtistDataFile(); // Write the updated artist data to the JSON file
     res.send("Artist deleted"); // Return the deleted artist object
}

async function updateArtistDataFile() {
     // Write the updated artist data to the JSON file
     const data = JSON.stringify(artistData, null, 2); // Convert the artistData array to a string
     fs.writeFileSync(path.join(__dirname, "../data/artist.json"), data); // Write the string to the JSON file
}

module.exports = {
     createArtist,
     getAllArtist,
     getArtistById,
     getArtistByName,
     getArtistByPopularity,
     getArtistByNationality,
     updateArtist,
     deleteArtist,
};
