const express = require('express');
const {
    createsubCategory,
    getsubCategories,
    getsubCategory,
    upduatesubCategory,
    deletesubcategory,
    setCategoryIdtoBody,
    createFliterObj
} = require('../services/subcategoryservices');
const {
    createSubCategoryValidator,
    getsubCategoryvalidator,
    updatesubcategoryvalidator,
    deletesubcategoryvalidator
} = require('../util/validetors/subcategoryvalidetors')
const auth=require('../services/authSrrvice')
    //mergeParams allow us to access parmaters on other router
const router = express.Router({ mergeParams: true });


router.route('/')
    .post(setCategoryIdtoBody, createSubCategoryValidator, createsubCategory)
    .get(createFliterObj,auth.protect, getsubCategories);
router.route('/:id')
    .get(getsubCategoryvalidator,auth.protect, getsubCategory)
    .put(updatesubcategoryvalidator, upduatesubCategory)
    .delete(deletesubcategoryvalidator, deletesubcategory)
module.exports = router;