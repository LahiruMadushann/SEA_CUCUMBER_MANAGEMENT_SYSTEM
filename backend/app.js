const express = require("express");
const bodyParser = require("body-parser");

const UserRoute = require("./routers/login_router");
const adminRoute = require("./routers/admin_routes");
const farmMngUsersRoute = require("./routers/farmMngUsers_routes");
const exporterRoute = require("./routers/exporter_routes");
const fishProcesserRoute = require("./routers/fishProcessers_routes");
const MinisterRoute = require("./routers/minister_routes");
const districtAquaCulturistRoute = require("./routers/districtAquaCulturist_routes");
const farmerRoute = require("./routers/farmer_routes");

const app = express();

app.use(bodyParser.json());

app.use("/", UserRoute);
app.use("/", adminRoute);
app.use("/", farmMngUsersRoute);
app.use("/", exporterRoute);
app.use("/", fishProcesserRoute);
app.use("/", MinisterRoute);
app.use("/", districtAquaCulturistRoute);
app.use("/", farmerRoute);

module.exports = app;
