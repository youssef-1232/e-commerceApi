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
    image: String,
    //created by and created at on table
}, { timestamps: true });

// 2- Create model
const BrandModel = mongoose.model('Brand', BrandSchema);

module.exports = BrandModel;