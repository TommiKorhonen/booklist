CREATE TABLE books (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    author VARCHAR(50) NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO books (id, title, author, description) values (12, 'Lord of the rings', 'Tolkien', 'Fantasy story');