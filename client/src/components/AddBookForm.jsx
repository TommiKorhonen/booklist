import React, { useContext } from 'react'
import BookFinder from '../api/BookFinder'
import { BooksContext } from '../context/BooksContext'
const Form = () => {
    const { addBook, values, setValues } = useContext(BooksContext);
    // Submits data into BookList field and clears the input fields
    const handleSubmit = async (e) => {
        console.log(values)
        e.preventDefault()
        try {
            const response = await BookFinder.post("/", {
                title: values.title,
                author: values.author,
                description: values.description
            });
            addBook(response.data.data.book);
            setValues({ title: "", author: "", description: "" });
        } catch (err) {
            console.log(err);
        };

    };
    // Handles inputs data 
    let handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    };
    return (
        <div className="mb-2">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 mt-10">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <div>
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" value={values.title} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="author">Author</label>
                            <input id="author" name="author" value={values.author} onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" value={values.description} onChange={handleChange}>Review</textarea>
                    </div>
                    <div className="flex gap-4">
                        <button typeof="submit" className="bg-blue-500 w-32 text-white self-start">Save New</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form
