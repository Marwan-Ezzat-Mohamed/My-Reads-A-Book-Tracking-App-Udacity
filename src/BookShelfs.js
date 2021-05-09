import React, { Component } from "react";
import BookShelf from "./BookShelf.js";
import * as BooksAPI from "./BooksAPI";

class BookShelfs extends Component {
  state = {
    allBooks: [],
  };

  async componentDidMount() {
    const allBooks = await BooksAPI.getAll();
    this.setState({ allBooks });
  }

  handleShelfUpdate = async (book, shelf) => {
    const oldBooks = [...this.state.allBooks];
    const allBooks = [...this.state.allBooks];
    const index = allBooks.indexOf(book);
    const bookToBeUpdated = allBooks[index];
    bookToBeUpdated.shelf = shelf;
    allBooks[index] = bookToBeUpdated;
    this.setState({ allBooks });
    try {
      await BooksAPI.update(book, shelf);
    } catch (error) {
      //if any error occured we reverse the state back
      this.setState({ allBooks: oldBooks });
    }
  };

  render() {
    const { allBooks } = this.state;
    const bookShelfs = [
      {
        name: "Read",
        shelfBooks: allBooks.filter((book) => book.shelf === "read"),
      },
      {
        name: "Current Reading",
        shelfBooks: allBooks.filter(
          (book) => book.shelf === "currentlyReading"
        ),
      },
      {
        name: "Want To Read",
        shelfBooks: allBooks.filter((book) => book.shelf === "wantToRead"),
      },
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookShelfs.map((shelf) => (
              <BookShelf
                name={shelf.name}
                data={shelf.shelfBooks}
                onShelfUpdate={this.handleShelfUpdate}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BookShelfs;
