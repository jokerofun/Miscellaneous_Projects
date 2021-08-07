const fs = require('fs');
let storage = {};

module.exports = {
    put: (key, value) => {
        if (typeof key === 'string') {
            if (!storage.hasOwnProperty(key)) {
                storage[key] = value;
            } else {
                throw new Error("Key already exists");
            }
        } else {
            throw new Error("The key should be string");
        }
    },
    get: (key) => {
        if (typeof key === 'string') {
            if (storage.hasOwnProperty(key)) {
                return storage[key];
            } else {
                throw new Error("Key doesn't exist");
            }
        } else {
            throw new Error("The key should be string");
        }
    },
    getAll: () => {
        if (Object.keys(storage).length === 0) {
            throw new Error("The storage is empty");
        } else {
            return storage;
        }
    },
    update: (key, newValue) => {
        if (typeof key === 'string') {
            if (storage.hasOwnProperty(key)) {
                storage[key] = newValue;
            } else {
                throw new Error("The key doesn't exist");
            }
        } else {
            throw new Error("Key must be string type!");
        }
    },
    del: (key) => {
        if (typeof key === 'string') {
            if (storage.hasOwnProperty(key)) {
                delete storage[key];
            } else {
                throw new Error("The key doesn't exist");
            }
        } else {
            throw new Error("Key must be string type!");
        }
    },
    clear: () => {
        storage = {};
    },
    save: () => {
        fs.writeFileSync("storage.json", JSON.stringify(storage), "utf-8");
    },
    load: () => {
        if (fs.existsSync("storage.json")) {
            let data = fs.readFileSync("storage.json");
            storage = JSON.parse(data);
        }
    }
};