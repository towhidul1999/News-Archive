module.exports = class AppValidationError extends Error {
    constructor(message){
        super(message);
        this.name = "AppValidationError";
    }
}