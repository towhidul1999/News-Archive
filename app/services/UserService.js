const User = require("../models/mongoose/User");
const { v4: uuidv4 } = require("uuid");
const { db, Hash } = lulu.use("app/helpers");
const NotFoundError = lulu.use("app/errors/NotFoundError");
const AccessDeniedError = lulu.use("app/errors/AccessDeniedError");
const config = lulu.use("app.config");

const ResourceAlreadyExistsError = lulu.use(
  "app/errors/ResourceAlreadyExistsError"
);

function generateUserId() {
  let uid = uuidv4();
  return uid;
}

function userByEmail(email) {
  let userEmail = User.findOne({ email: email });
  return userEmail;
}

async function regularRegistration(data) {
  let user = await userByEmail(data.email);
  console.log(user);
  if (user) {
    throw new ResourceAlreadyExistsError(
      "User with this email already exists."
    );
  }

  return await User.create({
    name: data.name,
    uid: await generateUserId(),
    email: data.email,
    password: await Hash.make(data.password),
    file:data.file,
    created_by: data.created_by,
    baseRole: data.baseRole,
  });
}

async function list(req) {
  let { page = 1, limit } = req.query;
  const skip = (page - 1) * limit;
  const user = await User.find({ exist: { $ne: false } }).sort({ _id: -1 }).skip(skip).limit(limit);
  return user;
}

async function getUserById(id) {
  if(!db.isValidObjectId(id)){
    return null;
  }
  const user =  await User.findOne({_id: id, exist: true });

  if(user)
  {
    return user;
  }else{
    throw new NotFoundError(
      "There is no such user"
    );
  }
  
}

async function updateUser(req) {

  let { id } = req.params;
  if(!db.isValidObjectId(id)){
    return null;
  }
  let updateUser = await User.findOne({_id: id, exist: true });
  if(updateUser){
  updateUser.name = req.body.name;
  updateUser.email = req.body.email;
  updateUser.file = req.file;
  updateUser.update();
  return updateUser;
  }else{
    throw new NotFoundError(
      "There is no such user"
    );
  }
  
}

async function updateUserProfile(req){
  let { id } = req.params;
  if(!db.isValidObjectId(id)){
    return null;
  }
  
    let updateUserProfile = await User.findOne(id);

    updateUserProfile.name = req.body.name;
    updateUserProfile.email = req.body.email;
    updateUserProfile.save();
    return updateUserProfile;
  }

async function passwordReset(req) {
  let { id } = req.params;
  if(!db.isValidObjectId(id)){
    return null;
  }
    let updatePassword =  User.findOne({_id: id, exist: true });
    if(updatePassword){
    updatePassword.password = await Hash.make(req.body.password);
    updatePassword.save();
    return updatePassword;
    }else{
      throw new NotFoundError(
        "There is no such user"
      );
    }
}

async function discard(req){
  let { id } = req.params;
  if(!db.isValidObjectId(id)){
    return null;
  }
  let userDelete = await User.findOne({_id: id, exist: true });
  if(userDelete){
  userDelete.exist = false;
  userDelete.save();
  return[];
  }else{
    throw new NotFoundError(
      "There is no such user"
    );
  }
}
module.exports = {
  regularRegistration,
  list,
  getUserById,
  updateUser,
  discard,
  passwordReset,
  updateUserProfile
};
