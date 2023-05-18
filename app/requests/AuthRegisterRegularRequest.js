const { AuthRegisterRegularSchema } = require("./JoiValidationSchemas");
const Handler = lulu.use("app/errors/Handler");
const response = lulu.use("app/responses/Response");

module.exports = async function (req, res, next) {
  try {
    await AuthRegisterRegularSchema.validateAsync(req.body, {
      allowUnknown: true,
    });
    next();
  } catch (error) {
    console.log(error, "error..");
    return response.error(Handler(error), res);
  }
};
