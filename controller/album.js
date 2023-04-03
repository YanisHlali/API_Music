const albumData = require("../data/album.json");
const fs = require("fs");
const path = require("path");
const artistData = require("../data/artist.json");
const genreData = require("../data/genre.json");

// --------------------- CREATE ---------------------

async function createAlbum(album) {
     albumData.push(album);
     fs.writeFileSync(
          path.join(__dirname, "../data/album.json"),
          JSON.stringify(albumData)
     );
     return album;
}

// --------------------- GET ---------------------

async function getAllAlbum() {
     return albumData;
}

async function getAlbumById(id) {
     return albumData.find((album) => album.id === id);
}

async function getAlbumByName(name) {
     return albumData.find((album) => album.name === name);
}

async function getAlbumByDate(date) {
     return albumData.find((album) => album.date === date);
}

async function getAlbumByArtistId(artistId) {
     const artist = artistData.find((artist) => artist.id === artistId);
     return albumData.filter((album) => album.artist === artist.name);
}

async function getAlbumByGenreId(genreId) {
     const genre = genreData.find((genre) => genre.id === genreId);
     return albumData.filter((album) => album.genre === genre.name);
}

// --------------------- UPDATE ---------------------

async function updateAlbum(id, album) {
     const index = albumData.findIndex((album) => album.id === id);
     albumData[index] = album;

     fs.writeFileSync(
          path.join(__dirname, "../data/album.json"),
          JSON.stringify(albumData)
     );

     return album;
}

async function updateAlbumName(id, name) {
     const index = albumData.findIndex((album) => album.id === id);
     albumData[index].name = name;

     fs.writeFileSync(
          path.join(__dirname, "../data/album.json"),
          JSON.stringify(albumData)
     );

     return albumData[index];
}

async function updateAlbumDate(id, date) {
     const index = albumData.findIndex((album) => album.id === id);
     albumData[index].date = date;

     fs.writeFileSync(
          path.join(__dirname, "../data/album.json"),
          JSON.stringify(albumData)
     );

     return albumData[index];
}

// --------------------- DELETE ---------------------

async function deleteAlbum(id) {
     const index = albumData.findIndex((album) => album.id === id);
     albumData.splice(index, 1);
     fs.writeFileSync(
          path.join(__dirname, "../data/album.json"),
          JSON.stringify(albumData)
     );
     return albumData;
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
     updateAlbumName,
     updateAlbumDate,
     deleteAlbum,
};
