const express = require('express');
const { getuservalidator, updateuservalidator, creatuservalidator, deleteuservalidator, changeUserPasswordValidator } = require('../util/validetors/uservalidetor')

const { getuser, createuser, getusers, upduateuser, deleteuser, changeUserPassword } = require('../services/userService');



const router = express.Router();

router.put('/changePassword/:id', changeUserPasswordValidator, changeUserPassword)

router.route('/').get(getusers).post(creatuservalidator, createuser);
router.route('/:id')
    .get(getuservalidator, getuser)
    .put(updateuservalidator, upduateuser)
    .delete(deleteuservalidator, deleteuser);

module.exports = router;