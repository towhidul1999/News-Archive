const { object } = require("joi");
const mongoose = require("mongoose");

// fields definition
const fields = {
  name: {
    type: String, //name // required
  },

  uid: {
    type: String, // e.g. '1234567890' - Auto Generated //firebase
  },

  email: {
    type: String, //email  //required
  },

  password: {
    type: String,
  },

  social_login: {
    type: Object, // {provider: '', id: '', token: '', email: '', name: '', image: ''}
  },

  file: {
    type: Object,
  },

  exist: {
    type: Boolean,
    default:true,
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
const model = mongoose.model("User", schema, "users");

module.exports = model;
