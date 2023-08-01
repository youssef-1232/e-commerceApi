const express = require('express');
const { signupvalidator, loginvalidator } = require('../util/validetors/authvalidetor ')

const { singup, login } = require('../services/authSrrvice');



const router = express.Router();



router.route('/signup').post(signupvalidator, singup);
router.route('/login').post(loginvalidator, login);
// router.route('/:id')
//     .get(getuservalidator, getuser)
//     .put(updateuservalidator, upduateuser)
//     .delete(deleteuservalidator, deleteuser);

module.exports = router;