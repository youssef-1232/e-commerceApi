const { check, body } = require('express-validator');
const slugify = require('slugify');
const validatorMiddleware = require('../../middleware/valideatorMiddleware');



exports.getsubCategoryvalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    validatorMiddleware,
];
exports.createSubCategoryValidator = [
    check('name')
    .notEmpty()
    .withMessage('SubCategory required')
    .isLength({ min: 2 })
    .withMessage('Too short Subcategory name')
    .isLength({ max: 32 })
    .withMessage('Too long Subcategory name')
    .custom((vla, { req }) => {
        req.body.slug = slugify(vla);
        return true
    }),

    check('Category')
    .notEmpty()
    .withMessage('subCategory must be belong to category')
    .isMongoId()
    .withMessage('Invalid subCategory id format'),

    validatorMiddleware,
];

exports.updatesubcategoryvalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    body('name').custom((vla, { req }) => {
        req.body.slug = slugify(vla);
        return true
    }),
    validatorMiddleware,
];
exports.deletesubcategoryvalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    validatorMiddleware,
];