const express = require("express");
const router = express.Router();
const PM = lulu.use("app/middlewares/PM");

const PortalController = require("../../app/controllers/HTTP/PortalController");
const PortalAddRequest = require("../../app/requests/PortalAddRequest");
const Alias = require("./Alias");
const upload = require("../../app/middlewares/FileUpload");

router.use("/alias", Alias);

router.post(
  "/create",
  [upload.single("file")],
  [PortalAddRequest, PM(["ANY"])],

  PortalController.portalAdd
);

router.get("/list", [PM(["USER_READ_OTHERS"])], PortalController.list);
router.get(
  "/details/:id",
  [PM(["USER_READ_OTHERS"])],
  PortalController.details
);
router.put(
  "/update/:id",
  [upload.single("file")],
  [PortalAddRequest, PM(["ANY"])],
  PortalController.update
);
router.post("/destroy/:id", [PM(["ANY"])], PortalController.destroy);

module.exports = router;
