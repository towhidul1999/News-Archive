const NotFoundError = lulu.use("app/errors/NotFoundError");
const ResourceAlreadyExistsError = lulu.use(
  "app/errors/ResourceAlreadyExistsError"
);
const AppValidationError = lulu.use(
    "app/errors/AppValidationError"
  );

const axios = require('axios');
const cheerio = require('cheerio');

const Portal =  require("../models/mongoose/Portal");
const Alias = require("../models/mongoose/Alias");
const { response } = require('express');
const NewsLink = require('../models/mongoose/NewsLink');


async function audit(data){
       
        let url = data.link;

        // Validate this domain
        if(!domainValidator(url)){
            throw new Error('Domain is not valid');
        }

        const urlObject = urlProps(url);
        
        // Check url has params or not
        if(url.includes('?')){
            // Remove params
            url = removeParams(url);
        }

        // Check url exists in db or not
        const linkExists = await NewsLink.findOne({link: url})

        if(linkExists){
          throw new ResourceAlreadyExistsError("Link Already exists")
        }

        // Check whitelisted properties

        const isWhitelist = await checkWhitelist(urlObject);
        if(!isWhitelist){
            throw new NotFoundError('Not Whitelisted');
        }

      const scr = await scrapper(url)
      if(scr)
      {
        data = []
       data.push({
          url,
          scr
        });
        return data
      }

}

// Domain Validator
function domainValidator(str)
{
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(str);
}

function removeParams(str)
{
    return str.replace(/#.*$/, '').replace(/\?.*$/, '');
}

function urlProps(url){
    let newURL = new URL(url);

    // newURL.rootDomain = rootDomainMaker(newURL.hostname);
    console.log(newURL)

    return {
        href: newURL.href,
        origin: newURL.origin,
        protocol: newURL.protocol,
        host: newURL.host,
        hostname: newURL.hostname,
        hostRoot: rootDomainMaker(newURL.hostname),
        port: newURL.port,
        pathname: newURL.pathname,
        search: newURL.search,
        searchParams: newURL.searchParams,
        hash: newURL.hash
    }

}

function rootDomainMaker(fullDomain){
    let rootDomain = fullDomain.split('.');
    return rootDomain.slice(-2).join('.');
}

  async function  checkWhitelist(urlObject){
    // Check root domain exists
    
    const portal = await  Portal.findOne({domain:urlObject.hostRoot})

        if(portal){
            console.log(portal)
            const alias = await Alias.findOne({alias:urlObject.hostname})
            if(alias){
                return true;
            }
        }else{
           return false
        }
}
async function scrapper(url) {
  try {
    const res = await axios(url);
    const data = res.data;
    const $ = cheerio.load(data);
  
    let content = [];

    const metaTitle =  $('[property="og:title"]').attr('content');

    const description = $('[property="og:description"]').attr('content');

    const image = $('[property="og:image"]').attr('content');

    if (typeof metaTitle === 'undefined' || metaTitle === null) {
      const title = $('title').text();
      content.push({
        title,
        description,
        image
      });
    } else {
      content.push({
        metaTitle,
        description,
        image
      });
    }
    

    return content;
  } catch (error) {
    throw new Error('Not found');
  }
}

module.exports = {
    audit
};
  

