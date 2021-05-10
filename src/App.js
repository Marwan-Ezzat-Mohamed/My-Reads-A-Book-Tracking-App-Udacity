import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import HomePage from "./components/homePage";
import "./App.css";

class BooksApp extends Component {
  state = {
    showSearchPage: false,
  };

  handleShowingSearchPage = () => {
    this.setState({ showSearchPage: false });
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/" component={HomePage} />
          {/* if any other router is written we redirect to the home page */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
