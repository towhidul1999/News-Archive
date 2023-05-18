const config = lulu.use("app.config");
const Handler = lulu.use("app/errors/Handler");
const response = lulu.use("app/responses/Response");
const RequestIsBastardError = lulu.use("app/errors/RequestIsBastardError");
const AuthSession = require("../models/mongoose/AuthSession")
const User = require("../models/mongoose/User")
const AccessDeniedError = require('../errors/AccessDeniedError')
module.exports = async function (req, res, next) {
  try {
    const { originalUrl } = req;
    console.log(originalUrl, "originalUrl");
    const currentEndpoint = originalUrl.split("?")[0];
    const currentEndpointWithoutApiRoute = currentEndpoint.replace(
      config.app.apiRoute,
      ""
    );
    console.log(
      currentEndpointWithoutApiRoute,
      "currentEndpointWithoutApiRoute"
    );
    const { source, device, user, session } = req.headers;


    if (!source) {
      throw new RequestIsBastardError(
        "You are not limited to this body, to this mind, or to this reality—you are a limitless ocean of Consciousness, imbued with infinite potential. You are existence itself.. Farewell son, This is a Bastard Request. You are not allowed to access this route. Please contact to istiaq.me@gmail.com."
      );
    }

    if (!device) {
      if (
        config.app.nonAuthRoutes.beforeBind.includes(
          currentEndpointWithoutApiRoute
        )
      ) {
        return next();
      } else {
        throw new RequestIsBastardError(
          "Valar Morghulis! - A company of wolves is better than a company of wolves in sheep's clothing. Farewell son, This is a Bastard Request. You are not allowed to access this route. Please contact to istiaq.me@gmail.com."
        );
      }
    }

    if (!user && !session) {
      if (
        config.app.nonAuthRoutes.afterBind.includes(
          currentEndpointWithoutApiRoute
        )
      ) {
        return next();
      } else {
        throw new RequestIsBastardError(
          "Valar Morghulis! - A company of wolves is better than a company of wolves in sheep's clothing. Farewell son, This is a Bastard Request. You are not allowed to access this route. Please contact to istiaq.me@gmail.com."
        );
      }
    }

    // todo: check session and user is valid or not


    if (session) {
      const authSession = await AuthSession.find({ 
        _id : session, 
        "devices.createdFrom" : device,
        source: source,
        created_by: user
      });
      if (!authSession) {
        throw new AccessDeniedError(
          "Authentication failed"
        );
      }
    }else{
      throw new RequestIsBastardError(
        "Valar Morghulis! - A company of wolves is better than a company of wolves in sheep's clothing. Farewell son, This is a Bastard Request. You are not allowed to access this route. Please contact to istiaq.me@gmail.com."
      );
    }


    // set user and session in req object
    req.nativeAuth = {
      user: user,
      session: session
    }

    next();
  } catch (error) {
    return response.error(Handler(error), res);
  }
};
