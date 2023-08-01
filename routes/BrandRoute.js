const express = require('express');
const { getBrandvalidator, updateBrandvalidator, creatBrandvalidator, deleteBrandvalidator } = require('../util/validetors/Brandvalidetors')

const { getBrands, createBrand, getBrand, upduateBrand, deleteBrand } = require('../services/BrandService');



const router = express.Router();



router.route('/').get(getBrands).post(creatBrandvalidator, createBrand);
router.route('/:id')
    .get(getBrandvalidator, getBrand)
    .put(updateBrandvalidator, upduateBrand)
    .delete(deleteBrandvalidator, deleteBrand);

module.exports = router;