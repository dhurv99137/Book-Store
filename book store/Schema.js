const mongoose = require("mongoose")

let Book = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    publicationYear: Number,
    price: Number,
    quantity: Number,
    description: String,
    imageUrl: String,
},
{
     timestamps: true
});

const bookstore=mongoose.model("Schema",Book)

module.exports=bookstore