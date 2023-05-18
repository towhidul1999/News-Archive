const mongoose = require("mongoose");

// fields definition
const fields = {
  title: {
    type: String, //name // required
  },
  slug: {
    type: String, // e.g. '1234567890' - Auto Generated //firebase
  },
  file: {
    type: Object, //email  //required
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

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

// wrap schema with mongoose model
const model = mongoose.model("Topic", schema, "topics");

module.exports = model;
