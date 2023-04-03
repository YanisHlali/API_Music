const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const routeur = require("./routes/route");

app.use("/", routeur);

app.listen(port, () => {
     console.log("Ecoute du port " + port);
});
