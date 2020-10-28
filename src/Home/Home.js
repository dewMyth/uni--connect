import React, { Component } from "react";
import "./Home.css";
import HomeNavBar from "../elements/HomeNavBar/HomeNavBar";
import SearchBar from "../elements/SearchBar/SearchBar";
import { Wave } from "react-animated-text";
import SearchBarDegree from "../elements/SearchBar/SearchBarDegree";
import axios from "axios";

class Home extends Component {
  componentDidMount() {
    axios.get("/dashboard/public-visits").then((response) => {
      console.log(response.data);
    });
  }
  render() {
    return (
      <div className="container">
        <HomeNavBar />
        <div className="row">
          <div className="left col-md-7 col-xs-12">
            <br />
            <br />
            <br />
            {/* SearchBar */}
            <SearchBar />
            <br />
            <SearchBarDegree />
            {/* Welcome */}
            <div className="text-main">
              <Wave text="Welcome to" speed="3" effect="verticalFadeIn" />
              Uni Connect
            </div>
          </div>
          <div className="right col-md-5">
            {/* Image */}
            <div className="img-home">
              <img src="images/home-image.png" alt="home" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
