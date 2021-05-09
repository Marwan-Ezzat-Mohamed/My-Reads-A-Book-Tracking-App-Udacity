import React, { Component } from "react";
import BookShelf from "./BookShelf.js";
class BookShelfs extends Component {
  state = {};
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf name={"Want to Read"} />
            <BookShelf name={"Currently Reading"} />
            <BookShelf name={"Read"} />
          </div>
        </div>
        
      </div>
    );
  }
}

export default BookShelfs;
