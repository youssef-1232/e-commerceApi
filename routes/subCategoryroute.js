const express = require('express');
const { createsubCategory, getsubCategories, getsubCategory, upduatesubCategory, deletesubcategory } = require('../services/subcategoryservices');
const { createSubCategoryValidator, getsubCategoryvalidator, updatesubcategoryvalidator, deletesubcategoryvalidator } = require('../util/validetors/subcategoryvalidetors')
    //mergeParams allow us to access parmaters on other router
const router = express.Router({ mergeParams: true });


router.route('/').post(createSubCategoryValidator, createsubCategory).get(getsubCategories);
router.route('/:id').get(getsubCategoryvalidator, getsubCategory)
    .put(updatesubcategoryvalidator, upduatesubCategory)
    .delete(deletesubcategoryvalidator, deletesubcategory)
module.exports = router;