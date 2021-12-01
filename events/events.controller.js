const express = require('express');
const router = express.Router();
const eventService = require('./events.service');

// routes
router.post('/create', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;



function create(req, res, next) {
    eventService.create(req.body)
        .then(() => res.json({code: 200}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    eventService.getAll()
        .then(event => res.json({code: 200 , event}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    eventService.getById(req.params.id)
        .then(event => event ? res.json(event) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    eventService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    eventService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}