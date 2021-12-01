const express = require('express');
const router = express.Router();
const businessService = require('./business.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    businessService.authenticate(req.body)
        .then(user => user ? res.status(200).json(user) : res.status(200).json({ message: 'email or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    businessService.create(req.body)
        .then(user => user ? res.status(200).json(user) : res.status().json({ message: 'user taken' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    businessService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    businessService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    businessService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    businessService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    businessService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}