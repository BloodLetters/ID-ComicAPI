const { getComic, getPage, searchComic } = require("../lib/komiku");

const search = async (req, res) => {
    const { type, s } = req.query;
    try {
        if (type == undefined || s == undefined) {
            res.json({
                status: "error",
                message: "Params wrong"
            });
        } else {
            let searchResults = await searchComic(type, s);
            res.json(searchResults);
        }
    } catch (err) {
        res.json({
            status: "error",
            message: "Error in console. contact administrator!"
        });
        console.log(err);
    }
};

const getChapter = async (req, res) => {
    const { s } = req.query;
    try {
        if (s == undefined) {
            res.json({
                status: "error",
                message: "Params wrong"
            });
        } else {
            let info = await getPage(s);
            res.json(info);
        }
    } catch (err) {
        res.json({
            status: "error",
            message: "Error in console. contact administrator!"
        });
        console.log(err);
    }
};

const ping = (req, res) => {
    res.json({
        status: "success",
        message: "Pong!"
    })
}

const getInfo = async (req, res) => {
    const { type, s } = req.query;
    try {
        if (type == undefined || s == undefined) {
            res.json({
                status: "error",
                message: "Params wrong"
            });
        } else {
            let info = await getComic(type, s);
            res.json(info);
        }
    } catch (err) {
        res.json({
            status: "error",
            message: "Error in console. contact administrator!"
        });
        console.log(err);
    }
};

module.exports = {
    search,
    getChapter,
    getInfo,
    ping
};