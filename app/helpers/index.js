module.exports = {
  db: require("./Mongoose"),
  Hash: require("./Hash"),
  Str: require("./Str"),
  DeepCopy: (data) => JSON.parse(JSON.stringify(data)),
};
