const router = require("express").Router();
const errorHandler = require('../errors/errorHandler')
const methodNotAllowed = require('../errors/methodNotAllowed')
const notFound = require('../errors/notFound')

// TODO: Implement the /dishes routes needed to make the tests pass
const controller = require('./dishes.controller');


router.route('/')
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)
    .all(errorHandler)
    .all(notFound)

router.route('/:dishId')
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)
    .all(errorHandler)
    .all(notFound)


module.exports = router;
