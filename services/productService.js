// eslint-disable-next-line import/order
const Product = require("../models/ProductModel");
const factory = require("./handlerFactory");



//desc get list of product
//route get/api/v1/product
//public
exports.getProducts = factory.getAll(Product, "products")



// asyncHandler(async(req, res) => {
//     //bulid qurey

//     const documentCounts = await Product.countDocuments();
//     console.log(documentCounts)
//     const apifeatures = new ApiFeatures(Product.find(), req.query)
//         .paginate(documentCounts)
//         .sort()
//         .filter()
//         .limitFiled()
//         .search("Products", req.query);
//     //execute qurey
//     const { mongossequry, paginationResult } = apifeatures;
//     const products = await mongossequry;

//     res
//         .status(200)
//         .json({ results: products.length, paginationResult, data: products });
// });

//get single product
//route get/api/v1/product/:id
//public
exports.getProduct = factory.getOne(Product,'reviews')




// asyncHandler(async(req, res, next) => {
//     // eslint-disable-next-line prefer-destructuring, no-undef
//     id = req.params.id;
//     const product = await Product.findById(id).populate({
//         path: "category",
//         select: "name",
//     });
//     if (!product) {
//         // eslint-disable-next-line new-cap, no-undef
//         return next(new apiErorr(`cant find this product: ${id}`, 404));
//     }
//     res.status(200).json({ data: product });
// });

//desc   create product
//route post/api/v1/product
//private
exports.createProduct = factory.createOne(Product)



// asyncHandler(async(req, res) => {
//     req.body.slug = slugify(req.body.title);

//     const product = await Product.create(req.body);

//     res.status(200).json({ data: product });
// });

//upduate
//route put/api/v1/product/:id
//private
exports.upduateProduct = factory.ubdateOne(Product)


// asyncHandler(async(req, res, next) => {
//     const { id } = req.params;
//     if (req.body.title) {
//         req.body.slug = slugify(req.body.title);
//     }

//     const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
//         new: true,
//     });
//     if (!product) {
//         return next(new apiErorr(`cant find this product: ${id}`, 404));
//     }
//     res.status(200).json({ data: product });
// });

//delete
//route put/api/v1/product/:id
//private
exports.deleteProduct = factory.deleteOne(Product);
// exports.deleteProduct = asyncHandler(async(req, res, next) => {
//     const { id } = req.params;
//     const product = await Product.findByIdAndDelete({ _id: id });
//     if (!product) {
//         return next(new apiErorr(`cant find this product: ${id}`, 404));
//     }
//     res.status(204).send();
// });