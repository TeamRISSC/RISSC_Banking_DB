const crypto = require('crypto');

// Hashing the passwords
const hashPassword = (password) => crypto.pbkdf2Sync(password, 'salt', 1000, 32, 'sha256').toString('hex');

module.exports = {
    hashPassword
}