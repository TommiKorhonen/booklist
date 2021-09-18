import React, { useState, createContext } from "react";

export const BooksContext = createContext();

export const BooksContextProvider = props => {
    const [books, setBooks] = useState([]);
    // All input values goes here
    const [values, setValues] = useState({
        title: "",
        author: "",
        description: ""
    })

    const addBook = (book) => {
        setBooks([...books, book]);
    };
    return (
        <BooksContext.Provider value={{ books, setBooks, addBook, values, setValues }}>
            {props.children}
        </BooksContext.Provider>
    )
}