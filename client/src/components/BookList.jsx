import React, { useContext, useEffect } from 'react'
import BookFinder from '../api/BookFinder';
import { BooksContext } from '../context/BooksContext';

const BookList = (props) => {
    const { books, setBooks, values, setValues } = useContext(BooksContext)
    // Fetches data on pageload and sets the data into books state
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BookFinder.get("/");
                setBooks(response.data.data.books)
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    }, [books]);

    // Deletes book from books database
    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            await BookFinder.delete(`/${id}`)
            setBooks(books.filter(book => {
                return book.id !== id
            }))
        } catch (err) {
            console.log(err);
        };
    };
    // Selects the book data into the input fields
    const selectBook = (async (id) => {
        try {
            const response = await BookFinder.get(`/${id}`);
            console.log(response.data.data.book)
            setValues({
                title: response.data.data.book.title,
                author: response.data.data.book.author,
                description: response.data.data.book.description
            })
        } catch (err) {
            console.log(err)
        };
    });
    // Update bookdata
    const handleUpdate = async (id) => {
        try {
            await BookFinder.put(`/${id}`, {
                title: values.title,
                author: values.author,
                description: values.description
            })
        } catch (err) {
            console.log(err);
        };
    };
    return (
        <div className="grid my-8">
            <table className="bg-gray-700 table-fixed">
                <thead>
                    <tr className="bg-blue-500 text-center text-white p-4">
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Save</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Maps the fetched book data */}
                    {books.map((book) => {
                        const { id, title, author, description } = book;
                        return (
                            <tr key={id} onClick={() => selectBook(id)} className="text-white text-center border-b border-solid border-gray-500 p-8 hover:bg-gray-500">
                                <td>{title}</td>
                                <td>{author}</td>
                                <td>{description}</td>
                                <td>
                                    <button onClick={() => handleUpdate(book.id)} className="bg-green-500  w-24 lg:w-32 my-4">Save</button>
                                </td>
                                <td>
                                    <button onClick={(e) => handleDelete(e, book.id)} className="bg-red-500  w-24 lg:w-32 my-4">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default BookList
