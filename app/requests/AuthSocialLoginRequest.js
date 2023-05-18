const { AuthSocialLoginSchema } = require("./JoiValidationSchemas");
const Handler = lulu.use("app/errors/Handler");
const response = lulu.use("app/responses/Response");

module.exports = async function (req, res, next) {
  try {
    await AuthSocialLoginSchema.validateAsync(req.body, {
      allowUnknown: true,
    });
    next();
  } catch (error) {
    return response.error(Handler(error), res);
  }
};
