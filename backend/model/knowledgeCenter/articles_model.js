const mongoose = require("mongoose");
const db = require("../../config/db");

const { Schema } = mongoose;

const articlesSchema = new Schema({
  category: {
    type: String, // speciesRelated / fisheriesRelated / farmingRealted / exportRelated / processingRelated
  },
  heading: {
    type: String,
  },
  content: {
    type: String,
  },
  conclusion: {
    type: String,
  },
  author: {
    type: String,
  },
  link: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const articlesModel = mongoose.model("articles", articlesSchema);

module.exports = articlesModel;
