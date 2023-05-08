const router = require("express").Router();
const errorHandler = require('../errors/errorHandler')
const methodNotAllowed = require('../errors/methodNotAllowed')
const notFound = require('../errors/notFound')

// TODO: Implement the /orders routes needed to make the tests pass
const controller = require('./orders.controller');


router.route('/')
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)

router.route('/:orderId')
    .get(controller.read)
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)



module.exports = router;
