const {
    Schema,
    model
} = require('mongoose');

const articleSchema = new Schema({
    title: {
        types: Schema.Types.String,
        required: true
    },
    content: {
        types: Schema.Types.String,
        required: true
    },
    author: {
        types: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true
    },
    date: {
        types: Schema.Types.Date,
        default: Date.now
    },
});

module.exports = model('Article', articleSchema);