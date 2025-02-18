const express = require("express");
const cors = require('cors');
const routes = require("./routes/komikuRoutes");

const app = express();
app.use(cors);
const port = 3000;

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => console.log(`Server berjalan di port ${port}`));