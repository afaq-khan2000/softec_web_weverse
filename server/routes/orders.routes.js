const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const orderControllers = require('../controllers/orders.controller');

router.get('/', authorize(), orderControllers.getOrders);

router.get('/:id', authorize(), orderControllers.getOrder);

router.put('/:id', authorize(), orderControllers.updateOrder);

router.delete('/:id', authorize('admin'), orderControllers.deleteOrder);

router.post('/review', authorize('user'), orderControllers.createReview);

module.exports = router;
