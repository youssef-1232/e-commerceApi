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
    Img: {
        type:Object,
        default:{
            url:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
            PublicId:null,


            
        }
    },

    //created by and created at on table
}, { timestamps: true });

// 2- Create model
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;