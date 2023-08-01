// 
const ApiError = require('../util/apiErorr');

const handleJwtInvalidSignature = () =>
    new ApiError('Invalid token, please login again..', 401);

const handleJwtExpired = () =>
    new ApiError('Expired token, please login again..', 401);
const globalerror = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'erorr';
    // eslint-disable-next-line eqeqeq
    if (process.env.NODE_ENV == "development") {
        // eslint-disable-next-line no-use-before-define
        sendfordev(err, res);
    } else {
        if (err.name === 'JsonWebTokenError') err = handleJwtInvalidSignature();
        if (err.name === 'TokenExpiredError') err = handleJwtExpired();
        // eslint-disable-next-line no-use-before-define
        sendforprod(err, res);
    }
};
const sendfordev = (err, res) => res.status(err.statusCode).json({
    status: err.status,
    erorr: err,
    message: err.message,
    stack: err.stack,
});
const sendforprod = (err, res) => res.status(err.statusCode).json({
    status: err.status,
    message: err.message,

})
module.exports = globalerror;//