const response = require("../../../app/responses/Response");
const Handler = require("../../../app/errors/Handler");

const LinkService = require("../../services/LinkService");
const { list } = require("../../permissions/Permission");
const { db } = require("../../helpers");
// const Portal = require("../../models/Portal");

module.exports = {
  linkAdd: async function (req, res) {
    console.log("Link controller", req.body.link);
    try {
      const alias = await LinkService.audit({
        link: req.body.link,
        created_by: req.nativeAuth.user,
      });
      return response.dispatch(
        "Link Created Successfully",
        { alias },
        res,
        201
      ); // wrap data in object to avoid confusion
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },
};
