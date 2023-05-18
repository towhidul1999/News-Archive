const Permission = require("../../permissions/Permission");
const response = require("../../../app/responses/Response");
const Handler = require("../../../app/errors/Handler");

module.exports = {
    plainList: async (req, res) => {
        try {
            const permissions = Permission.list();
            return response.dispatch(
                "Permissions List.",
                {
                    permissions: permissions
                },
                res,
                200
            );
        } catch (error) {
            return response.error(Handler(error), res);
        }
    },
    groupList: async (req, res) => {
        try {
            const permissions = Permission.listGroupByGroup();
            return response.dispatch(
                "Permissions List.",
                {
                    permissions: permissions
                },
                res,
                200
            );
        } catch (error) {
            return response.error(Handler(error), res);
        }
    },
    kindList: async (req, res) => {
        try {
            const permissions = Permission.listGroupByKind();
            return response.dispatch(
                "Permissions List.",
                {
                    permissions: permissions
                },
                res,
                200
            );
        } catch (error) {
            return response.error(Handler(error), res);
        }
    }
}