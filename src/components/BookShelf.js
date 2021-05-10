import React from "react";
import Book from "./Book";

const BookShelf = ({ name, data: books, onShelfUpdate }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book data={book} onShelfUpdate={onShelfUpdate} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
