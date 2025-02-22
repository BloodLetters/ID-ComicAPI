const { getComic, getChapter, SearchComic, ping } = require('../lib/komikindo');

const handleResponse = (res, status, message, data = []) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

const Info = async (req, res) => {
    const { type, s } = req.params;
    if (!type || !s) {
        return handleResponse(res, 404, "Params not found!");
    }

    try {
        const info = await getComic(type, s);
        handleResponse(res, 200, "Getting comic page", info);
    } catch (err) {
        console.error(err);
        handleResponse(res, 404, "Something error just happened. try again later");
    }
    
};

const Chapter = async (req, res) => {
    const { s } = req.params;
    if (!s) {
        return handleResponse(res, 404, "Params not found!");
    }

    try {
        const info = await getChapter(s);
        handleResponse(res, 200, "List chapter", info);
    } catch (err) {
        console.error(err);
        handleResponse(res, 404, "Error in console. Contact administrator!");
    }
};

const Search = async (req, res) => {
    const { type, s, page } = req.params;
    if (!type || !s) {
        return handleResponse(res, 404, "Params not found!");
    }

    try {
        const searchResults = await SearchComic(type, s, page);
        handleResponse(res, 200, "List search comic", searchResults);
    } catch (err) {
        console.error(err);
        handleResponse(res, 404, "Error in console. Contact administrator!");
    }
};

module.exports = { Search, Info, Chapter };