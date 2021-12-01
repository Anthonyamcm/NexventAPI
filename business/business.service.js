const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Business = db.Business;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) {
    const business = await Business.findOne({ email });
    if (business && bcrypt.compareSync(password, business.hash)) {
        const token = jwt.sign({ sub: business.id }, config.secret, { expiresIn: '7d' });
        updateLogin(business.id)
        return {
            status: {
                code: 200
            },
            body: {
                ...business.toJSON(),
                token
            }
        };
    }
}

async function getAll() {
    return await Business.find();
}

async function getById(id) {
    return await Business.findById(id);
}

async function create(userParam) {
    // validate
    if (await Business.findOne({ email: userParam.email })) {
        throw 'email is already in use';
    }

    const business = new Business(userParam);

    // hash password
    if (userParam.password) {
        business.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await business.save();

    const user = await Business.findOne({email: userParam.email });
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    return {
        status: {
            code: 200
        },
        body: {
            ...business.toJSON(),
            token
        }
    };


}

async function update(id, userParam) {
    const business = await Business.findById(id);

    // validate
    if (!business) throw 'User not found';
    if (business.email !== userParam.email && await Business.findOne({ email: userParam.email })) {
        throw 'email "' + userParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
    
    // copy userParam properties to user
    Object.assign(business, userParam);

    await business.save();
}

async function updateLogin(id){
    const business = await Business.findById(id);
    if (!business) throw 'User not found';

    business.lastLogin == Date.now

    await business.save();
}

async function _delete(id) {
    await Business.findByIdAndRemove(id);
}