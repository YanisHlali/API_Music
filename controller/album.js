const fs = require("fs");
const path = require("path");
const albumData = require("../data/album.json");
const trackData = require("../data/track.json");
const genreData = require("../data/genre.json");

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
    const trackIds = req.body.track_ids
      ? req.body.track_ids.split(",").map((trackId) => Number(trackId))
      : null;

    if (!genreId || !trackIds) {
      return res.status(400).send({ message: "Genre or tracks doesn't exist" });
    }

    // check if genre_id exists
    if (genreId) {
      const genre = genreData.find((genre) => genre.id === Number(genreId));
      if (!genre) {
        return res.status(400).send({ message: "Genre not found" });
      }
    }

    if (trackIds) {
      for (let i = 0; i < trackIds.length; i++) {
        let track = trackData.find((track) => track.id === trackIds[i]);
        if (!track) {
          return res.status(400).send({ message: "Tracks not found" });
        }
      }
    }

    const idDefault = albumData.length + 1; // Generate a new ID
    const newAlbum = {
      id: id ? Number(id) : idDefault,
      name,
      date,
      artist_id: Number(artistId),
      genre_id: Number(genreId),
      track_ids: trackIds,
    };
    albumData.push(newAlbum); // Add the new album to the albumData array
    updateAlbumDataFile(); // Write the updated album data to the JSON file
    return res.send(newAlbum); // Return the new album object
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
  console.log("Test", req.params);
  const artistId = req.params.artist_id;
  const album = albumData.filter(
    (album) => album.artist_id === Number(artistId)
  ); // Filter the albums by the matching artist ID
  res.send(album);
}

async function getAlbumByGenreId(req, res) {
  // Return all albums by genre ID
  const genreId = req.params.genre_id;
  const album = albumData.filter((album) => album.genre_id === Number(genreId)); // Filter the albums by the matching genre ID
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
    const trackIds = req.body.track_ids
      .split(",")
      .map((trackId) => Number(trackId));

    // Check if track_ids exists
    if (trackIds) {
      for (let i = 0; i < trackIds.length; i++) {
        let track = trackData.find((track) => track.id === trackIds[i]);
        if (!track) {
          // If the track doesn't exist, delete the track ID from the track_ids array
          trackIds.splice(i, 1);
        }
      }
    }

    const index = albumData.findIndex((album) => album.id === Number(id)); // Find the index of the album with the matching ID

    if (name) {
      albumData[index].name = name;
    }
    if (date) {
      albumData[index].date = date;
    }
    if (artistId) {
      albumData[index].artist_id = artistId;
    }
    if (genreId) {
      albumData[index].genre_id = genreId;
    }
    if (trackIds) {
      albumData[index].track_ids = trackIds;
    }

    updateAlbumDataFile(); // Write the updated album data to the JSON file
    res.send(albumData[index]); // Return the updated album object
  } else {
    res.sendStatus(404); // Return a 404 status code
  }
}

function addTrack(albumId, trackId) {
  const track = trackData.find((track) => track.id === Number(trackId)); // Find the track with the matching ID
  track.album_id = Number(albumId); // Add the album ID to the track
  const filePath = path.join(__dirname, "../data/track.json");
  fs.writeFileSync(filePath, JSON.stringify(trackData, null, 2));

  const index = albumData.findIndex((album) => album.id === Number(albumId)); // Find the index of the album with the matching ID
  albumData[index].track_ids.push(Number(trackId)); // Add the track ID to the album
  updateAlbumDataFile(); // Write the updated album data to the JSON file
  return albumData[index]; // Return the updated album object
}

async function addTrackRequest(req, res) {
  // Add a track to an album
  if (req.method === "POST") {
    // Check if the HTTP method is POST
    const id = req.body.id;
    const trackId = req.body.track_id;
    addTrack(id, trackId);
    res.send("Track added to album");
  } else {
    res.sendStatus(404); // Return a 404 status code
  }
}

function removeTrack(albumId, trackId) {
  const track = trackData.find((track) => track.id === Number(trackId)); // Find the track with the matching ID
  track.album_id = null; // Remove the album ID from the track
  const filePath = path.join(__dirname, "../data/track.json");
  fs.writeFileSync(filePath, JSON.stringify(trackData, null, 2));

  const index = albumData.findIndex((album) => album.id === Number(albumId)); // Find the index of the album with the matching ID
  const trackIndex = albumData[index].track_ids.findIndex(
    (track) => track === Number(trackId)
  ); // Find the index of the track with the matching ID
  albumData[index].track_ids.splice(trackIndex, 1); // Remove the track ID from the album
  updateAlbumDataFile(); // Write the updated album data to the JSON file
  return albumData[index]; // Return the updated album object
}

async function removeTrackRequest(req, res) {
  // Remove a track from an album
  if (req.method === "POST") {
    // Check if the HTTP method is POST
    const id = req.body.id;
    const trackId = req.body.track_id;

    removeTrack(id, trackId);
    res.send("Track deleted to album");
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
  deleteAlbumIdInTrackFile(id); // Delete the album_id in tracks to the JSON file
  updateAlbumDataFile(); // Write the updated album data to the JSON file
  res.send("Album deleted"); // Return a success message
}

function deleteAlbumIdInTrackFile(id) {
  // Delete the album_id in tracks to the JSON file
  const trackData = require("../data/track.json");
  // Find all tracks with the matching album_id
  const tracks = trackData.filter((track) => track.album_id === Number(id));
  // Delete the album_id in tracks
  tracks.forEach((track) => {
    track.album_id = null;
  });
  // Write the trackData array to the JSON file
  fs.writeFileSync(
    path.join(__dirname, "../data/track.json"),
    JSON.stringify(trackData)
  );
}
function updateAlbumDataFile() {
  // Write the albumData array to the JSON file
  fs.writeFileSync(
    path.join(__dirname, "../data/album.json"),
    JSON.stringify(albumData)
  );
}

module.exports = {
  addTrack,
  removeTrack,
  createAlbum,
  getAllAlbum,
  getAlbumById,
  getAlbumByName,
  getAlbumByDate,
  getAlbumByArtistId,
  getAlbumByGenreId,
  updateAlbum,
  addTrackRequest,
  removeTrackRequest,
  deleteAlbum,
};
