import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddNewBook = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        description:"",
        price:"",
        publishDate:''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:4000/book/createbook', formData);
            navigate('/')
        } catch (error) {

        }
    }

  return (
    <>
      <section className="relative text-gray-600 body-font">
                <div className="container mx-auto">
                    <div className="flex flex-col text-center w-full">
                        <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900 tracking-wider mt-10">Add New Book</h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="name" className="leading-7 text-gray-600 text-sm font-bold">Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>

                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="description" className="leading-7 text-gray-600 text-sm font-bold">Description</label>
                                    <input type="text-area" id="description" name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="price" className="leading-7 text-gray-600 text-sm font-bold">Price</label>
                                    <input type="number" id="price" name="price" value={formData.price} onChange={handleInputChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>

                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label for="date" className="leading-7 text-gray-600 text-sm font-bold">Publish Date</label>
                                    <input type="date" id="publishDate" name="publishDate" value={formData.publishDate} onChange={handleInputChange} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>

                            <div className="p-2 w-full">
                                <button onClick={handleSubmit} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-800 rounded text-lg">Add New Book</button>
                            </div>
                            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                            </div>
                        </div>
                </div>
            </section>
    </>
  )
}

export default AddNewBook
