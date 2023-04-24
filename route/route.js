const express = require("express");
const routeur = express.Router();
const albumController = require("../controller/album");
const artistController = require("../controller/artist");

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
  .get("/album/delete/:id", albumController.deleteAlbum);

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
  .post("/artist/update", artistController.updateArtist);

// Track routes
routeur
  .get("/track", trackController.getAllTrack)
  .get("/track/id/:id", trackController.getTrackById)
  .get("/track/name/:name", trackController.getTrackByName)
  .get("/track/popularity/:popularity", trackController.getTrackByPopularity)
  .get("/track/date/:date", trackController.getTrackByDate)
  .get("/artist/create", trackController.createTrack)
  .get("/artist/update", trackController.updateTrack);

module.exports = routeur;
