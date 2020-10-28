import React, { Component } from "react";
import "./SearchBar.css";
import { Link } from "react-router-dom";

class SearchBarDegree extends Component {
  state = {
    query: "",
    degreeDetails: [],
  };

  fetchDegrees = (query) => {
    this.setState({
      query: query,
    });
    fetch("degrees/search-degree", {
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
          degreeDetails: results.degree,
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
            placeholder="Search Degree"
            onChange={(e) => this.fetchDegrees(e.target.value)}
          />
        </div>
        <ul className="list-group" style={{ paddingLeft: "50px" }}>
          {this.state.degreeDetails.map((item) => {
            return (
              <li className="list-group-item">
                <Link to={`/degrees/${item._id}`}>{item.degreeTitle}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SearchBarDegree;
