import React, { Component } from "react";
// import "./SearchBar.css";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  state = {
    query: "",
    userDetails: [],
  };

  fetchUsers = (query) => {
    this.setState({
      query: query,
    });
    fetch("users/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        this.setState({
          userDetails: results.user,
        });
      });
  };

  render() {
    return (
      <div>
        <div className="search">
          <i
            className="fa fa-search"
            aria-hidden="true"
            style={{ marginLeft: "10px" }}
          />
          <input
            className="search-input"
            id="query"
            type="text"
            placeholder="Search Alumni"
            onChange={(e) => this.fetchUsers(e.target.value)}
          />
        </div>
        <ul className="list-group" style={{ paddingLeft: "50px" }}>
          {this.state.userDetails.map((item) => {
            return (
              <li className="list-group-item">
                <Link to={`/users/${item._id}`}>
                  {item.firstName} {item.lastName}
                </Link>
                <p className="dropdown-item" style={{ fontSize: "10px" }}>
                  {item.degree.degreeTitle}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SearchBar;
