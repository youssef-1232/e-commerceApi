const express = require('express');

const {
  createReviewValidator,
  updateReviewValidator,
  getReviewValidator,
  deleteReviewValidator,
} = require('../util/validetors/reviewValidator');

const {
  getReview,
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
} = require('../services/reviewService');

const authService = require('../services/authSrrvice');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(createFilterObj, getReviews)
  .post(
    authService.protect,
    authService.restictTo('user'),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );
router
  .route('/:id')
  .get(getReviewValidator, getReview)
  .put(
    authService.protect,
    authService.restictTo('user'),
    updateReviewValidator,
    updateReview
  )
  .delete(
    authService.protect,
    authService.restictTo('user', 'manager', 'admin'),
    deleteReviewValidator,
    deleteReview
  );

module.exports = router;