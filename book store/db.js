const mongoose = require("mongoose")

const connectdb = async () => {
    await mongoose.connect("mongodb://localhost:27017/bookstore")
    console.log("Connect to MongoDB");
}

module.exports=connectdb