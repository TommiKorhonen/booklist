require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const { json } = require("express");

const app = express();


app.use(cors());
app.use(express.json());

// Get all books
app.get("/api/v1/books", async (req, res) => {
    try {
        const bookData = await db.query("select * from books");

        res.status(200).json({
            status: "succes",
            results: bookData.rows.length,
            data: {
                books: bookData.rows,
            },
        });
    } catch (err) {
        console.log(err);
    };
});

// Get a book
app.get("/api/v1/books/:id", async (req, res) => {
    console.log(req.params.id)

    try {
        const bookData = await db.query(
            "select * from books where id = $1",
            [req.params.id]
        );

        res.status(200).json({
            status: "succes",
            data: {
                book: bookData.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    };

});

// Create book
app.post("/api/v1/books", async (req, res) => {
    console.log(req.body);

    try {
        const bookData = await db.query(
            "INSERT INTO books(title, author, description) values($1, $2, $3) returning *",
            [req.body.title, req.body.author, req.body.description]
        );

        res.status(201).json({
            status: "succes",
            data: {
                book: bookData.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    };
})

// Update Book

app.put("/api/v1/books/:id", async (req, res) => {
    try {
        const bookData = await db.query(
            "UPDATE books SET title = $1, author = $2, description = $3 where id = $4 returning *",
            [req.body.title, req.body.author, req.body.description, req.params.id]
        );

        res.status(200).json({
            status: "succes",
            data: {
                book: bookData.rows[0],
            },
        });
    } catch (err) {
        console.log(err);
    };
});

// Delete book
app.delete("/api/v1/books/:id", async (req, res) => {
    try {
        const bookData = db.query("DELETE FROM books where id = $1", [
            req.params.id,
        ]);
        res.status(204), json({
            status: "success",
        });

    } catch (err) {
        console.log(err);
    }
});
const port = 3001;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});