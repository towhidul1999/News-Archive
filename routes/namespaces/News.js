const express = require("express");
const router = express.Router();
const PM = lulu.use("app/middlewares/PM");

const NewsController = require('../../app/controllers/HTTP/NewsController')
const NewsCreateRequest = require("../../app/requests/NewsCreateRequest")


router.post(
    "/create",
    [
      NewsCreateRequest
     ],
    [ PM(["ANY"])],
    NewsController.newsCreate
  );


module.exports = router;
