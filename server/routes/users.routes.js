const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const usersController = require('../controllers/users.controller');

router.get('/me', authorize(), usersController.getMe);

router.put('/me', authorize(), usersController.updateMe);

router.get('/favorites', authorize('user'), usersController.getFavorites);

router.post('/favorites', authorize('user'), usersController.addToFavorites);

router.delete(
  '/favorites/:itemId',
  authorize('user'),
  usersController.removeFromFavorites,
);

router.get('/cart', authorize('user'), usersController.getCart);

router.put('/cart', authorize('user'), usersController.addToCart);

router.delete(
  '/cart/:itemId',
  authorize('user'),
  usersController.removeFromCart,
);

router.post('/cart/checkout', authorize('user'), usersController.checkout);

router.get('/blacklist', authorize('admin'), usersController.getBlacklist);

router.post('/blacklist', authorize('admin'), usersController.blacklistUser);

router.put(
  '/blacklist/:userId',
  authorize('admin'),
  usersController.updateBlacklistReason,
);

router.delete(
  '/blacklist/:userId',
  authorize('admin'),
  usersController.unblacklistUser,
);

module.exports = router;
