const express = require("express");
const path = require("path");
const controller = require("../controller/filecontroller");
const router = express.Router();

let routes = (app) => {
    router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

    router.post("/upload", controller.upload);
    router.get("/files", controller.getListFiles);
    router.get("/files/:name", controller.download);
    router.delete("/files/delete/:name", controller.remove);

    app.use(router);
}

module.exports = routes;