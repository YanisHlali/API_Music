const fs = require("fs");
const path = require("path");
const albumData = require("../data/album.json");

// --------------------- CREATE ---------------------

async function createAlbum(req, res) {
     // Create a new album
     if (req.method === "POST") {
          // Check if the HTTP method is POST
          const id = req.body.id;
          const name = req.body.name;
          const date = req.body.date;
          const artistId = req.body.artist_id;
          const genreId = req.body.genre_id;
          const trackIds = req.body.track_ids;

          const idDefault = albumData.length + 1; // Generate a new ID
          const newAlbum = {
               id: id ? Number(id) : idDefault,
               name,
               date,
               artist_id: artistId,
               genre_id: genreId,
               track_ids: trackIds,
          };
          albumData.push(newAlbum); // Add the new album to the albumData array
          updateAlbumDataFile(); // Write the updated album data to the JSON file
          res.send(newAlbum); // Return the new album object
     } else {
          res.sendStatus(404); // Return a 404 status code
     }
}

// --------------------- GET ---------------------

async function getAllAlbum(req, res) {
     // Return all albums
     res.send(albumData);
}

async function getAlbumById(req, res) {
     // Return an album by ID
     const id = req.params.id;
     const album = albumData.find((album) => album.id === Number(id)); // Find the album with the matching ID
     res.send(album);
}

async function getAlbumByName(req, res) {
     // Return an album by name
     const name = req.params.name;
     const album = albumData.find((album) => album.name === name); // Find the album with the matching name
     res.send(album);
}

async function getAlbumByDate(req, res) {
     // Return an album by date
     const date = req.params.date;
     const album = albumData.find((album) => album.date === date); // Find the album with the matching date
     res.send(album);
}

async function getAlbumByArtistId(req, res) {
     // Return all albums by artist ID
     console.log('Test', req.params)
     const artistId = req.params.artist_id;
     const album = albumData.filter(
          (album) => album.artist_id === Number(artistId)
     ); // Filter the albums by the matching artist ID
     res.send(album);
}

async function getAlbumByGenreId(req, res) {
     // Return all albums by genre ID
     const genreId = req.params.genre_id;
     const album = albumData.filter(
          (album) => album.genre_id === Number(genreId)
     ); // Filter the albums by the matching genre ID
     res.send(album);
}

// --------------------- UPDATE ---------------------

async function updateAlbum(req, res) {
     // Update an album by ID
     if (req.method === "POST") {
          // Check if the HTTP method is POST
          const id = req.body.id;
          const name = req.body.name;
          const date = req.body.date;
          const artistId = req.body.artist_id;
          const genreId = req.body.genre_id;
          const trackIds = req.body.track_ids;

          const index = albumData.findIndex((album) => album.id === Number(id)); // Find the index of the album with the matching ID
          albumData[index].name = name;
          albumData[index].date = date;
          albumData[index].artist_id = artistId;
          albumData[index].genre_id = genreId;
          albumData[index].track_ids = trackIds;

          updateAlbumDataFile(); // Write the updated album data to the JSON file
          res.send(albumData[index]); // Return the updated album object
     } else {
          res.sendStatus(404); // Return a 404 status code
     }
}

// --------------------- DELETE ---------------------

async function deleteAlbum(req, res) {
     // Delete an album by ID
     const id = req.params.id;
     const index = albumData.findIndex((album) => album.id === Number(id)); // Find the index of the album with the matching ID
     albumData.splice(index, 1); // Remove the album from the albumData array
     updateAlbumDataFile(); // Write the updated album data to the JSON file
     res.send("Album deleted"); // Return a success message
}

function updateAlbumDataFile() {
     // Write the albumData array to the JSON file
     fs.writeFileSync(
          path.join(__dirname, "../data/album.json"),
          JSON.stringify(albumData)
     );
}

module.exports = {
     createAlbum,
     getAllAlbum,
     getAlbumById,
     getAlbumByName,
     getAlbumByDate,
     getAlbumByArtistId,
     getAlbumByGenreId,
     updateAlbum,
     deleteAlbum,
};
