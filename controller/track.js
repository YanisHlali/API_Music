const fs = require("fs");
const path = require("path");
const trackData = require("../data/track.json");
const albumData = require("../data/album.json");
const albumController = require("./album");

// --------------------- CREATE ---------------------

async function createTrack(req, res) {
  // Create a new track
  if (req.method === "POST") {
    // Check if the HTTP method is POST
    const id = req.body.id;
    const name = req.body.name;
    const popularity = req.body.popularity;
    const date = req.body.date;
    const time = req.body.time;
    const albumId = req.body.album_id;

    const idDefault = trackData.length + 1; // Generate a new ID
    const newTrack = {
      id: id ? Number(id) : idDefault,
      name,
      popularity,
      date,
      time,
      album_id: albumId,
    };
    trackData.push(newTrack); // Add the new track to the trackData array
    updateTrackDataFile(); // Write the updated track data to the JSON file
    res.send(newTrack); // Return the new track object
  } else {
    res.sendStatus(404); // Return a 404 status code
  }
}

// --------------------- GET ---------------------

async function getAllTrack(req, res) {
  // get all tracks
  res.send(trackData);
}

async function getTrackById(req, res) {
  // Return a track by ID
  const id = req.params.id;
  const track = trackData.find((track) => track.id === Number(id)); // Find the track with the matching ID
  res.send(track);
}

async function getTrackByName(req, res) {
  // Return a track by name
  const name = req.params.name;
  const track = trackData.find((track) => track.name === name); // Find the track with the matching name
  res.send(track);
}

async function getTrackByPopularity(req, res) {
  // Return a track by popularity
  const popularity = req.params.popularity;
  const track = trackData.find(
    (track) => track.popularity === Number(popularity)
  ); // Find the track with the matching popularity
  res.send(track);
}

async function getTrackByDate(req, res) {
  // Return a track by date
  const date = req.params.date;
  const track = trackData.find((track) => track.date === date); // Find the track with the matching date
  res.send(track);
}

async function getTrackByTime(req, res) {
  // Return a track by time
  const time = req.params.time;
  const track = trackData.find((track) => track.time === time); // Find the track with the matching time
  res.send(track);
}

// --------------------- UPDATE ---------------------

async function updateTrack(req, res) {
  // Update a track by ID
  if (req.method === "POST") {
    // Check if the HTTP method is PUT
    const id = req.body.id;
    const name = req.body.name ? req.body.name : null;
    const popularity = req.body.popularity ? req.body.popularity : null;
    const date = req.body.date ? req.body.date : null;
    const time = req.body.time ? req.body.time : null;
    const albumId = req.body.album_id ? req.body.album_id : null;

    const track = trackData.find((track) => track.id === Number(id)); // Find the track with the matching ID
    if (track) {
      // If the track exists
      track.name = name ? name : track.name; // Update the name
      track.popularity = popularity ? popularity : track.popularity; // Update the popularity
      track.date = date ? date : track.date; // Update the date
      track.time = time ? time : track.time; // Update the time
      track.album_id = albumId ? albumId : track.album_id; // Update the album ID
      updateTrackDataFile(); // Write the updated track data to the JSON file
      res.send(track); // Return the updated track object
    } else {
      res.sendStatus(404); // Return a 404 status code
    }
  }
}

async function updateAlbumId(req, res) {
  // Set the album ID of a track
  if (req.method === "POST") {
    // Check if the HTTP method is PUT
    const id = Number(req.params.id);
    const albumId = Number(req.body.album_id);

    const track = trackData.find((track) => track.id === Number(id)); // Find the track with the matching ID
    console.log(track);

    const newAlbum = albumData.find((album) => album.id === albumId); // Find the new album with the matching ID
    const oldAlbum = albumData.find((album) => album.id === track.album_id); // Find the old album with the matching ID

    // If old album is not null and different from the new album
    if (oldAlbum && oldAlbum.id !== albumId) {
      albumController.removeTrack(track.album_id, id); // Remove the track ID from the old album
    }

    if (track && newAlbum) {
      // If the track and new album exist
      track.album_id = albumId; // Update the album ID of the track
      updateTrackDataFile(); // Write the updated track data to the JSON file

      albumController.addTrack(albumId, id); // Add the track ID to the album

      res.send(track); // Return the updated track object
    } else {
      res.sendStatus(404); // Return a 404 status code
    }
  }
}

// --------------------- DELETE ---------------------

async function deleteTrack(req, res) {
  // Delete a track by ID
  const id = req.params.id;
  const track = trackData.find((track) => track.id === Number(id)); // Find the track with the matching ID
  if (track) {
    // If the track exists
    const index = trackData.indexOf(track); // Find the index of the track
    trackData.splice(index, 1); // Remove the track from the trackData array
    deleteTrackIdInAlbumFile(id); // Delete the track_id in albums to the JSON file
    updateTrackDataFile(); // Write the updated track data to the JSON file
    res.send(track); // Return the deleted track object
  } else {
    res.sendStatus(404); // Return a 404 status code
  }
}

function deleteTrackIdInAlbumFile(id) {
  // Delete the track_id in albums to the JSON file
  const albumData = require("../data/album.json");
  albumData.forEach((album) => {
    if (album.track_ids.includes(Number(id))) {
      const index = album.track_ids.indexOf(Number(id));
      album.track_ids.splice(index, 1);
    }
  });

  // Write the updated album data to the JSON file
  const filePath = path.join(__dirname, "../data/album.json");
  fs.writeFileSync(filePath, JSON.stringify(albumData, null, 2));
}

async function updateTrackDataFile() {
  // Write the updated track data to the JSON file
  const filePath = path.join(__dirname, "../data/track.json");
  fs.writeFileSync(filePath, JSON.stringify(trackData, null, 2));
}

module.exports = {
  createTrack,
  getAllTrack,
  getTrackById,
  getTrackByName,
  getTrackByPopularity,
  getTrackByDate,
  getTrackByTime,
  updateTrack,
  updateAlbumId,
  deleteTrack,
  updateTrackDataFile,
};
