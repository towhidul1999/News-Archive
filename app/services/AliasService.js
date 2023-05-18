const NotFoundError = require("../errors/NotFoundError");
const Alias = require("../models/mongoose/Alias");
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

async function aliasAdd(data) {
  console.log("alias", data);
  let portal = await Portal.findOne({
    _id: data.portal_id,
  });

  if (!portal) {
    throw new NotFoundError("Portal with this id does not exist.");
  } else if (portal.exist === false) {
    throw new NotFoundError("Portal already deleted.");
  }

  let alias = await Alias.findOne({
    alias: data.alias,
    portal_id: data.portal_id,
    exist: true,
  });

  if (alias) {
    throw new ResourceAlreadyExistsError("Alias already exists.");
  }
  return await Alias.create({
    alias: data.alias,
    portal_id: data.portal_id,
    created_by: data.created_by,
    exist: true,
  });
}

async function aliasList(req) {
  let { page = 1, limit } = req.query;
  const skip = (page - 1) * limit;
  const alias = await Alias.find({ exist: { $ne: false } })
    .skip(skip)
    .limit(limit);
  return alias;
}

async function portalAlias(data) {
  let portal = await Portal.findOne({ _id: data.params.id });
  let portalAlias = await Alias.find({ portal_id: data.params.id });

  if (!portal || !portalAlias) {
    throw new NotFoundError("Portal with this id does not exist.");
  } else if (portal.exist === false || portalAlias.exist === false) {
    throw new NotFoundError("Portal Already Deleted");
  } else {
    return portalAlias;
  }
  // if(!portalAlias){
  //   throw new NotFoundError('Alias is not Exist')
  // }else if(portalAlias.exist === false){
  //   throw new NotFoundError("Alias already deleted")
  // }

  return portalAlias;
}

async function aliasUpdate(data) {
  console.log("alias1111", data);
  let id = data.params.id;
  let updateAlias = await Alias.findById(id);

  if (!updateAlias) {
    throw new NotFoundError("Portal with this id does not exist.");
  } else if (updateAlias.exist === false) {
    throw new Error("Alias already deleted");
  } else if (updateAlias.alias === data.body.alias) {
    throw new ResourceAlreadyExistsError("Alias already Up to date.");
  }

  updateAlias.alias = data.body.alias;

  return await updateAlias.save();
}

async function aliasDestroy(req) {
  let { id } = req.params;
  let aliasDestroy = await Alias.findById(id);

  if (!aliasDestroy) {
    throw new Error("Alias does not exist.");
  } else if (aliasDestroy.exist == false) {
    throw new Error("Alias already deleted.");
  } else {
    aliasDestroy.exist = false;
    await aliasDestroy.save();
  }

  return {};
}

module.exports = {
  aliasAdd,
  aliasList,
  aliasUpdate,
  aliasDestroy,
  portalAlias,
};
