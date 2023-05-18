const NotFoundError = require("../errors/NotFoundError");
const Link = require("../models/mongoose/Link");
const Portal = require("../models/mongoose/Portal");
const Alias = require("../models/mongoose/Alias");
const { v4: uuidv4 } = require("uuid");
const { db, Hash } = lulu.use("app/helpers");
const ResourceAlreadyExistsError = lulu.use(
  "app/errors/ResourceAlreadyExistsError"
);

async function fixUrl(url) {
  try {
    const parsedUrl = new URL(url);
    if (!parsedUrl.protocol) {
      parsedUrl.protocol = "https:";
    }
    return parsedUrl.toString();
  } catch (e) {
    console.error(`Error parsing URL: ${url}`, e);
    return url;
  }
}

async function audit(data) {
  const modifyURL = await fixUrl(data.link);
  console.log("Hi from fixURL", modifyURL);

  let link = await Link.findOne({ link: { $in: [modifyURL] } });

  if (link) {
    throw new ResourceAlreadyExistsError("Link already exists");
  } else if (!link) {
    const url = new URL(data.link);
    const domain = url.hostname.replace(/^www\./, "");
    let whiteListedDomain = await Portal.findOne({ domain: domain });
    if (!whiteListedDomain) {
      throw new NotFoundError("Domain is not whitelisted");
    } else {
      return Link.create({
        link: data.link,
      });
    }
  }
}

module.exports = {
  audit,
};
