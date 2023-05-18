const mongoose = require("mongoose");

const fields = {
    link :{
        type: String,
    },

    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}

const schema = mongoose.Schema(fields, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
const model = mongoose.model("NewsLink", schema, "newslinks");
module.exports = model;
