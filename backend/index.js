const app = require("./app");
const connection = require("./config/db");
const userModel = require("./model/user_model");
// const UserModel = require("./model/user_model");
// const aqFarmModel = require("./model/farm/aqFarm_model");
// const aqFarmLoginModel = require("./model/farm/aqFarmLogin_model");
// const aqFarmingDetailsModel = require("./model/farm/aqFarmingDetails_model");

connection();
const port = 5000;

// app.get("/", (req, res) => {
//   res.send("Hello World!!!!");
// });

app.get("/profile", (req, res) => {
  userModel
    .findById(req.user.id)
    .select("-password") // Exclude the 'password' field from the response
    .then((user) => {
      if (user) {
        res.json(user);
        console.log("To check data validation", user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(port, () => {
  console.log(`Server Listening on Port http://localhost:${port}`);
});
