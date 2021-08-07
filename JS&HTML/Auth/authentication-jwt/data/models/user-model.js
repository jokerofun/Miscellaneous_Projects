const {
    Schema,
    model
} = require('mongoose');
const jwt = require('jsonwebtoken');
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
    token: [{
        _id: {
            type: String,
            required: true,
        }
    }],
});

UserSchema.methods.generateAuthToken = () => {
    const user = this;

    const token = jwt.sign({
        _id: user._id.toHexString()
    }, 'secret');

    user.tokens.push(token);

    return user.save()
        .then(() => token)
        .catch(() => console.error(err));
};

const User = model('User', UserSchema);
module.exports = User;