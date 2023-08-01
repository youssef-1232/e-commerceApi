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



const router = express.Router();



router.route('/').get(getProducts).post(createProductValidator, createProduct);
router.route('/:id')
    .get(getProductValidator, getProduct)
    .put(updateProductValidator, upduateProduct)
    .delete(deleteProductValidator, deleteProduct);

module.exports = router;