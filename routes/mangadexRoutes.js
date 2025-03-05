const express = require("express");
const { Search, Chapter, Info } = require("../controllers/mangadexController");

const router = express.Router();

router.get("/mangadex/search/:type/:s?", Search);
router.get("/mangadex/search/page/:page/:type/:s", Search)

router.get("/mangadex/info/:type/:s", Info);
router.get("/mangadex/chapter/:s", Chapter);

module.exports = router;