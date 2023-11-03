const mongoose = require('mongoose');
// 1- Create Schema
const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Brand required'],
        unique: [true, 'Brand must be unique'],
        minlength: [3, 'too short Brand'],
        maxlength: [32, 'too long Brand'],
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
const BrandModel = mongoose.model('Brand', BrandSchema);

module.exports = BrandModel;