const mongoose = require("mongoose");
const { Schema } = mongoose;

const newsSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  //WHETHER IT IS A NEWS / RULES OR REGULATIONS
  type: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
  },

  //POSTED PERSON
  postedBy: {
    type: String,
    required: true,
  },

  //POSTED TO FISHERIES / AQUACULTURE / ALL
  postedTo: {
    type: String,
  },
});

const newsModel = mongoose.model("News", newsSchema);

module.exports = newsModel;
