const express = require("express");
const { Search, Chapter, Info } = require("../controllers/komikindoController");

const router = express.Router();

router.get("/komikindo/search/:type/:s", Search);
router.get("/komikindo/info/:type/:s", Info);
router.get("/komikindo/chapter/:s", Chapter);

module.exports = router;