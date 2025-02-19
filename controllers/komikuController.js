const { getComic, getPage, searchComic, getPopular } = require("../lib/komiku");

const handleResponse = (res, status, message, data = []) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

const Search = async (req, res) => {
    const { type, s } = req.params;
    if (!type || !s) {
        return handleResponse(res, 404, "Params not found!");
    }

    try {
        const searchResults = await searchComic(type, s);
        if (searchResults.length > 0) {
            handleResponse(res, 200, "List search comic", searchResults);
        } else {
            handleResponse(res, 404, "Not found!");
        }
    } catch (err) {
        console.error(err);
        handleResponse(res, 404, "Error in console. Contact administrator!");
    }
};

const Chapter = async (req, res) => {
    const { type, s } = req.params;
    if (!type || !s) {
        return handleResponse(res, 404, "Params wrong");
    }

    try {
        const info = await getPage(type, s);
        if (info.length > 0) {
            handleResponse(res, 200, "List chapter", info);
        } else {
            handleResponse(res, 404, "Not found!");
        }
    } catch (err) {
        console.error(err);
        handleResponse(res, 404, "Error in console. Contact administrator!");
    }
};

const Info = async (req, res) => {
    const { s } = req.params;
    if (!s) {
        return handleResponse(res, 404, "Params wrong");
    }

    try {
        const info = await getComic(s);
        handleResponse(res, 200, "Getting comic page", info);
    } catch (err) {
        console.error(err);
        handleResponse(res, 404, "Wrong query usage");
    }
};

const ping = (req, res) => {
    handleResponse(res, 200, "Pong!");
};

const Popular = async(req, res) => {
    try {
        const info = await getPopular();
        handleResponse(res, 200, "Getting comic popular", info);
    } catch (err) {
        console.error(err);
        handleResponse(res, 404, "Error in console. Contact administrator!");
    }
}

module.exports = {
    Search,
    Chapter,
    Info,
    ping,
    Popular
};