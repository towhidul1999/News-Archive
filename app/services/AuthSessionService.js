const AuthSession = lulu.use("app/models/mongoose/AuthSession");
const { v4: uuidv4 } = require('uuid');
const NotFoundError = lulu.use("app/errors/NotFoundError");
module.exports = {
    construct : async function (source, deviceToken, userId, meta) {
        let murdered = false;
        let discoveredSession = await this.discoverSession(source, deviceToken, userId); // check if there is a session with the same source, device and user
        if(discoveredSession){
            await this.kill(discoveredSession._id, source, deviceToken, userId, userId, "Forced By New Session");
            murdered = true;
        }
        const authSession = new AuthSession();
        authSession.token = await this.buildToken();
        authSession.source = source;
        authSession.devices = {
            createdFrom: deviceToken,
            killedFrom: null
        };
        authSession.meta = meta;
        authSession.created_by = userId;
        authSession.killed_by = null;
        authSession.killed_at = null;
        await authSession.save();
        authSession.murdered = murdered;
        return authSession;
    },
    buildToken: async function () {
        return uuidv4();
    },
    verify: async function (sessionId, source, deviceToken, userId) {
        return await AuthSession.findOne({
            _id: sessionId,
            source,
            "devices.createdFrom": deviceToken,
            "devices.killedFrom": null,
            created_by: userId,
            killed_at: null
        });
    },
    kill: async function (sessionId, source, deviceToken, userId, killerId, killMode = "Normal") {
        if(!this.verify(sessionId, source, deviceToken, userId)){
            return new NotFoundError("Session not found.");
        }
        return await AuthSession.findOneAndUpdate(
            {
                _id: sessionId,
                source,
                "devices.createdFrom": deviceToken,
                "devices.killedFrom": null,
                created_at: userId,
                killed_at: null
            },
            {
                $set: {
                    "devices.killedFrom": deviceToken,
                    killed_by: killerId,
                    killMode,
                    killedAt: new Date()
                }
            },
            {
                new: true
            }
        );
    },
    discoverSession: async function (source, deviceToken, userId) {
        return await AuthSession.findOne({
            source,
            "devices.createdFrom": deviceToken,
            "devices.killedFrom": null,
            createdBy: userId,
            killedAt: null
        });
    }
    
}