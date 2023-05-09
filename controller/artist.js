const fs = require("fs");
const path = require("path");
const artistData = require("../data/artist.json");
const albumData = require("../data/album.json");

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

    const index = artistData.findIndex((artist) => artist.id === Number(id)); // Find the index of the artist in the artistData array
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

  if (!artist) {
    return res.status(404).send({ message: "Artist not found" });
  }

  const allAlbums = albumData.filter((album) => album.artist_id === Number(id)); // Find all albums with the matching artist ID
  allAlbums.forEach((album) => {
    // Remove the tracks from the trackData array
    album.track_ids.forEach((trackId) => {
      const trackIndex = trackData.findIndex((track) => track.id === trackId);
      if (trackIndex !== -1) {
        trackData.splice(trackIndex, 1);
      }
    });

    // Remove the albums from the albumData array
    const index = albumData.findIndex((a) => a.id === album.id); // Find the index of the album in the albumData array
    albumData.splice(index, 1); // Remove the album from the albumData array
  });

  const index = artistData.findIndex((artist) => artist.id === Number(id)); // Find the index of the artist in the artistData array
  artistData.splice(index, 1); // Remove the artist from the artistData array

  updateArtistDataFile(); // Write the updated artist data to the JSON file
  updateAlbumDataFile(); // Write the updated album data to the JSON file
  updateTrackDataFile(); // Write the updated track data to the JSON file
  res.send("Artist deleted"); // Return the deleted artist object
}

async function updateArtistDataFile() {
  // Write the updated artist data to the JSON file
  const data = JSON.stringify(artistData, null, 2); // Convert the artistData array to a string
  fs.writeFileSync(path.join(__dirname, "../data/artist.json"), data); // Write the string to the JSON file
}

async function updateAlbumDataFile() {
  // Write the albumData array to the JSON file
  fs.writeFileSync(
    path.join(__dirname, "../data/album.json"),
    JSON.stringify(albumData)
  );
}

async function updateTrackDataFile() {
  // Write the updated track data to the JSON file
  const data = JSON.stringify(trackData, null, 2); // Convert the trackData array to a string
  fs.writeFileSync(path.join(__dirname, "../data/track.json"), data); // Write the string to the JSON file
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
