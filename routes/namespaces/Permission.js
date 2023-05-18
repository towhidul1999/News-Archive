const express = require("express");
const router = express.Router();

const PermissionController = require("../../app/controllers/HTTP/PermissionController");
const PM = lulu.use("app/middlewares/PM");

router.get("/", (req, res) => {
  res.send("Access Forbidden.");
});

router.get(
  "/list",
  [
    PM([
      "ANY"
    ])
  ],
  PermissionController.plainList
);

router.get(
  "/group/list",
  [
    PM([
      "SUPREME", "ROLE_CREATE", "ROLE_READ", "ROLE_UPDATE"
    ])
  ],
  PermissionController.groupList
);

router.get(
  "/kind/list",
  [
    PM([
      "SUPREME", "ROLE_CREATE", "ROLE_READ", "ROLE_UPDATE"
    ])
  ],
  PermissionController.kindList
);



module.exports = router;
