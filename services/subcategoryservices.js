const slugify = require('slugify');
const asyncHandler = require('express-async-handler'); //to avoid using promis
const SubCategory = require('../models/subcategorymodel');
const ApiError = require('../util/apiErorr');


//desc   create subcategory
//route post/api/v1/subcategories
//private
exports.createsubCategory = asyncHandler(async(req, res) => {
    const { name, Category } = req.body;


    const subCategory = await SubCategory.create({ name, slug: slugify(name), Category });

    res.status(201).json({ data: subCategory });


});

//desc get list of subcategory
//route get/api/v1/subcategories
//public
exports.getsubCategories = asyncHandler(async(req, res) => {
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 5
    const skip = (page - 1) * limit //(2-1)*5=5=>max length of doc in every page
    let filterobject = {}
    if (req.params.categoryId) filterobject = { category: req.params.categoryId }
    const subcategores = await SubCategory.find(filterobject).skip(skip).limit(limit)

    console.log(req.params)

    res.status(200).json({ results: subcategores.length, data: subcategores });
});


//get single category
//route get/api/v1/category/:id
//public
exports.getsubCategory = asyncHandler(async(req, res, next) => {
    // eslint-disable-next-line prefer-destructuring, no-undef
    id = req.params.id;
    const subcategory = await SubCategory.findById(id)
    if (!subcategory) {
        // eslint-disable-next-line new-cap, no-undef
        return next(new ApiError(`cant find this subcategory: ${id}`, 404))
    }
    res.status(200).json({ data: subcategory })
});




//upduate
//route put/api/v1/subcategories/:id
//private
exports.upduatesubCategory = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const { name, category } = req.body;
    const subcategory = await SubCategory.findOneAndUpdate({ _id: id }, { name, slug: slugify(name), category }, { new: true })
    if (!subcategory) {
        return next(new ApiError(`cant find this category: ${id}`, 404))
    }
    res.status(200).json({ data: subcategory })
});

//delete
//route put/api/v1/subcategories/:id
//private
exports.deletesubcategory = asyncHandler(async(req, res, next) => {
    const { id } = req.params;
    const subcategory = await SubCategory.findByIdAndDelete(id)
    if (!subcategory) {
        return next(new ApiError(`cant find this category: ${id}`, 404))
    }
    res.status(204).send()
})