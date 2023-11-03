// eslint-disable-next-line import/order
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs')
// eslint-disable-next-line import/order
const createtoken = require('../util/createToken');
const path=require("path")
const fs=require('fs')
const apiErorr = require('../util/apiErorr')

const factory = require('./handlerFactory')
const {cloudinaryRemoveImage,cloudinaryUploadImage}=require('../util/cloudinary')
const user = require('../models/userModel');



//desc get list of user
//route get/api/v1/user
//private
exports.getusers = factory.getAll(user)





//get single user
//route get/api/v1/user/:id
//private
exports.getuser = factory.getOne(user)






//desc   create user
//route post/api/v1/user
//private
exports.createuser = factory.createOne(user)




//upduate
//route put/api/v1/user/:id
//private
exports.upduateuser = asyncHandler(async(req, res, next) => {

    // eslint-disable-next-line no-undef
    const Document = await user.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        slug: req.body.slug,
        phone: req.body.phone,
        email: req.body.email,
        profileImg: req.body.profileImg,
        role: req.body.role,
    }, { new: true })
    if (!Document) {
        return next(new apiErorr(`cant find this Document: ${req.params.id}`, 404))
    }
    res.status(200).json({ data: Document })
});

exports.changeUserPassword = asyncHandler(async(req, res, next) => {

    // eslint-disable-next-line no-undef
    const Document = await user.findByIdAndUpdate(req.params.id, {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now(),

    }, { new: true })
    if (!Document) {
        return next(new apiErorr(`cant find this Document: ${req.params.id}`, 404))
    }
    res.status(200).json({ data: Document })
});
//del
//route put/api/v1/user/:id
//private
exports.deleteuser = factory.deleteOne(user)



// @desc    Get Logged user data
// @route   GET /api/v1/users/getMe
// @access  Private/Protect
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
    req.params.id = req.user._id;
    next();
  });



exports.uploadUserPhoto=asyncHandler(async(req,res)=>{
    //validation
    if(!req.file){
      return  res.status(400).json({message:"no photo provided to upload"})
    }


    //2:get the path to the image
    const imagePathe=path.join(__dirname,`../images/${req.file.filename}`);

//3:upload to cloudinary
const result=await cloudinaryUploadImage(imagePathe);
//console.log(result)
//4:get the user from db

const User= await user.findById(req.user.id);

//5:delete the olad profile photo if exist
if(User.Img.PublicId!=null){
    await cloudinaryRemoveImage(User.Img.PublicId);
}
//6:change the profile photo in db
User.Img={
    url:result.secure_url,
    PublicId:result.public_id,                
}
await User.save();


//send res
    res.status(200).json({message:"photo uploaded",
    Img:{ url: result.secure_url, PublicId: result.public_id },
})


//remove image from server
fs.unlinkSync(imagePathe);
})

// @desc    Update logged user password
// @route   PUT /api/v1/users/updateMyPassword
// @access  Private/Protect
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
    // 1) Update user password based user payload (req.user._id)
    // console.log(req.user)
    const User = await user.findByIdAndUpdate(
        
      req.user._id,
      {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now(),
      },
      {
        new: true,
      }
    );
  
    // 2) Generate token
    const token = createtoken(User._id);
  
    res.status(200).json({ data: User, token });
  });
  
  // @desc    Update logged user data (without password, role)
  // @route   PUT /api/v1/users/updateMe
  // @access  Private/Protect
  exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
    const updatedUser = await user.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
      { new: true }
    );
  
    res.status(200).json({ data: updatedUser });
  });
  
  // @desc    Deactivate logged user
  // @route   DELETE /api/v1/users/deleteMe
  // @access  Private/Protect
  exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
    await user.findByIdAndUpdate(req.user._id, { active: false });
  
    res.status(204).json({ status: 'Success' });
  });