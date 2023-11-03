const subCategoryRoute = require('./subCategoryroute');
const categoryRoute = require('./categoryRoute');
const brandRoute = require('./BrandRoute');
const productRoute = require("./productRoute");
const userRoute = require("./userRoute");
const authRoute = require("./authRoute ");
const reviewRoute=require('./reveiwRoute');
const wishlisrRoute=require('./wishlistRoute');
const addressRoute=require('./addressRoute');
const cartRoute = require('./cartRoute');
const orderRoute = require('./orderRoute');


//mount
const mountRoute=(app)=>{
    app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/review', reviewRoute);
app.use('/api/v1/wishlist', wishlisrRoute);
app.use('/api/v1/address', addressRoute);
app.use('/api/v1/cart', cartRoute);
app.use('/api/v1/orders', orderRoute);

}
module.exports=mountRoute;