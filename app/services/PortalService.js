const NotFoundError = require("../errors/NotFoundError");
const Portal = require("../models/mongoose/Portal");
const { v4: uuidv4 } = require("uuid");
const { db, Hash } = lulu.use("app/helpers");
const ResourceAlreadyExistsError = lulu.use(
  "app/errors/ResourceAlreadyExistsError"
);

function generateUserId() {
  let uid = uuidv4();
  return uid;
}

function domainCheck(domain) {
  let findDomain = Portal.findOne({ domain: domain });
  return findDomain;
}

async function createPortal(data) {
  console.log("Portal service", data.file);
  let domain = await domainCheck(data.domain);
  console.log(domain);
  if (domain) {
    throw new ResourceAlreadyExistsError("Domain already exists.");
  }

  return await Portal.create({
    title: data.title,
    uid: await generateUserId(),
    domain: data.domain,
    file: data.file,
    created_by: data.created_by,
  });
}

async function list(req) {
  let { page = 1, limit } = req.query;
  const skip = (page - 1) * limit;
  const users = await Portal.find({ exist: { $ne: false } })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);
  return users;
}

async function details(req) {
  let { id } = req.params;
  let portal = await Portal.findById(id);

  if (!portal) {
    throw new Error("Portal does not exist");
  } else if (portal.exist == false) {
    throw new Error("Portal already Deleted");
  }
  return await portal;
}

async function update(req) {
  let { id } = req.params;
  let updatePortal = await Portal.findById(id);

  let domain = await domainCheck(req.body.domain);
  console.log(domain);

  if (!updatePortal) {
    throw new NotFoundError("Portal does not exist");
  } else if (updatePortal.exist === false) {
    throw new NotFoundError("Portal already deleted");
  } else if (domain) {
    throw new ResourceAlreadyExistsError("Domain already exists.");
  }

  updatePortal.title = req.body.title;
  updatePortal.domain = req.body.domain;
  updatePortal.file = req.file;

  return await updatePortal.save();
}

async function destroy(req) {
  let { id } = req.params;
  let portalDiscard = await Portal.findById(id);

  if (!portalDiscard) {
    throw new Error("Portal does not exist");
  } else if (portalDiscard.exist == false) {
    throw new Error("Portal already deleted");
  } else {
    portalDiscard.exist = false;

    await portalDiscard.save();

    return {};
  }
}

module.exports = {
  createPortal,
  list,
  details,
  update,
  destroy,
};
