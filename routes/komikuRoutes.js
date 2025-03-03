const express = require("express");
const { Search, Chapter, ping, Info, Popular, Filter } = require("../controllers/komikuController");

const router = express.Router();

router.get("/komiku/search/:type/:s?", Search);
router.get("/komiku/search/page/:page/:type/:s", Search)

router.get("/komiku/info/:type/:s", Info);

router.get("/komiku/chapter/:s", Chapter);

// list filter
router.get("/komiku/list", Filter);

router.get("/komiku/popular", Popular);
router.get("/komiku/ping", ping);

module.exports = router;
