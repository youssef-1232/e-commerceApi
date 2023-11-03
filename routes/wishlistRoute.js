const express = require('express');

const authService = require('../services/authSrrvice');

const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require('../services/wishlistServics');

const router = express.Router();

router.use(authService.protect, authService.restictTo('user'));

router.route('/').post(addProductToWishlist).get(getLoggedUserWishlist);

router.delete('/:productId', removeProductFromWishlist);

module.exports = router;