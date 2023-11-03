const express = require('express');
const {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} = require('../services/orderServics');

const authService = require('../services/authSrrvice');

const router = express.Router();

router.use(authService.protect);

router.get(
  '/checkout-session/:cartId',
  authService.restictTo('user'),
  checkoutSession
);

router.route('/:cartId').post(authService.restictTo('user'), createCashOrder);
router.get(
  '/',
  authService.restictTo('user', 'admin', 'manager'),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get('/:id', findSpecificOrder);

router.put(
  '/:id/pay',
  authService.restictTo('admin', 'manager'),
  updateOrderToPaid
);
router.put(
  '/:id/deliver',
  authService.restictTo('admin', 'manager'),
  updateOrderToDelivered
);

module.exports = router;