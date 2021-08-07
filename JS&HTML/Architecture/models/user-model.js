const {
    Schema,
    model
} = require('mongoose');
const hashPassword = require('../utils/hash-password');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
    },

    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },

    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
});

UserSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        hashPassword(user.password)
            .then((hashedPassword) => {
                user.password = hashedPassword;
                next();
            })
            .catch((error) => {
                console.log(error);
                next();
            });
    } else {
        next();
    }
});

module.exports = model('User', UserSchema);