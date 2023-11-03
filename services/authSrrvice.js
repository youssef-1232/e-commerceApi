const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const createtoken = require('../util/createToken');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const sendEmail = require("../util/sendEamil");
const user = require("../models/userModel");
const apiErorr = require("../util/apiErorr");


exports.singup = asyncHandler(async (req, res, next) => {
  //create user
  const User = await user.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  //gnrate token
  const token = createtoken(User._id);

  res.status(201).json({ data: User, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const User = await user.findOne({ email: req.body.email });

  if (!User || !(await bcrypt.compare(req.body.password, User.password))) {
    return next(new apiErorr("incorect email or password", 401));
  }

  const token = createtoken(User._id);

  res.status(200).json({ data: User, token });
});

exports.protect = asyncHandler(async (req, res, next) => {
  //1:check if token exist
  //console.log(req.headers)
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new apiErorr("you are not login to get acsses this route"),
      401
    );
  }

  //2:verfiy token(change happen ,expired token)
  const decoded = jwt.verify(token, process.env.jwt_secret_key);
  // req.user = decoded;
  //2:check if user exist
  const curentUser = await user.findById(decoded.userId);
  if (!curentUser) {
    return next(
      new apiErorr(
        "THE USER THAT BELONG TO THIS TOKEN DOSENT LONGER EXSIST",
        401
      )
    );
  }
  //check if user change his pass after token created
  if (curentUser.passwordChangedAt) {
    const passChangedTimeStamp = parseInt(
      curentUser.passwordChangedAt.getTime() / 100,
      10
    );
    if (passChangedTimeStamp > decoded.iat) {
      return next(new apiErorr("user resntly changed his password", 401));
    }
  }
  req.user = curentUser;
  next();
});

exports.restictTo =
  (...roles) =>
  (req, res, next) => {
    // role ['admin','seller'].role=user
    if (!roles.includes(req.user.role)) {
      return next(
        res
          .status(403)
          .json("You do not have permission to perform this action")
      );
    }
    next();
  };

exports.forgetpassword = asyncHandler(async (req, res, next) => {
  //get user by email
  const User = await user.findOne({ email: req.body.email });
  if (!User) {
    return next(new apiErorr("no user with this email", 404));
  }

  //if user exist genrate rest code
  const restCode = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedRestCode = crypto
    .createHash("sha256")
    .update(restCode)
    .digest("hex");

  User.passwordResetCode = hashedRestCode;
  User.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  User.passwordResetVerified = false;

  await User.save();

  // res.json(User)
  // 3) Send the reset code via email
  const message = `Hi ${User.name},\n We received a request to reset the password on your E-shop Account. \n ${restCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The E-shop Team`;
  try {
    await sendEmail({
      email: User.email,
      subject: "Your password reset code (valid for 10 min)",
      message,
    });
  } catch (err) {
    User.passwordResetCode = undefined;
    User.passwordResetExpires = undefined;
    User.passwordResetVerified = undefined;

    await User.save();
    return next(new apiErorr("There is an error in sending email", 500));
  }

  res
    .status(200)
    .json({ status: "Success", message: "Reset code sent to email" });
});


// @desc    Verify password reset code
// @route   POST /api/v1/auth/verifyResetCode
// @access  Public
exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // 1) Get user based on reset code
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');

  const User = await user.findOne({
    passwordResetCode: hashedResetCode,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!User) {
    return next(new apiErorr('Reset code invalid or expired'));
  }

  // 2) Reset code valid
  User.passwordResetVerified = true;
  await User.save();

  res.status(200).json({
    status: 'Success',
  });
});

// @desc    Reset password
// @route   POST /api/v1/auth/resetPassword
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) Get user based on email
  const User = await user.findOne({ email: req.body.email });
  if (!User) {
    return next(
      new apiErorr(`There is no user with email ${req.body.email}`, 404)
    );
  }

  // 2) Check if reset code verified
  if (!User.passwordResetVerified) {
    return next(new apiErorr('Reset code not verified', 400));
  }

  User.password = req.body.newPassword;
  User.passwordResetCode = undefined;
  User.passwordResetExpires = undefined;
  User.passwordResetVerified = undefined;

  await User.save();

  // 3) if everything is ok, generate token
  const token = createtoken(User._id);
  res.status(200).json({ token,User });
});
