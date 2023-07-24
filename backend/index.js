const app = require("./app");
const connection = require("./config/db");
// const UserModel = require("./model/user_model");
// const aqFarmModel = require("./model/farm/aqFarm_model");
// const aqFarmLoginModel = require("./model/farm/aqFarmLogin_model");
// const aqFarmingDetailsModel = require("./model/farm/aqFarmingDetails_model");

connection();
const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!!!!");
// });

app.listen(port, () => {
  console.log(`Server Listening on Port http://localhost:${port}`);
});
