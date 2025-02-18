const express = require("express");
const { search, getChapter, ping, getInfo } = require("../controllers/komikuController");

const router = express.Router();

router.get("/komiku/search", search);
router.get("/komiku/chapter", getChapter);
router.get("/komiku/info", getInfo);
router.get("/komiku/ping", ping);

module.exports = router;
