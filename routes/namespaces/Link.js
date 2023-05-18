const express = require("express");
const router = express.Router();
const PM = lulu.use("app/middlewares/PM");

const LinkController = require("../../app/controllers/HTTP/LinkController");
const AliasAddRequest = require("../../app/requests/AliasAddRequest");

router.post(
  "/create",
  //   [AliasAddRequest, PM(["ANY"])],
  LinkController.linkAdd
);

module.exports = router;
