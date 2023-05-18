const Topic = require("../models/mongoose/Topic");
const { v4: uuidv4 } = require("uuid");
const { db, Hash } = lulu.use("app/helpers");
const ResourceAlreadyExistsError = lulu.use(
  "app/errors/ResourceAlreadyExistsError"
);
const NotFoundError = lulu.use("app/errors/NotFoundError");

function generateUserId() {
  let uid = uuidv4();
  return uid;
}

function domainCheck(title) {
  let findTopic = Topic.findOne({ title: title });
  return findTopic;
}

async function createTopic(data) {
  console.log("Topic service", data.file);
  let title = await domainCheck(data.title);
  if (title) {
    throw new ResourceAlreadyExistsError("Topic already exists.");
  }

  return await Topic.create({
    title: data.title,
    uid: await generateUserId(),
    slug: data.slug,
    file: data.file,
    created_by: data.created_by,
  });
}

async function topicList(req) {
  let { page = 1, limit } = req.query;
  const skip = (page - 1) * limit;
  const topic = await Topic.find({ exist: { $ne: false } })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  return topic;
}

async function details(req) {
  let { id } = req.params;
  let topic = await Topic.findById(id);

  if (!topic) {
    throw new Error("Topic does not exist");
  } else if (topic.exist == false) {
    throw new Error("Topic already deleted");
  }
  return await topic;
}

async function topicUpdate(req) {
  let { id } = req.params;
  let updateTopic = await Topic.findOne({ _id: id });

  if (!updateTopic) {
    throw new NotFoundError("Topic does not exist");
  } else if (updateTopic.title === req.body.title) {
    throw new ResourceAlreadyExistsError("Topic already Up to date.");
  } else if (updateTopic.exist === false) {
    throw new Error("Topic already deleted");
  }

  updateTopic.title = req.body.title;
  updateTopic.slug = req.body.slug;
  updateTopic.file = req.file;

  return await updateTopic.save();
}

async function destroy(req) {
  let { id } = req.params;
  let TopicDestroy = await Topic.findById(id);

  if (!TopicDestroy) {
    throw new Error("Portal does not exist");
  } else if (TopicDestroy.exist == false) {
    throw new Error("Portal already deleted");
  } else {
    TopicDestroy.exist = false;

    return await TopicDestroy.save();
  }
}

module.exports = {
  createTopic,
  topicList,
  topicUpdate,
  destroy,
  details,
};
