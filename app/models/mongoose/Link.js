const mongoose = require("mongoose");

// fields definition
const fields = {
  link: {
    type: String,
    required: true, //name // required
  },

  uid: {
    type: String,
  },

  exist: {
    type: Boolean,
    default: true,
  },

  created_by: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
};

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
});

// wrap schema with mongoose model
const model = mongoose.model("Link", schema, "links");

module.exports = model;
