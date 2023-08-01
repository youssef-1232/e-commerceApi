const express = require('express');
const { getCategoryvalidator, updatecategoryvalidator, creatCategoryvalidator, deletecategoryvalidator } = require('../util/validetors/categoryvalidetors')

const { getCategories, createCategory, getCategory, upduateCategory, deletecategory } = require('../services/categoryService');

const subcategoriesroute = require("./subCategoryroute")
const authSrrvice = require('../services/authSrrvice')

const router = express.Router();

router.use("/:categoryId/subcategoris", subcategoriesroute)

router.route('/').get(getCategories).post(authSrrvice.protect, creatCategoryvalidator, createCategory);
router.route('/:id')
    .get(getCategoryvalidator, getCategory)
    .put(updatecategoryvalidator, upduateCategory)
    .delete(deletecategoryvalidator, deletecategory);

module.exports = router;