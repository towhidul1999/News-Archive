const config = lulu.use('app.config');
const MaintenanceModeError = lulu.use('app/errors/MaintenanceModeError');
const Handler = lulu.use('app/errors/Handler');
const response = lulu.use('app/responses/Response');

module.exports = function (permissions) {
    return async function (req, res, next){
        try {
            
            next();
        }
        catch (error) {
            return response.error(Handler(error), res);
        }
    }

}

