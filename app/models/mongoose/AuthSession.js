const mongoose = require('mongoose');

// fields definition
const fields = {
    token: {
        type: String // uuid
    },
    source: {
        type: String 
    },
    devices: {
        type: Object // {createdFrom: String,  killedFrom: String}
    }, // array of user ids
    meta: {
        type: Object // {ip: '', os: '', browser: ''}
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    killed_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    kill_mode: {
        type: String // Normal, Forced, Suspicious, Forced By New Session, Forced By Admin
    },
    killed_at: {
        type: Date
    }
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

// wrap schema with mongoose model
const model = mongoose.model('AuthSession', schema, 'auth_sessions');

module.exports = model;