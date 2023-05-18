const { AliasAdd } = require("./JoiValidationSchemas");
const Handler = lulu.use("app/errors/Handler");
const response = lulu.use("app/responses/Response");

module.exports = async function (req, res, next) {
  try {
    await AliasAdd.validateAsync(req.body, {
      allowUnknown: true,
    });
    next();
  } catch (error) {
    console.log(error);
    return response.error(Handler(error), res);
  }
};
