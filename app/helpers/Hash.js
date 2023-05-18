module.exports = {
    make: async function (string) {
        const bcrypt = require('bcrypt');
        return await bcrypt.hash(string, 10);
    },
    compare: async function (string, hash) {
        const bcrypt = require('bcrypt');
        return await bcrypt.compare(string, hash);
    }
}