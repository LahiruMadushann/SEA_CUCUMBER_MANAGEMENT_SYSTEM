const mongoose = require("mongoose");
const { Schema } = mongoose;

const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  //WHETHER IT IS A NEWS / RULES OR REGULATIONS / SEACUCUMBER RATES
  type: {
    type: String,
    required: true,
  },

  speciesType: {
    type: String,
  },

  rates: {
    type: Number,
  },

  date: {
    type: Date,
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
