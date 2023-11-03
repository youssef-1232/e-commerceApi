const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: '.env' });
const { Error } = require('mongoose');
const dbConnection = require('./config/database');
const apiErorr = require('./util/apiErorr');
const globalerror = require('./middleware/errormiddleware');
//route
const mountRoute=require('./routes')

// Connect with db
        dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`);

}

// Mount Routes

mountRoute(app)


app.all('*', (req, res, next) => {
    //create error and send it to erorr handling middleware
    // const err = new Error(`cant find this route: ${req.originalUrl}`);

    // next(err.message)
    next(new apiErorr(`cant find this route: ${req.originalUrl}`, 400))
});

//global erorr handling middelwaere
app.use(globalerror)

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`App running running on port ${PORT}`);
});
//envnt to handle erorr outside of express
process.on("unhandledRejection", (err) => {
    console.error(`unhandledRejection Errors: ${err.name} |${err.message}`);
    server.close(() => {

        console.error(`shutting down...`);
        process.exit(1);
    });

});



//DB_URI='mongodb+srv://ym79793:a9ZoKqdFNfAuiA2z@atlasdb.in2rkqn.mongodb.net/atlasdb?retryWrites=true&w=majority'
// pass a9ZoKqdFNfAuiA2z