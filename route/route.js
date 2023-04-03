const express = require("express");
const routeur = express.Router();
const albumController = require("../controller/album");

routeur.get("/", (req, res) => {
     res.send("Hello World");
});

routeur.get("/album", (req, res) => {
     albumController.getAllAlbum().then((data) => {
          res.json(data);
     });
});

module.exports = routeur;
