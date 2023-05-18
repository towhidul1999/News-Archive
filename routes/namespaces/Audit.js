const express = require("express");
const router = express.Router();
const PM = lulu.use("app/middlewares/PM");


const AuditController = require("../../app/controllers/HTTP/AuditController");

router.post("/check",  [ PM(["ANY"])], AuditController.audit);




module.exports = router;