const response = require("../../../app/responses/Response");
const Handler = require("../../../app/errors/Handler");

const TopicService = require("../../services/TopicService");
const { list } = require("../../permissions/Permission");
const { db } = require("../../helpers");

module.exports = {
  createTopic: async function (req, res) {
    try {
      const Topic = await TopicService.createTopic({
        title: req.body.title,
        slug: req.body.slug,
        file: req.file,
        created_by: req.nativeAuth.user,
      });
      return response.dispatch(
        "Topic Created Successfully",
        { Topic },
        res,
        201
      ); // wrap data in object to avoid confusion
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  topicDetails: async function (req, res) {
    try {
      db.isValidObjectId(req.params.id);
      const TopicDetails = await TopicService.details(req);
      return response.dispatch(
        "Topic Details Successfully",
        { TopicDetails },
        res,
        200
      );
    } catch (error) {
      console.log(error, "details");
      return response.error(Handler(error), res);
    }
  },

  topicList: async function (req, res) {
    try {
      const topics = await TopicService.topicList(req);
      return response.dispatch(
        "Topic Listed Successfully",
        { topics },
        res,
        200
      );
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  topicUpdate: async function (req, res) {
    try {
      db.isValidObjectId(req.params.id);
      const TopicUpdate = await TopicService.topicUpdate(req);
      return response.dispatch(
        "Topic Update Successfully",
        { TopicUpdate },
        res,
        200
      );
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  destroy: async function (req, res) {
    try {
      db.isValidObjectId(req.params.id);
      const TopicDestroy = await TopicService.destroy(req);
      return response.dispatch("Topic Destroy Successfully", {}, res, 200);
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },
};
