const { check } = require('express-validator');
const validatorMiddleware = require('../../middleware/valideatorMiddleware')


exports.getCategoryvalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    validatorMiddleware,
];
exports.creatCategoryvalidator = [
    check('name').notEmpty().withMessage('category required')
    .isLength({ min: 3 }).withMessage('too short category name')
    .isLength({ max: 32 }).withMessage('too long category name'),
    validatorMiddleware
];
exports.updatecategoryvalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    validatorMiddleware,
];
exports.deletecategoryvalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    validatorMiddleware,
];