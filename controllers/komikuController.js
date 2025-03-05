const { getComic, getPage, searchComic, getPopular, getList } = require("../lib/komiku");

const handleResponse = (res, status, message, data = []) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

const Search = async (req, res) => {
    const { type, s } = req.params;
    let genre = req.query.genre;

    const genreList = Array.isArray(genre)
        ? genre
        : genre
        ? genre.split(',').map(g => g.trim())
        : [];

    const searchQuery = s || "";

    try {
        const searchResults = await searchComic(type, searchQuery, genreList);
        if (searchResults.results.length > 0) {
            handleResponse(res, 200, "List search comic", searchResults);
        } else {
            handleResponse(res, 404, "Not found");
        }
    } catch (err) {
        console.error(err);
        handleResponse(res, 500, "Error in console. Contact administrator!");
    }
};




const Chapter = async (req, res) => {
    const { s } = req.params;
    if (!s) {
        return handleResponse(res, 404, "Params wrong");
    }

    try {
        const info = await getPage(s);
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

const Filter = async (req, res) => {
    const { filter } = req.query;
    const genre = req.query.genre;
    
    try {
        const info = await getList(filter);
        if (info.error) {
            handleResponse(res, 500, "Failed to get comic list", info.error);
        } else {
            handleResponse(res, 200, "Getting comic list", info.data);
        }
    } catch (err) {
        console.error(err);
        handleResponse(res, 500, "Internal server error");
    }
};

const Info = async (req, res) => {
    const {type, s } = req.params;
    if (!type || !s) {
        return handleResponse(res, 404, "Params wrong");
    }

    try {
        const info = await getComic(type, s);
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
    Popular,
    Filter
};