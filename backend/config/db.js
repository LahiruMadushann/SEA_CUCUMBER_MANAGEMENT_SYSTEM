// MONGODB ATLAS CONNECTION

const mongoose = require("mongoose");

// const connectionParams = {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// };

const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jeevake:Jeevake@cluster0.sbjmf6j.mongodb.net/seacucumberdb?retryWrites=true&w=majority"
    );
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
