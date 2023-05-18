const express = require("express");
const router = express.Router();
const PM = lulu.use("app/middlewares/PM");

const AliasController = require("../../app/controllers/HTTP/AliasController");
const AliasAddRequest = require("../../app/requests/AliasAddRequest");

router.post(
  "/create/:id",
  [AliasAddRequest, PM(["ANY"])],
  AliasController.aliasAdd
);
router.get(
  "/under-portal/:id",
  [PM(["ANY"])],
  AliasController.aliasUnderPortal
);
router.get("/list", [PM(["ANY"])], AliasController.aliasList);
router.patch("/update/:id", [PM(["ANY"])], AliasController.aliasUpdate);
router.post("/destroy/:id", [PM(["ANY"])], AliasController.aliasDestroy);

module.exports = router;
