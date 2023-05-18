const mongoose = require("mongoose");

// fields definition
const fields = {
  alias: {
    type: String, //name // required
  },

  exist: {
    type: Boolean,
    default: false,
  },

  portal_id: {
    type: String,
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
const model = mongoose.model("Alias", schema, "aliases");

module.exports = model;
