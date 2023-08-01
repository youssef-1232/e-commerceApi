const { check, body } = require('express-validator');

const { default: slugify } = require('slugify');

const { error } = require('console');

// const bcrypt = require('bcryptjs')
const User = require('../../models/userModel');
const validatorMiddleware = require('../../middleware/valideatorMiddleware');

exports.signupvalidator = [
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

    validatorMiddleware
];

exports.loginvalidator = [


    check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address'),


    check('password')
    .notEmpty()
    .withMessage('password required')
    .isLength({ min: 6 })
    .withMessage('password must be at lest 6 '),

    validatorMiddleware
];