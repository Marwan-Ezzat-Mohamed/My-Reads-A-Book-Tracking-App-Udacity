import React, { Component } from "react";
class Book extends Component {
  state = {};
  render() {
    const { data: book, onShelfUpdate } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={book.self}
              onChange={(e) => onShelfUpdate(book, e.target.value)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && book.authors.length > 0 ? (
          book.authors.map((author) => (
            <div className="book-authors">{author}</div>
          ))
        ) : (
          <div className="book-authors">no author</div>
        )}
      </div>
    );
  }
}

export default Book;
