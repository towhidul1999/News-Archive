const { getUserByQuery } = require("./UserService");

const AppValidationError = lulu.use("app/errors/AppValidationError");
const { Hash } = lulu.use("app/helpers");
const NotFoundError = lulu.use("app/errors/NotFoundError");
const AuthSessionService = lulu.use("app/services/AuthSessionService");
const AccessDeniedError = lulu.use("app/errors/AccessDeniedError");
const User = require("../models/mongoose/User");

async function loginByEmailAndPassword(email, password) {
  let user = await User.findOne({
    email,
  });
  if (!user) {
    throw new NotFoundError(
      "There is no user with this email. Please Register."
    );
  }
  if (!(await Hash.compare(password, user.password))) {
    throw new AppValidationError("Password is incorrect !");
  }

  return user;
}

async function loginSocial(data, { source, device, meta }) {
  let user = await User.findOne({
    "socialLogin.provider": data.socialLogin.provider,
    "socialLogin.id": data.socialLogin.id,
  });

  if (!user) {
    user = await User.create(data);
  }

  let session = await AuthSessionService.construct(
    source,
    device,
    user._id,
    meta
  );

  return {
    user,
    session: sessionDataFormatter(session),
  };
}

async function loginRegular(source, device, email, password, meta) {
  let user = await loginByEmailAndPassword(email, password);
  let session = await AuthSessionService.construct(
    source,
    device,
    user._id,
    meta
  );
  user.password = undefined;

  return {
    user,
    session,
  };
}

async function loginRegularOnlyInMobileApp(
  source,
  device,
  email,
  password,
  meta,
  bindedApps
) {
  let loginData = await loginRegular(source, device, email, password, meta);

  const whitelistedStatus = ["Active", "Pending", "Suspended"];

  // if (!bindedApps.includes(source)) {
  //   throw new AccessDeniedError(
  //     "App Error. Uninstall the app and install it again."
  //   );
  // }

  if (loginData.user.baseRole !== "User") {
    throw new AccessDeniedError("You are not allowed to login in this app.");
  }

  if (!whitelistedStatus.includes(loginData.user.status)) {
    throw new AccessDeniedError(
      `Your account is ${loginData.user.status}. Please contact support.`
    );
  }

  return {
    user: loginData.user,
    session: sessionDataFormatter(loginData.session),
  };
}

function sessionDataFormatter(sessionObject) {
  return {
    sessionKey: sessionObject._id,
    source: sessionObject.source,
    device: sessionObject.devices.createdFrom,
    murdered: sessionObject.murdered,
  };
}

module.exports = {
  loginRegular,
  loginSocial,
  loginRegularOnlyInMobileApp,
};
