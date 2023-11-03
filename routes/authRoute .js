const express = require('express');
const { signupvalidator, loginvalidator } = require('../util/validetors/authvalidetor ')

const { singup, login, forgetpassword, verifyPassResetCode, resetPassword } = require('../services/authSrrvice');



const router = express.Router();



router.route('/signup').post(signupvalidator, singup);
router.route('/login').post(loginvalidator, login);
router.route('/forgetPassword').post(forgetpassword);
router.route('/verifyResetCode').post(verifyPassResetCode);
router.route('/resetPassword').put(resetPassword);

module.exports = router;