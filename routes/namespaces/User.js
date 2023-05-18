const express = require("express");
const router = express.Router();
const PM = lulu.use("app/middlewares/PM");

const UserController = require("../../app/controllers/HTTP/UserController");

const UserCreateRequest =  require("../../app/requests/UserCreateRequest")
const UserUpdateRequest =  require("../../app/requests/UserUpdateRequest")
const UserPasswordResetRequest =  require("../../app/requests/UserPasswordResetRequest")

const upload = require("../../app/middlewares/FileUpload");



router.post(
  "/create",
  [upload.single("file")],
  [UserCreateRequest, PM(["CREATE_USER", "USER_CREATE_WITH_ACTIVATION"])],
  UserController.create
);

router.get("/list", [PM(["USER_READ_OTHERS"])], UserController.list);

router.get(
  "/details/:id",
  [PM(["USER_READ_OTHERS"])],
  UserController.getUserById
);

router.post("/update/:id",  [ UserUpdateRequest, PM(["ANY"])], UserController.update);

router.post("/profile/update/:id", [UserUpdateRequest,PM(["ANY"])], UserController.userProfileUpdate)

router.post("/discard/:id", [PM(["ANY"])], UserController.discard)

router.post('/password/reset/:id', [ UserPasswordResetRequest, PM(["ANY"])], UserController.passwordReset)

module.exports = router;
