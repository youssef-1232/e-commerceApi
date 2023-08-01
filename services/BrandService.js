// eslint-disable-next-line import/order
const Brand = require('../models/BrandModel');
const factory = require('./handlerFactory')


//desc get list of Brands
//route get/api/v1/Brands
//public
exports.getBrands = factory.getAll(Brand)



// asyncHandler(async(req, res) => {
//     // const page = req.query.page * 1 || 1
//     // const limit = req.query.limit * 1 || 5
//     // const skip = (page - 1) * limit //(2-1)*5=5=>max length of doc in every page
//     // const Brands = await Brand.find({}).skip(skip).limit(limit)
//     const documentCounts = await Brand.countDocuments();
//     const apifeatures = new ApiFeatures(Brand.find(), req.query).paginate(documentCounts).sort().filter().limitFiled().search("hh", req.query);
//     //execute qurey
//     const { mongossequry, paginationResult } = apifeatures
//     const Brands = await mongossequry;

//     res.status(200).json({ results: Brands.length, paginationResult, data: Brands });
// });


//get single Brand
//route get/api/v1/Brands/:id
//public
exports.getBrand = factory.getOne(Brand)




// asyncHandler(async(req, res, next) => {
//     // eslint-disable-next-line prefer-destructuring, no-undef
//     id = req.params.id;
//     const brand = await Brand.findById(id)
//     if (!brand) {
//         // eslint-disable-next-line new-cap, no-undef
//         return next(new apiErorr(`cant find this brand: ${id}`, 404))
//     }
//     res.status(200).json({ data: brand })
// });


//desc   create Brand
//route post/api/v1/Brands
//private
exports.createBrand = factory.createOne(Brand)


// asyncHandler(async(req, res) => {
//     const { name } = req.body;

//     const brand = await Brand.create({ name, slug: slugify(name) });

//     res.status(200).json({ data: brand });





// });

//upduate
//route put/api/v1/Brands/:id
//private
exports.upduateBrand = factory.ubdateOne(Brand)
    // exports.upduateBrand = asyncHandler(async(req, res, next) => {

//     // eslint-disable-next-line no-undef
//     const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     if (!brand) {
//         return next(new apiErorr(`cant find this brand: ${req.params.id}`, 404))
//     }
//     res.status(200).json({ data: brand })
// });

//del
//route put/api/v1/Brands/:id
//private
exports.deleteBrand = factory.deleteOne(Brand)
    // exports.deleteBrand = asyncHandler(async(req, res, next) => {
    //     id = req.params.id;
    //     const brand = await Brand.findByIdAndDelete(id)
    //     if (!brand) {
    //         return next(new apiErorr(`cant find this brand: ${id}`, 404))
    //     }
    //     res.status(204).send()
    // })