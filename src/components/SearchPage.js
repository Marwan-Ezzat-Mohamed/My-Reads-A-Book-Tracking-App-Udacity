import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book.js";
import { Link } from "react-router-dom";
class SearchPage extends Component {
  state = { booksToDislplay: [], query: "", isBooksReady: false };

  setBooksShelfs = async () => {
    const allBooks = await BooksAPI.getAll();
    let searchedBooks = [...this.state.booksToDislplay];
    let result = [];
    for (const searchedBook of searchedBooks) {
      let found = false;
      for (const book of allBooks) {
        if (book.id === searchedBook.id) {
          result.push({ ...searchedBook, shelf: book.shelf });
          found = 1;
        }
      }
      if (!found) {
        result.push({ ...searchedBook, shelf: "none" });
      }
    }
    //console.log(result);
    this.setState({ booksToDislplay: result, isBooksReady: true });
  };

  handleSearch = async (query) => {
    this.setState({ query });
    let books = await BooksAPI.search(query);
    if (!books || books.error) books = [];
    this.setState({ booksToDislplay: books, isBooksReady: false });
  };

  handleAddBook = async (book, shelf) => {
    const oldBooks = [...this.state.booksToDislplay];
    const booksToDislplay = [...this.state.booksToDislplay];
    const index = booksToDislplay.indexOf(book);
    const bookToBeUpdated = booksToDislplay[index];
    bookToBeUpdated.shelf = shelf;
    booksToDislplay[index] = bookToBeUpdated;
    this.setState({ booksToDislplay });
    try {
      await BooksAPI.update(book, shelf);
    } catch (error) {
      //if any error occured we reverse the state back
      this.setState({ booksToDislplay: oldBooks });
    }
  };
  componentDidUpdate() {
    if (!this.state.isBooksReady) {
      this.setBooksShelfs();
    }
  }

  render() {
    let { booksToDislplay: books, query } = this.state;
    if (!query) books = [];
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" />
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.handleSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length >= 1 ? (
              books.map((book) => (
                <li key={book.id}>
                  <Book
                    data={book}
                    from={"searchPage"}
                    onShelfUpdate={this.handleAddBook}
                  />
                </li>
              ))
            ) : (
              <p>NO BOOKS FOUND</p>
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
