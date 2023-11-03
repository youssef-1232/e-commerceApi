const express = require('express');
const { getuservalidator, updateuservalidator, creatuservalidator, deleteuservalidator, changeUserPasswordValidator } = require('../util/validetors/uservalidetor')

const { getuser, createuser, getusers, upduateuser, deleteuser, changeUserPassword, uploadUserPhoto, getLoggedUserData, updateLoggedUserPassword, updateLoggedUserData, deleteLoggedUserData } = require('../services/userService');
const { protect } = require('../services/authSrrvice');
const photoUpload = require('../middleware/uploadPhoto');



const router = express.Router();

router.get('/getme',protect,getLoggedUserData,getuser);
router.put('/changeMyPassword',protect, updateLoggedUserPassword);
router.put('/updateMe', updateLoggedUserData);
router.delete('/deleteMe', deleteLoggedUserData);


router.put('/changePassword/:id', changeUserPasswordValidator, changeUserPassword)

router.route('/').get(protect,getusers).post(creatuservalidator, createuser);
router.route('/:id')
    .get(getuservalidator, getuser)
    .put(updateuservalidator, upduateuser)
    .delete(protect,deleteuservalidator, deleteuser);

    router.route('/uploadImage')
          .post(protect,photoUpload.single("image"), uploadUserPhoto)
module.exports = router;