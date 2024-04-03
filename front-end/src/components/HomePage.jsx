import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [books, setBooks] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editedBook, setEditedBook] = useState({
    name: '',
    description:"",
    price:"",
    publishDate:''
});
  
  const getAllBooks = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/book/getallbooks', {
        params: {
          page: currentPage
        }
      });
      setBooks(data.books);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllBooks()
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handleDeleteClick = async (id) => {
    await axios.delete(`http://localhost:4000/book/deletebook/${id}`)
    getAllBooks()
  }

  const handleEditClick = async (book) => {
    setSelectedBook(book);
    const formattedDate = book.publishDate ? new Date(book.publishDate).toISOString().split('T')[0] : '';
    setEditedBook({
      name: book.name,
      description: book.description,
      price: book.price,
      publishDate: formattedDate
  });
  setIsEditModalOpen(true);
  }

  const handleUpdateBook = async () => {
    const id = selectedBook._id
    const formData = new FormData();
    formData.append("name", editedBook.name);
    formData.append("description", editedBook.description);
    formData.append("price", editedBook.price);
    formData.append("publishDate", editedBook.publishDate);

    await axios.post(`http://localhost:4000/book/editbook/${id}`, editedBook)
    setIsEditModalOpen(false);
    setSelectedBook(null);
    setEditedBook({
      name: '',
      description:"",
      price:"",
      publishDate:''
    });
    getAllBooks();
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setEditedBook((prevData) => ({
      ...prevData,
      [name]: value,
  }));
};

const handleSearch = async (text) => {
    const {data} = await axios.post('http://localhost:4000/book/getsearchedbooks', { text })
    console.log(data);
    setBooks(data)
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

  return (
    <div>
    <h1 className="text-3xl font-bold underline text-center">
      Welcome to Book World!
    </h1>
    <div className='text-center'>
      <Link to='/addnewbook'><button className='bg-green-500 mt-5 px-2 py-1 text-white rounded-lg'>Add New Book</button></Link>
    </div>

    <div class="flex w-full md:justify-center justify-center items-center mt-5">
        <div class="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
          <input type="text" onChange={(e) => handleSearch(e.target.value)} placeholder='Search For Books' id="hero-field" name="hero-field" className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-purple-200 focus:bg-transparent focus:border-slate-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
        </div>
      <button className="inline-flex text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-700 rounded text-lg">Search</button>
    </div>

    <div className="container mx-auto p-4 w-4/5 max-md:w-3/5">
                <h1 className='text-3xl font-bold title-font mb-10 text-gray-900 tracking-wider text-center'>All Books</h1>
                <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Description</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Published Date</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book._id}>
                                <td className="py-2 px-4 border-b text-center">{book.name}</td>
                                <td className="py-2 px-4 border-b text-center">{book.description}</td>
                                <td className="py-2 px-4 border-b text-center">{book.price}</td>
                                <td className="py-2 px-4 border-b text-center">{formatDate(book.publishDate)}</td>
                                <td className="py-2 px-4 border-b text-center space-x-3">
                                    <button
                                        className="ml-2 px-2 py-2 w-28 bg-gray-800 text-white hover:bg-blue-500 rounded-lg"
                                        onClick={() => handleEditClick(book)} 
                                    >
                                        Edit Details
                                    </button>

                                    <button
                                        className="ml-2 px-2 py-2 w-28 bg-gray-800 text-white hover:bg-red-500 rounded-lg"
                                        onClick={() => handleDeleteClick(book._id)}
                                    >
                                        Delete Book
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
            <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevPage}
              className="mx-1 px-3 py-2 bg-gray-300 rounded"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`mx-1 px-3 py-2 ${page === currentPage ? 'bg-gray-700 text-white' : 'bg-gray-300'
                  } rounded`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              className="mx-1 px-3 py-2 bg-gray-300 rounded"
            >
              Next
            </button>
          </div>



          {isEditModalOpen && selectedBook && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                            &#8203;
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="p-2">
                                        <div className="relative">
                                            <label for="title" className="leading-7 text-gray-600 text-sm font-bold">Name</label>
                                            <input type="text" id="name" name="name" value={editedBook.name} onChange={handleChange}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <div className="relative">
                                            <label for="description" className="leading-7 text-gray-600 text-sm font-bold">Description</label>
                                            <input type="text" id="description" name="description" onChange={handleChange}
                                                value={editedBook.description} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                    <div className="p-2">
                                        <div className="relative">
                                            <label for="compensation" className="leading-7 text-gray-600 text-sm font-bold">price</label>
                                            <input type="number" id="price" name="price" value={editedBook.price} onChange={handleChange}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>

                                    <div className="p-2 w-full">
                                        <div className="relative">
                                            <label for="date" className="leading-7 text-gray-600 text-sm font-bold">Publish Date</label>
                                            <input type="date" id="publishDate" name="publishDate" value={editedBook.publishDate || ''} onChange={handleChange}
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        onClick={handleUpdateBook}
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => setIsEditModalOpen(false)}
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
    </div>
  )
}

export default HomePage
