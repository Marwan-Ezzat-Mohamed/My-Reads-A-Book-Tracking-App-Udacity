import React, { Component } from "react";
import Book from "./Book.js";
import * as BooksAPI from "./BooksAPI";

class BookShelf extends Component {
  state = { books: [] };
  async componentDidMount() {
    const allBooks = await BooksAPI.getAll();
    const books = allBooks.filter(
      (book) =>
        book.shelf.toLowerCase() ===
        this.props.name.replace(/\s+/g, "").toLowerCase()
    );
    this.setState({ books });
  }
  render() {
    const { name } = this.props;
    const { books } = this.state;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li>{<Book data={book} />}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
