const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');
const businessService = require('../business/business.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, algorithms: ['HS256']}).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/register',
            '/business/authenticate',
            '/business/register',
        ]
    });
}