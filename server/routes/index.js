const router = require('express').Router();
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const itemsRoutes = require('./items.routes');
const ordersRoutes = require('./orders.routes');
const queriesRoutes = require('./queries.routes');

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/items', itemsRoutes);
router.use('/orders', ordersRoutes);
router.use('/queries', queriesRoutes);

module.exports = router;
