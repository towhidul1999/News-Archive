const express = require("express");
const AuthSocialLoginRequest = require("../../app/requests/AuthSocialLoginRequest");

const router = express.Router();

const PM = lulu.use("app/middlewares/PM");

const AuthController = lulu.use("app/controllers/HTTP/AuthController");

/* Request Validators */
const AuthBindDeviceRequest = lulu.use("app/requests/AuthBindDeviceRequest");
const AuthRegisterRegularRequest = lulu.use(
  "app/requests/AuthRegisterRegularRequest"
);
/* Request Validators */

router.get("/", (req, res) => {
  res.send("Hi From Auth API namespace");
});

router.post(
  "/bind/device",
  [AuthBindDeviceRequest, PM(["ANY"])],
  AuthController.registerDevice
);

router.post(
  "/register/regular",
  [AuthRegisterRegularRequest],
  AuthController.registerRegular
);

router.post("/login/regular", [], AuthController.loginRegular);

// router.post("/portal/add", [], PortalController.portalAdd);

/* router.post(
  "/social-login",
  [AuthSocialLoginRequest],
  AuthController.loginSocial
); */

module.exports = router;
