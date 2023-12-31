// MONGODB ATLAS CONNECTION
require("dotenv").config();

const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDb Connected");
  } catch (error) {
    console.log("MongoDb connection error");
  }
};

module.exports = connection;

//MONGODB HOST CONNECTION
// const mongoose = require("mongoose");

// const connection = mongoose
//   .createConnection("mongodb://127.0.0.1:27017/seaCucumberDB")
//   .on("open", () => {
//     console.log("MongoDb Connected");
//   })
//   .on("error", () => {
//     console.log("MongoDb connection error");
//   });

// module.exports = connection;
