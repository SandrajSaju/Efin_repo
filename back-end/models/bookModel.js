const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        required: true
    },
    price: {
        type:Number,
        required:true
    }
})

const Book = mongoose.model('Book',bookSchema);

module.exports = Book