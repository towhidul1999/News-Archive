const SysDevice = lulu.use("app/models/mongoose/SysDevice");
const config = lulu.use("app.config");
const { v4: uuidv4 } = require("uuid");
module.exports = {
  bindDevice: async function (data) {
    return await SysDevice.create(await this.buildDevice(data));
  },
  buildDevice: async function (data) {
    let { host, ip, ips, userAgent, token, source, optionals } = data;
    let kind = "Unknown";
    let tokenKind = "Provided";
    if (config.app.bindedApps.includes(source)) {
      kind = "App";
    } else if (
      config.app.bindedDomains.includes(source) ||
      config.app.bindedDomains.includes(host)
    ) {
      kind = "Browser";
    }

    if (kind === "App") {
      tokenKind = "FCM";
    } else {
      const builtToken = await this.buildToken(token);
      token = builtToken.token;
      tokenKind = builtToken.tokenKind;
    }

    const device = {
      token,
      token_kind: tokenKind,
      kind,
      source,
      meta: {
        ip,
        ips,
        user_agent: userAgent,
        host,
      },
      optionals: optionals || {},
    };
    return device;
  },
  buildToken: async function (token) {
    let tokenKind = "Provided";
    if (await SysDevice.findOne({ token })) {
      token = uuidv4();
      tokenKind = "Generated";
    }

    return { token, tokenKind };
  },
  getSysDevicesByQuery: async function (query, options) {
    return SysDevice.find({ ...query }, null, {
      ...options,
    });
  },
};
