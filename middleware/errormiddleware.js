const globalerror = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'erorr';
    if (process.env.NODE_ENV == "development") {
        sendfordev(err, res);
    } else {
        sendforprod(err, res);
    }
};
const sendfordev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        erorr: err,
        message: err.message,
        stack: err.stack,
    });

};
const sendforprod = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,

    });

}
module.exports = globalerror;