const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middleware/valideatorMiddleware');
const { default: slugify } = require('slugify');


exports.getBrandvalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    validatorMiddleware,
];
exports.creatBrandvalidator = [
    check('name').notEmpty().withMessage('Brand required')
    .isLength({ min: 3 }).withMessage('too short Brand name')
    .isLength({ max: 32 }).withMessage('too long Brand name'),
    body('name').custom((vla, { req }) => {
        req.body.slug = slugify(vla);
        return true
    }),
    validatorMiddleware
];
exports.updateBrandvalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    body('name').custom((vla, { req }) => {
        req.body.slug = slugify(vla);
        return true
    }),

    validatorMiddleware,
];
exports.deleteBrandvalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    validatorMiddleware,
];