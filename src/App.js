import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import BookShelfs from "./BookShelfs.js";
import SearchPage from "./SearchPage.js";
import HomePage from './homePage';

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  };

  handleShowingSearchPage = () => {
    this.setState({ showSearchPage: false });
  };

  render() {
    const { showSearchPage } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/search"
            render={() => (
              <SearchPage onCloseSearch={this.handleShowingSearchPage} />
            )}
          />
          <Route exact path="/" component={HomePage} />
          <Redirect to="/" />
        </Switch>

        
      </div>
    );
  }
}

export default BooksApp;
