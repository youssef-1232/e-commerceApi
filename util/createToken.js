const jwt = require("jsonwebtoken");


const createtoken = (payload) =>
  jwt.sign({ userId: payload }, process.env.jwt_secret_key, {
    expiresIn: process.env.jwt_expire_time,
  });

  module.exports=createtoken;