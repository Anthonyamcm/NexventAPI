const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Event = db.Events;

module.exports = {
    create,
    getAll,
    update,
    delete: _delete
};

async function create(Param) {
    // validate

    const event = new Event(Param);

    // save user
    await event.save();

}

async function getAll() {
    return await Event.find();
}

async function update(id, Param) {
    const event = await Event.findById(id);

    // validate
    if (!event) throw 'User not found';
    

    Object.assign(event, Param);

    await event.save();
}


async function _delete(id) {
    await Event.findByIdAndRemove(id);
}