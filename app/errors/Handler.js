const response = require('../responses/Response');
const {buildMessage, buildData} = require('./ErrorHelper');
module.exports = function (error) {
    console.log('Error Handler');
    console.log(error);
    if(error instanceof require('./NotFoundError')){
        return response.build(error.message, {}, 404);
    }
    else if(error instanceof require('./AppValidationError')){
        return response.build(error.message, {}, 400);
    }
    else if(error instanceof require('./ResourceAlreadyExistsError')){
        return response.build(error.message, {}, 409);
    }
    else if(error instanceof require('./RequestIsBastardError')){
        return response.build(error.message, {}, 412);
    }
    else if(error instanceof require('./AccessDeniedError')){
        return response.build(error.message, {}, 403);
    }
    else if(error instanceof require('./PermissionDeniedError')){
        return response.build(error.message, {}, 403);
    }
    else if(error instanceof ReferenceError){
        return response.build(buildMessage(error), buildData(error), 500);
    }
    else if(error instanceof TypeError){
        return response.build(buildMessage(error), buildData(error), 500);
    }
    else if(error instanceof require('./JoiValidationError')){
        return response.build(buildMessage(error), buildData(error), 400);
    }
    else if(error instanceof require('./MaintenanceModeError')){
        return response.build(error.message, {
            deadline: error.deadline,
            note: error.note
        }, 503);
    }
    else {
        return response.build(buildMessage(error), buildData(error), 500);
    }
}