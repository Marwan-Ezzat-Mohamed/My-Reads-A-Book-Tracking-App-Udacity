import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book.js";
class SearchPage extends Component {
  state = { booksToDislplay: [], query: "" };

  handleSearch = async (query) => {
    this.setState({ query });
    await this.getFilteredBooks();
  };
  getFilteredBooks = async () => {
    const { query } = this.state;
    let books = await BooksAPI.search(query);
    if (!books || books.error) books = [];
    else this.setState({ booksToDislplay: books });
  };

  handleAddBook = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
  };

  render() {
    const { booksToDislplay: books } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={this.props.onCloseSearchClick}
          >
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
                  <Book data={book} onShelfUpdate={this.handleAddBook} />
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
