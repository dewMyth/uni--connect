import React, { Component } from "react";
import Colleagues from "../elements/Colleagues/Colleagues";
import Degrees from "../elements/Degrees/Degrees";
import Departments from "../elements/Departments/Departments";

class Find extends Component {
  render() {
    return (
      <div>
        <Colleagues />
        <Degrees />
        <Departments />
        <p>Faculties</p>
      </div>
    );
  }
}

export default Find;
