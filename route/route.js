const express = require("express");
const routeur = express.Router();
const albumController = require("../controller/album");

routeur.get("/", (req, res) => {
     res.send("Hello World");
});

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

module.exports = routeur;
