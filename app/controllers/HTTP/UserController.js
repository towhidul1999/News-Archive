const response = require("../../../app/responses/Response");
const Handler = require("../../../app/errors/Handler");
const AppValidationError = require("../../errors/AppValidationError");
const config = lulu.use("app.config");

const UserService = require("../../services/UserService");
const { list } = require("../../permissions/Permission");

module.exports = {
  create: async function (req, res) {
    try {
      const newUser = await UserService.regularRegistration({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        created_by: req.nativeAuth.user,
        file: req.file,
        exist: true,
      });
      return response.dispatch(
        "User Created Successfully",
        { newUser },
        res,
        201
      ); // wrap data in object to avoid confusion
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  list: async function (req, res) {
    try {
      const users = await UserService.list(req);
      return response.dispatch("User Listed Successfully", { users }, res, 200);
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  getUserById: async function (req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      return response.dispatch("User find successfully", { user }, res, 200);
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  update: async function (req, res) {
    try {
      const user = await UserService.updateUser(req);

      return response.dispatch("Updated successfully", { user }, res, 200);
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  userProfileUpdate : async function(req, res)
  {
    try{
      const userProfile = await UserService.updateUserProfile(req);
      return response.dispatch("Updated successfully", { userProfile }, res, 200);
    }catch(error)
    {
      return response.error(Handler(error), res);
    }
  },

  discard : async function(req, res){
    try {
      const userDelete = await UserService.discard(req);
      return response.dispatch("Deleted successfully", { }, res, 200);
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  passwordReset: async function (req, res) {
    try {
      const updatePassword = await UserService.passwordReset(req);
      return response.dispatch(
        "Updated successfully",
        { updatePassword },
        res,
        200
      );
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },
};
