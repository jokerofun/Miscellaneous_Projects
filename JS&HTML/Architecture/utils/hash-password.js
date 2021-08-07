const {
    genSalt,
    hash
} = require('bcryptjs');

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        genSalt(20, (err, salt) => {
            if (err) {
                reject(err);
            }

            hash(password, salt, (err, hashedPassword) => {
                if (err) {
                    reject(err);
                }

                resolve(hashedPassword);
            });
        });
    });
}

module.exports = hashedPassword;