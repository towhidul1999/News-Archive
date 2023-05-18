const mongoose = require('mongoose');

// fields definition
const fields = {
    token : {
        type : String // uuid
    },
    
}

// wrap fields with mongoose schema
const schema = mongoose.Schema(fields, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

// wrap schema with mongoose model
const model = mongoose.model('SysHTTPLog', schema, 'sys_http_logs');

module.exports = model;