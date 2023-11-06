const ArticleModel = require("../model/knowledgeCenter/articles_model");

class knowledgeCenterService {
  //GET ALL ARTICLES
  static async getAllArticles() {
    const allArticles = await ArticleModel.find();
    return allArticles;
  }

  //GET ALL DISTINCT ARTICLES CATEGORY
  static async getAllArticleCategories() {
    const allArticlesCategories = await ArticleModel.distinct("category");
    return allArticlesCategories;
  }

  static async updateArticles(userId, category,heading,content,link) {
    
    const updateArticles = await ArticleModel.findByIdAndUpdate(
      { _id: userId },

      {
        // accountStatus: "Active",
        category: category,
        heading: heading,
        content: content,
        link: link,
      }
    );
    
    return updateArticles;
  }

  // //GET SINGLE SEA CUCUMBER DETAILS
  // static async getSingleSpeciesDetails(speciesId) {
  //   const singleSpeciesDeatials = await knowledgeCenterModel.find({
  //     _id: speciesId,
  //   });
  //   return singleSpeciesDeatials;
  // }
}

module.exports = knowledgeCenterService;
