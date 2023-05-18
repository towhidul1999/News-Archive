module.exports = class RequestIsBastardError extends Error {
    constructor(message){
        super(message);
        this.name = "RequestIsBastardError";
    }
}