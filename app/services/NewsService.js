const News = require("../models/mongoose/News");
const NewsLink = require("../models/mongoose/NewsLink")
const NotFoundError = lulu.use("app/errors/NotFoundError");
const ResourceAlreadyExistsError = lulu.use(
  "app/errors/ResourceAlreadyExistsError"
);
const { db } = lulu.use("app/helpers");

async function newsCreate(data){

    for (let i = 0; i < data.category_id.length; i++) {
        if (!db.isValidObjectId(data.category_id[i])) {
          return null;
        }
      }

      for (let i = 0; i < data.topic_id.length; i++) {
        if (!db.isValidObjectId(data.topic_id[i])) {
          return null;
        }
      }  

      const newsLink  = await NewsLink.create({
            link: data.link,
            created_by: data.created_by,
        })
       const news =  await News.create({
        title: data.title,
        description: data.description,
        image: data.image,
        category_id: data.category_id,
        topic_id: data.topic_id,
        created_by: data.created_by,
    })

    return { 
        newsLink,
        news
    };
}


module.exports = {
  newsCreate
  };
  