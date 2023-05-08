const express = require("express");
const routeur = express.Router();
const albumController = require("../controller/album");
const artistController = require("../controller/artist");
const genreController = require("../controller/genre");
const trackController = require("../controller/track");

routeur.get("/", (req, res) => {
  res.send("Hello World");
});

// Album routes
routeur
  .get("/album", albumController.getAllAlbum)
  .get("/album/id/:id", albumController.getAlbumById)
  .get("/album/name/:name", albumController.getAlbumByName)
  .get("/album/date/:date", albumController.getAlbumByDate)
  .get("/album/artist/:artistId", albumController.getAlbumByArtistId)
  .get("/album/genre/:genreId", albumController.getAlbumByGenreId)
  .post("/album/create", albumController.createAlbum)
  .post("/album/update", albumController.updateAlbum)
  .get("/album/delete/:id", albumController.deleteAlbum)
  .post("/album/addTrack", albumController.addTrackRequest)
  .post("/album/removeTrack", albumController.removeTrackRequest);

// Artist routes
routeur
  .get("/artist", artistController.getAllArtist)
  .get("/artist/id/:id", artistController.getArtistById)
  .get("/artist/name/:name", artistController.getArtistByName)
  .get("/artist/popularity/:popularity", artistController.getArtistByPopularity)
  .get(
    "/artist/nationality/:nationality",
    artistController.getArtistByNationality
  )
  .post("/artist/create", artistController.createArtist)
  .post("/artist/update", artistController.updateArtist)
  .get("/artist/delete/:id", artistController.deleteArtist);

// Genre routes (id, name)
routeur
  .get("/genre", genreController.getAllGenre)
  .get("/genre/id/:id", genreController.getGenreById)
  .get("/genre/name/:name", genreController.getGenreByName)
  .post("/genre/create", genreController.createGenre)
  .post("/genre/update", genreController.updateGenre)
  .get("/genre/delete/:id", genreController.deleteGenre);

// Track routes
routeur
  .get("/track", trackController.getAllTrack)
  .get("/track/id/:id", trackController.getTrackById)
  .get("/track/name/:name", trackController.getTrackByName)
  .get("/track/popularity/:popularity", trackController.getTrackByPopularity)
  .get("/track/date/:date", trackController.getTrackByDate)
  .get("/track/time/:time", trackController.getTrackByTime)
  .post("/track/create", trackController.createTrack)
  .post("/track/update", trackController.updateTrack)
  .get("/track/delete/:id", trackController.deleteTrack)
  .post("/track/updateAlbum/:id", trackController.updateAlbumId);

module.exports = routeur;
