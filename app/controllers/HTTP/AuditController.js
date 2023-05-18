const response = require("../../../app/responses/Response");
const Handler = require("../../../app/errors/Handler");
const AppValidationError = require("../../errors/AppValidationError");
const config = lulu.use("app.config");

const { list } = require("../../permissions/Permission");

const AuditService = require("../../services/AuditService")

module.exports = {
    audit : async function (req, res) {
        try{
            const audit = await AuditService.audit({
                link: req.body.link
            })
            return response.dispatch("Audited Successfully", { audit }, res, 200);
        }catch(error){
            return response.error(Handler(error), res);
        }
       
    }
}
