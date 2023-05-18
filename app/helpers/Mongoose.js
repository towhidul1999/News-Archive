const ObjectId = require("mongoose").Types.ObjectId;

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    return true;
  }
  throw new Error("Invalid objectID");
}

function isObjectIdHas(id) {
  if (ObjectId.isValid(id)) {
    return true;
  }
  throw new Error("Data is not exist");
}

module.exports = {
  isValidObjectId,
  isObjectIdHas,
};
