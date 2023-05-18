module.exports = class PermissionDenied extends Error {
    constructor(message, permission, meta = {}){
        super(message);
        this.name = "PermissionDeniedError";
        this.permission = permission;
        this.meta = meta;
    }
}