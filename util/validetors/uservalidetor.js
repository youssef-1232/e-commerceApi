const { check, body } = require('express-validator');

const { default: slugify } = require('slugify');

const { error } = require('console');

const bcrypt = require('bcryptjs')
const User = require('../../models/userModel');
const validatorMiddleware = require('../../middleware/valideatorMiddleware');

exports.getuservalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    validatorMiddleware,
];
exports.creatuservalidator = [
    check('name').notEmpty().withMessage('user required')
    .isLength({ min: 3 }).withMessage('too short user name')
    .isLength({ max: 32 }).withMessage('too long user name'),
    body('name').custom((vla, { req }) => {
        req.body.slug = slugify(vla);
        return true
    }),

    check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
        User.findOne({ email: val }).then((user) => {
            if (user) {
                return Promise.reject(new Error('E-mail already in user'));
            }
        })
    ),


    check('password')
    .notEmpty()
    .withMessage('password required')
    .isLength({ min: 6 })
    .withMessage('password must be at lest 6 ').custom((password, { req }) => {
        if (password !== req.body.passwordConfirm) {
            throw new Error('password confirmed incorect')
        }
        return true;
    }),

    check('passwordConfirm').notEmpty().withMessage('passwordConfiram required'),

    check('phone').optional().isMobilePhone(['ar-EG', 'ar-SA']).withMessage('invalid phone number'),

    check('profileImg').optional(),
    check('role').optional(),

    validatorMiddleware
];
exports.updateuservalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    body('name').custom((vla, { req }) => {
        req.body.slug = slugify(vla);
        return true
    }),
    check('phone').optional().isMobilePhone(['ar-EG', 'ar-SA']).withMessage('invalid phone number'),

    check('profileImg').optional(),
    check('role').optional(),
    check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
        User.findOne({ email: val }).then((user) => {
            if (user) {
                return Promise.reject(new Error('E-mail already in user'));
            }
        })
    ),



    validatorMiddleware,
];
exports.changeUserPasswordValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    check('currentPassword')
    .notEmpty()
    .withMessage('You must enter your current password'),
    check('passwordConfirm')
    .notEmpty()
    .withMessage('You must enter the password confirm'),
    check('password')
    .notEmpty()
    .withMessage('You must enter new password')
    .custom(async(val, { req }) => {
        // 1) Verify current password
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error('There is no user for this id');
        }
        const isCorrectPassword = await bcrypt.compare(
            req.body.currentPassword,
            user.password
        );
        if (!isCorrectPassword) {
            throw new Error('Incorrect current password');
        }

        // 2) Verify password confirm
        if (val !== req.body.passwordConfirm) {
            throw new Error('Password Confirmation incorrect');
        }
        return true;
    }),
    validatorMiddleware,
];

exports.deleteuservalidator = [
    check('id').isMongoId().withMessage('invlid id'),
    validatorMiddleware,
];