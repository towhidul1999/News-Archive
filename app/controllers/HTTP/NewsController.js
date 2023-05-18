const response = require("../../../app/responses/Response");
const Handler = require("../../../app/errors/Handler");
const { list } = require("../../permissions/Permission");
const { db } = require("../../helpers");

const NewsService = require("../../services/NewsService");

module.exports = {
    newsCreate: async function (req, res) {
        try {
            const newNews = await NewsService.newsCreate({
                link: req.body.link,
                title: req.body.title,
                description: req.body.description,
                image: req.body.image,
                category_id: req.body.category_id,
                topic_id: req.body.topic_id,
                created_by: req.nativeAuth.user,
              });
              return response.dispatch("News Created successfully", { newNews }, res, 200);  
        } catch (error) {
            return response.error(Handler(error), res);
        }
    }

}