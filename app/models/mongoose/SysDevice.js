const mongoose = require('mongoose');

// fields definition
const fields = {
    token : {
        type : String // uuid
    },
    token_kind: {
        type: String,
        enum: ['Generated', 'FCM', 'Provided']
    },
    kind: {
        type: String,
        enum: ['App', 'Browser', 'Unknown']
    },
    source: {
        type: String,
    },
    meta : {
        type : Object // {ip: '', os: '', browser: ''}
    },
    optionals: {
        type: Object 
    },
    test_mode: {
        type: Boolean,
        default: false
    }
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

// wrap schema with mongoose model
const model = mongoose.model('SysDevice', schema, 'sys_devices');

module.exports = model;