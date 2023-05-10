const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const itemControllers = require('../controllers/items.controllers');

router.get('/:type', itemControllers.getItems);

router.get('/getOne/:id', itemControllers.getItem);

router.post('/:type', authorize('admin'), itemControllers.createItem);

router.put('/:id', authorize('admin'), itemControllers.updateItem);

router.delete('/:id', authorize('admin'), itemControllers.deleteItem);

module.exports = router;
