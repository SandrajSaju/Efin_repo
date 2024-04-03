const express = require("express")
const { createNewBook, editBookDetails, deleteBook, getAllbooks, getSearchedBooks } = require("../controllers/bookController")
const router = express.Router()

router.get("/getallbooks", getAllbooks)
router.post("/createbook", createNewBook)
router.post("/editbook/:id", editBookDetails)
router.post("/getsearchedbooks", getSearchedBooks)
router.delete("/deletebook/:id", deleteBook)

module.exports = router