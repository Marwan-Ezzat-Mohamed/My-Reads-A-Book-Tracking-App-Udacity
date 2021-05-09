import React, { Component } from "react";
import Book from "./Book.js";
import * as BooksAPI from "./BooksAPI";

class BookShelf extends Component {
  state = { books: [] };

  render() {
    const { name, data: books, onShelfUpdate } = this.props;

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
  }
}

export default BookShelf;
