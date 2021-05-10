import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book.js";
import { Link } from "react-router-dom";
class SearchPage extends Component {
  state = { booksToDislplay: [], query: "" };

  getBooksShelfs = (allBooks, searchedBooks) => {
    let result = [];
    for (let searchedBook of searchedBooks) {
      let found = false;
      for (const book of allBooks) {
        if (searchedBook.id === book.id) {
          let newBook = { ...searchedBook, shelf: book.shelf };
          result.push(newBook);
          found = true;
        }
      }
      if (!found) {
        //console.log(searchedBook);
        let newBook = { ...searchedBook, shelf: "none" };
        result.push(newBook);
      }
    }
    //console.log(result);
    return result;
  };

  handleSearch = async (query) => {
    this.setState({ query });
    const searchedBooks = await BooksAPI.search(query);
    if (searchedBooks && searchedBooks.length > 0) {
      const allBooks = await BooksAPI.getAll();
      const booksWithShelfs = this.getBooksShelfs(allBooks, searchedBooks);
      this.setState({ booksToDislplay: booksWithShelfs });
    } else this.setState({ booksToDislplay: [] });
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
