const Book = require('../models/bookModel');

const createNewBook = async (req, res) => {
    try {
        const { name, description, publishDate, price } = req.body
        if (!name || !description || !publishDate || !price) {
            return res.status(400).json({ error: "Please Fill all fields" })
        }
        const newBook = new Book({
            name,
            description,
            publishDate,
            price
        })
        await newBook.save()
        return res.status(201).json(newBook)
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ error: error.message });
    }
}

const editBookDetails = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const editedBook = req.body;
        const existingBook = await Book.findById(id);
        if (!existingBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        existingBook.name = editedBook.name;
        existingBook.description = editedBook.description;
        existingBook.publishDate = editedBook.publishDate;
        existingBook.price = editedBook.price;
        const updatedBook = await existingBook.save();
        return res.status(200).json({
            message: 'Book Details updated successfully',
            bookDetails: updatedBook
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

const deleteBook = async (req,res) => {
    try {
        const {id} = req.params;
        await Book.findByIdAndDelete(id);
        res.status(200).json({message:"Book Deleted Successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}

const getAllbooks = async (req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = 4;
        const skip = (page - 1) * perPage;
        const books = await Book.find().skip(skip).limit(perPage);
        const totalBooks = await Book.countDocuments();
        const totalPages = Math.ceil(totalBooks / perPage);
        res.status(200).json({books,totalPages})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
}

const getSearchedBooks = async (req, res) => {
    try {
        const { text } = req.body;
        const books = await Book.find({
            $or: [
              { name: new RegExp(text, 'i') },
              { description: new RegExp(text, 'i') }
            ]
          });
        res.status(200).json(books)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createNewBook,
    editBookDetails,
    deleteBook,
    getAllbooks,
    getSearchedBooks
}