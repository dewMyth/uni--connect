import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search">
      <i
        className="fa fa-search"
        aria-hidden="true"
        style={{ marginLeft: "10px" }}
      />
      <input
        className="search-input"
        type="text"
        placeholder="Search Degree, Department or Faculty"
      />
    </div>
  );
};

export default SearchBar;
