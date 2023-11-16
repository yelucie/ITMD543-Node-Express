const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();

global.__basedir = __dirname;

let port = 8080;

var corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, 'public')));

const initRoutes = require("./routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
})