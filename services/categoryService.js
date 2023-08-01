// eslint-disable-next-line import/order
const categorys = require('../models/categoryModel');

const factory = require('./handlerFactory')
    //desc get list of category
    //route get/api/v1/categories
    //public
exports.getCategories = factory.getAll(categorys)




// asyncHandler(async(req, res) => {
//     // const page = req.query.page * 1 || 1
//     // const limit = req.query.limit * 1 || 5
//     // const skip = (page - 1) * limit //(2-1)*5=5=>max length of doc in every page
//     // const categores = await categorys.find({}).skip(skip).limit(limit)

//     //bulid qurey
//     const documentCounts = await categorys.countDocuments();
//     const apifeatures = new ApiFeatures(categorys.find(), req.query).paginate(documentCounts).sort().filter().limitFiled().search("hh", req.query);
//     //execute qurey
//     const { mongossequry, paginationResult } = apifeatures
//     const categores = await mongossequry;
//     res.status(200).json({ results: categores.length, paginationResult, data: categores });
// });


//get single category
//route get/api/v1/category/:id
//public
exports.getCategory = factory.getOne(categorys)




// asyncHandler(async(req, res, next) => {
//     // eslint-disable-next-line prefer-destructuring, no-undef
//     id = req.params.id;
//     // eslint-disable-next-line no-undef
//     const category = await categorys.findById(id)
//     if (!category) {
//         // eslint-disable-next-line new-cap, no-undef
//         return next(new apiErorr(`cant find this category: ${id}`, 404))
//     }
//     res.status(200).json({ data: category })
// });


//desc   create category
//route post/api/v1/categories
//private
exports.createCategory = factory.createOne(categorys)


// asyncHandler(async(req, res) => {
//     const { name } = req.body;

//     const category = await categorys.create({ name, slug: slugify(name) });

//     res.status(200).json({ data: category });





// });

//upduate
//route put/api/v1/categories/:id
//private
exports.upduateCategory = factory.ubdateOne(categorys)
    // exports.upduateCategory = asyncHandler(async(req, res, next) => {
    //     id = req.params.id;
    //     name = req.body.name;
    //     const category = await categorys.findOneAndUpdate({ id }, { name, slug: slugify(name) }, { new: true })
    //     if (!category) {
    //         return next(new apiErorr(`cant find this category: ${id}`, 404))
    //     }
    //     res.status(200).json({ data: category })
    // });

//delete
//route put/api/v1/categories/:id
//private
exports.deletecategory = factory.deleteOne(categorys)
    // exports.deletecategory = asyncHandler(async(req, res, next) => {
    //     id = req.params.id;
    //     const category = await categorys.findByIdAndDelete(id)
    //     if (!category) {
    //         return next(new apiErorr(`cant find this category: ${id}`, 404))
    //     }
    //     res.status(204).send()
    // })