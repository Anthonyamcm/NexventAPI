const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    title: { type: String, required: true},
    location: { type: Array, required: true},
    dates: { type: Array, required: true},
    times: { type: Array, required: true},
    description: {type: String, required: true},
    imageURL: {type: String, required: true},
    companyID: {type: String, required: true},
    tags: {type: Array, required: true},
    created: {type: Date, default: Date.now}
    
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Events', schema, 'Events');