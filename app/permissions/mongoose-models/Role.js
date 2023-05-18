const mongoose = require("mongoose");
// fields definition
const fields = {
    role: {
      type: String,
    },
    alias: {
        type: String,
    },
    description: {
      type: String,
    },
    position_key:{
        type: Number,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  
  
  };


// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

// wrap schema with mongoose model
const model = mongoose.model("Role", schema, "roles");

module.exports = model;
