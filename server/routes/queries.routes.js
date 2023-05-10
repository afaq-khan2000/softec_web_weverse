const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const queriesController = require('../controllers/query.controller');

router.get('/', authorize(), queriesController.getQueries);

router.get('/:id', authorize(), queriesController.getQuery);

router.post('/', authorize('user'), queriesController.createQuery);

router.post('/message/:id', authorize(), queriesController.sendMessage);

router.put('/:id', authorize(), queriesController.updateQuery);

router.delete('/:id', authorize('admin'), queriesController.deleteQuery);

module.exports = router;
