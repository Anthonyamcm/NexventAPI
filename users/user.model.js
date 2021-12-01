const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: 'Please enter your email' },
    name: { type: String, required: 'Please enter your name' },
    hash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    likes: {type: Array, default: []},
    dislikes: {type: Array, default: []}
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', schema, 'User');