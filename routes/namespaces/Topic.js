const express = require("express");
const router = express.Router();
const PM = lulu.use("app/middlewares/PM");

const TopicController = require("../../app/controllers/HTTP/TopicController");
const TopicAddRequest = require("../../app/requests/TopicAddRequest");
const upload = require("../../app/middlewares/FileUpload");

router.post(
  "/create",
  [upload.single("file")],
  [TopicAddRequest, PM(["ANY"])],
  TopicController.createTopic
);
router.get("/list", [PM(["USER_READ_OTHERS"])], TopicController.topicList);

router.get(
  "/details/:id",
  [PM(["USER_READ_OTHERS"])],
  TopicController.topicDetails
);
router.put(
  "/update/:id",
  [upload.single("file")],
  [TopicAddRequest, PM(["ANY"])],
  TopicController.topicUpdate
);

router.post("/destroy/:id", [PM(["ANY"])], TopicController.destroy);

module.exports = router;
