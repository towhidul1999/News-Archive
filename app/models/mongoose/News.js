const mongoose = require("mongoose");


const fields = {
    title: {
        type: String
    },
    description:{
        type: String
    },
    image:{
        type: String
    },
    category_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category'
      },
    topic_id:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Topic'
    },  
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}
const schema = mongoose.Schema(fields, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const model = mongoose.model("News", schema, "news");
module.exports = model;
