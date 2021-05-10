import React from "react";
import { Link } from "react-router-dom";
import BookShelfs from "./BookShelfs";

const HomePage = () => {
  return (
    <div>
      <BookShelfs />
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
