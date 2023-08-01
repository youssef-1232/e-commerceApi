// eslint-disable-next-line import/order
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs')

const apiErorr = require('../util/apiErorr')

const factory = require('./handlerFactory')
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