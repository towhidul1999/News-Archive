const AppValidationError = require("../../errors/AppValidationError");
const { generateUserId } = require("../../services/UserService");

const Handler = lulu.use("app/errors/Handler");
const SysDeviceService = require("../../services/SysDeviceService");
// const UserService = lulu.use("app/services/UserService");
const UserService = require("../../services/UserService");
const AuthService = require("../../services/AuthService");
const response = lulu.use("app/responses/Response");
const config = lulu.use("app.config");
const Event = lulu.use("app/responses/Event");

module.exports = {
  registerDevice: async (req, res) => {
    try {
      const data = {
        host: req.get("host"),
        ip: req.ip,
        ips: req.ips,
        userAgent: req.headers["user-agent"],
        token: req.body.token,
        source: req.headers.source,
        optionals: req.body.optionals,
      };
      const sysDevice = await SysDeviceService.bindDevice(data);
      Event.emit("getMessageEvent", sysDevice);
      return response.dispatch(
        "Registration Successful.",
        {
          device: {
            device_key: sysDevice._id, // save this key to identify the device in subsequent requests as device and send it in the header
            token: sysDevice.token,
            token_kind: sysDevice.token_kind,
            kind: sysDevice.kind,
          },
        },
        res,
        200
      ); // wrap data in object to avoid confusion
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },
  registerRegular: async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        baseRole: "User",
      };

      const user = await UserService.regularRegistration(data);
      user.password = undefined;

      return response.dispatch(
        "Registration Successful.",
        {
          user: user,
          devNote: "Proceed to login.",
        },
        res,
        200
      );
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },
  /* loginSocial: async (req, res) => {
    try {
      const {
        displayName,
        email,
        uid,
        photoURL,
        phoneNumber,
        providerId,
        refreshToken,
      } = req.body;
      let data = {
        name: displayName,
        email: email,
        uid: await generateUserId(),
        profileImage: photoURL,
        phoneNumber: phoneNumber,
        socialLogin: {
          provider: providerId,
          id: uid,
          token: null,
          email: email,
          name: displayName,
          image: photoURL,
        },
      };

      const user = await AuthService.loginSocial(data, {
        source: req.headers.source,
        device: req.headers.device,
        meta: {
          ip: req.ip,
          ips: req.ips,
          userAgent: req.headers["user-agent"],
          host: req.get("host"),
        },
      });
      return response.dispatch(
        "Login Successful !",
        user,
        res,
        200
      );
    } catch (error) {
      console.log(error, "error..");
      return response.error(Handler(error), res);
    }
  }, */
  loginRegular: async (req, res) => {
    try {
      const loginData = await AuthService.loginRegular(
        req.headers.source,
        req.headers.device,
        req.body.email,
        req.body.password,
        {
          ip: req.ip,
          ips: req.ips,
          userAgent: req.headers["user-agent"],
          host: req.get("host"),
        }
      );

      return response.dispatch("Login Successful !", loginData, res, 200);
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },

  portalAdd: async (req, res) => {
    try {
      const loginData = await AuthService.portalAdd(
        req.headers.source,
        req.headers.device,
        req.body.title,
        req.body.domain,
        req.body.image,
        {
          ip: req.ip,
          ips: req.ips,
          userAgent: req.headers["user-agent"],
          host: req.get("host"),
        }
      );

      return response.dispatch("Login Successful !", loginData, res, 200);
    } catch (error) {
      return response.error(Handler(error), res);
    }
  },
};
