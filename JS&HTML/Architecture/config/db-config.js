const mongoose = require('mongoose');

function initDb(str) {
    return new Promise((resolve, reject) => {
        mongoose.connect(str, (err) => {
            if (err) {
                reject(err);
            }

            resolve();
        });
    });
}

module.exports = initDb;