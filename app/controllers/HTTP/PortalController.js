const response = require("../../../app/responses/Response");
const Handler = require("../../../app/errors/Handler");

const PortalService = require("../../services/PortalService");
const { list } = require("../../permissions/Permission");
const { db } = require("../../helpers");

module.exports = {
  portalAdd: async function (req, res) {
    // console.log(req.nativeAuth.user);
    console.log("woow", req.file);
    try {
      const portal = await PortalService.createPortal({
        title: req.body.title,
        domain: req.body.domain,
        file: req.file,
        created_by: req.nativeAuth.user,
      });
      return response.dispatch(
        "Portal Created Successfully",
        { portal },
        res,
        201
      ); // wrap data in object to avoid confusion
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  list: async function (req, res) {
    try {
      const portals = await PortalService.list(req);
      return response.dispatch(
        "Portal Listed Successfully",
        { portals },
        res,
        200
      );
    } catch {
      return response.error(Handler(error), res);
    }
  },

  details: async function (req, res) {
    try {
      db.isValidObjectId(req.params.id);
      const details = await PortalService.details(req);
      return response.dispatch(
        "Portal Details Successfully",
        { details },
        res,
        200
      );
    } catch (error) {
      console.log(error, "details");
      return response.error(Handler(error), res);
    }
  },

  update: async function (req, res) {
    try {
      db.isValidObjectId(req.params.id);
      const portalUpdate = await PortalService.update(req);
      return response.dispatch(
        "Portal Update Successfully",
        { portalUpdate },
        res,
        200
      );
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  destroy: async function (req, res) {
    try {
      db.isValidObjectId(req.params.id);
      const portalDiscard = await PortalService.destroy(req);
      return response.dispatch("Portal Destroy Successfully", {}, res, 200);
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },
};
