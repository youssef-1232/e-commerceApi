const express = require('express');

const authService = require('../services/authSrrvice');

const {
  addAddress,
  removeAddress,
  getLoggedUserAddresses,
} = require('../services/addressServics');

const router = express.Router();

router.use(authService.protect, authService.restictTo('user'));

router.route('/').post(addAddress).get(getLoggedUserAddresses);

router.delete('/:addressId', removeAddress);

module.exports = router;