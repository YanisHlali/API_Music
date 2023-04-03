const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routeur = require("./route/route");

app.use("/", routeur);

app.listen(port, () => {
     console.log("Ecoute du port " + port);
});
