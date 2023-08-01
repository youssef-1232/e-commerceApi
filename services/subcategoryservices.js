const SubCategory = require('../models/subcategorymodel');
const factory = require('./handlerFactory')



exports.setCategoryIdtoBody = (req, res, next) => {
    //nested route
    if (!req.body.Category) req.body.Category = req.params.categoryId;
    next();

}

//desc   create subcategory
//route post/api/v1/subcategories
//private
exports.createsubCategory = factory.createOne(SubCategory)


// asyncHandler(async(req, res) => {

//     const { name, Category } = req.body;

//     const subCategory = await SubCategory.create({ name, slug: slugify(name), Category });

//     res.status(201).json({ data: subCategory });


// });
//nested route
exports.createFliterObj = (req, res, next) => {
    let filterobject = {}
    if (req.params.categoryId) filterobject = { category: req.params.categoryId }
    req.filterobj = filterobject;
    next()
}

//desc get list of subcategory
//route get/api/v1/subcategories
//public(
exports.getsubCategories = factory.getAll(SubCategory)



// asyncHandler(async(req, res) => {
//     // const page = req.query.page * 1 || 1
//     // const limit = req.query.limit * 1 || 5
//     // const skip = (page - 1) * limit //(2-1)*5=5=>max length of doc in every page

//     // const subcategores = await SubCategory.find(req.filterobj).skip(skip).limit(limit)

//     // console.log(req.params)
//     //bulid qurey
//     const documentCounts = await SubCategory.countDocuments();
//     const apifeatures = new ApiFeatures(SubCategory.find(), req.query).paginate(documentCounts).sort().filter().limitFiled().search("hh", req.query);
//     //execute qurey
//     const { mongossequry, paginationResult } = apifeatures
//     const subcategores = await mongossequry;

//     res.status(200).json({ results: subcategores.length, paginationResult, data: subcategores });
// });


//get single category
//route get/api/v1/category/:id
//public
exports.getsubCategory = factory.getOne(SubCategory)





// asyncHandler(async(req, res, next) => {
//     // eslint-disable-next-line prefer-destructuring, no-undef
//     id = req.params.id;
//     const subcategory = await SubCategory.findById(id)
//     if (!subcategory) {
//         // eslint-disable-next-line new-cap, no-undef
//         return next(new ApiError(`cant find this subcategory: ${id}`, 404))
//     }
//     res.status(200).json({ data: subcategory })
// });




//upduate
//route put/api/v1/subcategories/:id
//private
exports.upduatesubCategory = factory.ubdateOne(SubCategory)


// asyncHandler(async(req, res, next) => {
//     const { id } = req.params;
//     const { name, category } = req.body;
//     const subcategory = await SubCategory.findOneAndUpdate({ _id: id }, { name, slug: slugify(name), category }, { new: true })
//     if (!subcategory) {
//         return next(new ApiError(`cant find this category: ${id}`, 404))
//     }
//     res.status(200).json({ data: subcategory })
// });

//delete
//route put/api/v1/subcategories/:id
//private
exports.deletesubcategory = factory.deleteOne(SubCategory)
    // exports.deletesubcategory = asyncHandler(async(req, res, next) => {
    //     const { id } = req.params;
    //     const subcategory = await SubCategory.findByIdAndDelete(id)
    //     if (!subcategory) {
    //         return next(new ApiError(`cant find this category: ${id}`, 404))
    //     }
    //     res.status(204).send()
    // })