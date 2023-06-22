const mongoose = require('mongoose');
// 1- Create Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category required'],
        unique: [true, 'category must be unique'],
        minlength: [3, 'too short category'],
        maxlength: [32, 'too long category'],
    },

    // A and B =>shoping.com/a-and-b
    slug: {

        type: String,
        lowercase: true,
    },
    image: String,
    //created by and created at on table
}, { timestamps: true });

// 2- Create model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;