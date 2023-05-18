const response = require("../../../app/responses/Response");
const Handler = require("../../../app/errors/Handler");

const AliasService = require("../../services/AliasService");
const { list } = require("../../permissions/Permission");
const { db } = require("../../helpers");
// const Portal = require("../../models/Portal");

module.exports = {
  aliasAdd: async function (req, res) {
    try {
      db.isValidObjectId(req.params.id);
      const alias = await AliasService.aliasAdd({
        alias: req.body.alias,
        portal_id: req.params.id,
        created_by: req.nativeAuth.user,
      });
      return response.dispatch(
        "Alias Created Successfully",
        { alias },
        res,
        201
      ); // wrap data in object to avoid confusion
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  aliasList: async function (req, res) {
    try {
      const aliases = await AliasService.aliasList(req);
      return response.dispatch(
        "Alias Listed Successfully",
        { aliases },
        res,
        200
      );
    } catch {
      return response.error(Handler(error), res);
    }
  },

  aliasUnderPortal: async function (req, res) {
    try {
      db.isValidObjectId(req.params.id);
      const aliases = await AliasService.portalAlias(req);
      return response.dispatch(
        "Alias Under Portal Listed Successfully",
        { aliases },
        res,
        200
      );
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  aliasUpdate: async function (req, res) {
    try {
      db.isValidObjectId(req.params.id);
      const aliasUpdate = await AliasService.aliasUpdate(req);
      return response.dispatch(
        "Alias Update Successfully",
        { aliasUpdate },
        res,
        200
      );
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  aliasDestroy: async function (req, res) {
    try {
      db.isValidObjectId(req.params.id);
      const aliasDestroy = await AliasService.aliasDestroy(req);
      return response.dispatch("Alias Destroy Successfully", {}, res, 200);
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },
};
