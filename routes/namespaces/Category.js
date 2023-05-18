const express = require("express");
const router = express.Router();
const PM = lulu.use("app/middlewares/PM");

const CatrgoryController = require("../../app/controllers/HTTP/CategoryController");
const CategoryCreateRequest = require("../../app/requests/CategoryCreateRequest");
const CategoryUpdateRequest = require("../../app/requests/CategoryUpdateRequest");

const upload = require("../../app/middlewares/FileUpload");

router.post(
  "/create",
  [upload.single("file")],
  [
    CategoryCreateRequest,
    //   PM([
    //     "CREATE_USER", "USER_CREATE_WITH_ACTIVATION"
    //   ])
  ],
  CatrgoryController.create
);

router.get(
  "/list",
  [
    //    PM([
    //      "USER_READ_OTHERS",
    //    ])
  ],
  CatrgoryController.list
);

router.get(
  "/details/:id",
  [upload.single("file")],
  [CategoryCreateRequest],
  CatrgoryController.getCategoryById
);

// router.post(
//   "/update/:id",

router.post(
  "/update/:id",
  [upload.single("file")],

  [CategoryUpdateRequest],
  CatrgoryController.update
);

router.post("/discard/:id", [PM(["ANY"])], CatrgoryController.discard);

module.exports = router;
