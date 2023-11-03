const express = require('express');
const {
    getProductValidator,
    updateProductValidator,
    createProductValidator,
    deleteProductValidator
} = require('../util/validetors/productValidetors')

const {
    getProducts,
    createProduct,
    getProduct,
    upduateProduct,
    deleteProduct
} = require('../services/productService');

const reviewRoute=require('./reveiwRoute');
const { protect } = require('../services/authSrrvice');

const router = express.Router();

//aplly nested route  product-->review
router.use('/:productId/reviews',reviewRoute)

router.route('/').get(protect,getProducts).post(protect,createProductValidator, createProduct);
router.route('/:id')
    .get(getProductValidator, getProduct)
    .put(updateProductValidator, upduateProduct)
    .delete(deleteProductValidator, deleteProduct);

module.exports = router;