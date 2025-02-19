const home = async (req, res) => {
    res.status(200).json({
        status: 200,
        source: "https://github.com/BloodLetters/ID-ComicAPI",
        message: "Hello!",
        data: []
    });
};

const notfound = async (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Route not found!',
        data: []
    });
}

const error = async (err, req, res) => {
    console.error(err.stack);
    res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        data: []
    });
}

module.exports = { home, notfound, error };