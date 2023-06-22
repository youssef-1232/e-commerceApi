class apiErorr extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? 'faill' : 'error';
        this.isopreational = true;

    }

}
module.exports = apiErorr;