const express = require("express");
const cors = require('cors');

const { home, notfound, error} = require("./controllers/HandlerController");
const routes = require("./routes/komikuRoutes");

const app = express();
// app.use(cors);
const port = 3000;

app.use(express.json());
app.use("/api", routes);
app.use("/", home)

app.use(home);
app.use(notfound);
app.use(error);

app.listen(port, () => console.log(`Server running on port ${port}`));