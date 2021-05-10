import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book.js";
class SearchPage extends Component {
  state = { booksToDislplay: [], query: "" };

  getBooksShelfs = (books, searchedBooks) => {
    let result = [];
    for (let searchedBook of searchedBooks) {
      let found = false;
      for (const book of books) {
        if (searchedBook.id === book.id) {
          let newBook = { ...searchedBook, shelf: book.shelf };
          result.push(newBook);
          found = true;
        }
      }
      if (!found) {
        console.log(searchedBook);
        let newBook = { ...searchedBook, shelf: "none" };
        result.push(newBook);
      }
    }
    console.log(result);
    return result;
  };

  handleSearch = async (query) => {
    this.setState({ query });
    let searchedBooks = await BooksAPI.search(query);
    if (searchedBooks && searchedBooks.length > 0) {
      let books = await BooksAPI.getAll();
      let booksWithShelfs = this.getBooksShelfs(books, searchedBooks);
      console.log(booksWithShelfs);
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
    this.setState({ booksToDislplay: booksToDislplay });
    try {
      await BooksAPI.update(book, shelf);
    } catch (error) {
      //if any error occured we reverse the state back
      this.setState({ booksToDislplay: oldBooks });
    }
  };

  render() {
    let { booksToDislplay: books, query } = this.state;
    const { onCloseSearch } = this.props;
    if (!query) books = [];
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={onCloseSearch}>
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
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
                <li>
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
