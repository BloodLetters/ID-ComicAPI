const express = require("express");
const cors = require('cors');

const { home, notfound, error} = require("./controllers/HandlerController");
const komikuRoutes = require("./routes/komikuRoutes");
const mangadexRoutes = require("./routes/mangadexRoutes");

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api", [komikuRoutes, mangadexRoutes]);
app.use("/", home)

app.use(home);
app.use(notfound);
app.use(error);

export default app;

// const port = 3000;
// app.listen(port, () => console.log(`Server running on port ${port}`));