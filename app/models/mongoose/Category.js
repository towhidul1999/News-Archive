const mongoose = require("mongoose");

const fields = {
  title: {
    type: String,
  },
  slug: {
    type: String,
  },
  file: {
    type: Object,
  },
  exist: {
    type: Boolean,
    default: true,
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
};

const schema = mongoose.Schema(fields, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});
const model = mongoose.model("Category", schema, "categories");
module.exports = model;
