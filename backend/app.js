const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const loginRoute = require("./routers/login_router");
const adminRoute = require("./routers/admin_routes");
const farmMngUsersRoute = require("./routers/farmMngUsers_routes");
const exporterRoute = require("./routers/exporter_routes");
const fishProcesserRoute = require("./routers/fishProcessers_routes");
const MinisterRoute = require("./routers/minister_routes");
const districtAquaCulturistRoute = require("./routers/districtAquaCulturist_routes");
const farmerRoute = require("./routers/farmer_routes");
const fishermanRoute = require("./routers/fisherman_routes");
const userRoute = require("./routers/user_routes");

const farmDashboardRoute = require("./routers/farmDashboard_routes");
const fisheriesDashboardRoute = require("./routers/fisheriesDashboard_routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

//GLOBAL ERROR HANDLING
function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}

app.use("/", userRoute);
app.use("/", loginRoute);
app.use("/", adminRoute);
app.use("/", farmMngUsersRoute);
app.use("/", exporterRoute);
app.use("/", fishProcesserRoute);
app.use("/", MinisterRoute);
app.use("/", districtAquaCulturistRoute);
app.use("/", farmerRoute);
app.use("/", fishermanRoute);

app.use("/", farmDashboardRoute);
app.use("/", fisheriesDashboardRoute);

app.use("/image", express.static("images"));
app.use(errHandler);

app.use(
  "/profile-pics",
  express.static(path.join(__dirname, "Images/profilePics"))
);

app.use(
  "/farm-pics",
  express.static(path.join(__dirname, "Images/farmImages"))
);

module.exports = app;
